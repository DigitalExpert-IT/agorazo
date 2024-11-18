import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendVerificationEmail } from 'utils/email';

const prisma = new PrismaClient();

const REQUEST_LIMIT_TIME = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const recentResetRequest = await prisma.passwordReset.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (recentResetRequest && new Date().getTime() - new Date(recentResetRequest.createdAt).getTime() < REQUEST_LIMIT_TIME) {
        return res.status(429).json({ message: 'Please wait before requesting another reset email' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); 

      await prisma.passwordReset.create({
        data: {
          userId: user.id,
          resetToken,
          expiresAt,
        },
      });

      await sendVerificationEmail(email, resetToken, false);

      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ message: 'An error occurred while sending the email' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
