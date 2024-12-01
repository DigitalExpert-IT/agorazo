import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { prisma } from 'pages/api/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });
    const { userId, role } = session as { userId: string; role: string };

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const withdraw = await prisma.withdraw.create({
        data: {
          amount,
          status: 'Pending',
          user: {
            connect: {id: userId}
          }
        },
      });

      return res.status(201).json(withdraw);
    }

    if (req.method === 'PUT') {
      const { withdrawId, status, eventLog } = req.body;

      if (!withdrawId || !status) {
        return res.status(400).json({ error: 'Invalid withdrawId or status' });
      }

      if (role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized. Only admins can update withdrawal status.' });
      }

      const updatedWithdraw = await prisma.withdraw.update({
        where: { id: withdrawId },
        data: {
          status,
          eventLog,
          updatedAt: new Date(),
        },
      });

      return res.status(200).json(updatedWithdraw);
    }

    res.setHeader('Allow', ['POST', 'PUT']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Error handling withdrawal request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
