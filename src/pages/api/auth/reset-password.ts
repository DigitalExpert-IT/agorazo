// File: /pages/api/auth/reset-password.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: 'Reset token and new password are required' });
    }

    try {
      const resetRequest = await prisma.passwordReset.findUnique({
        where: { resetToken },
      });

      if (!resetRequest) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      const currentTime = new Date();
      if (resetRequest.expiresAt < currentTime) {
        return res.status(400).json({ message: 'Reset token has expired' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: resetRequest.userId },
        data: { password: hashedPassword },
      });

      await prisma.passwordReset.delete({
        where: { resetToken },
      });

      return res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
