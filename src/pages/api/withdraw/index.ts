import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { prisma } from 'pages/api/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });
    const user = await prisma.user.findUnique({
      where: { email: session?.email || undefined }
    });
    const { id, role } = user as {id: string, role: string}

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount' });
        }
    
        const withdraw = await prisma.withdraw.create({
          data: {
            userId: id,
            amount,
            status: 'Pending',
          },
        });
    
        return res.status(201).json(withdraw);
      } catch (err) {
        console.error('Error creating withdrawal:', err);
        return res.status(500).json({ error: 'Failed to create withdrawal' });
      }
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

    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    
      try {
        const user = await prisma.user.findUnique({
          where: { email: session?.email || undefined },
        });
    
        if (!session) {
          return res.status(401).json({ message: "Unauthorized" });
        }
  
        const { id, role } = user as { id: string; role: string };
  
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const pageLimit = parseInt(limit as string, 10);
  
        const whereClause = role === "admin" ? {} : { userId: id };
  
        const totalRecords = await prisma.withdraw.count({ where: whereClause });
        const totalPages = Math.ceil(totalRecords / pageLimit);
  
        const withdraws = await prisma.withdraw.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
          skip: (pageNumber - 1) * pageLimit,
          take: pageLimit,
          orderBy: {
            createdAt: "desc",
          },
        });
  
        return res.status(200).json({
          withdraws,
          totalPages,
          currentPage: pageNumber,
        });

      } catch (error) {
        console.error('Error fetching withdraw history:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    

    res.setHeader('Allow', ['POST', 'PUT', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Error handling withdrawal request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
