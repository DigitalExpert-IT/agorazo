import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { prisma } from 'pages/api/prisma';
import { getUserBalance } from 'utils/balance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getToken({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.email || undefined }
    });

    if (req.method === 'POST') {
      const { id } = user as {id: string}
      try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount' });
        }
    
        const balance = await getUserBalance(user?.email as string);
      if (balance < amount) throw new Error("Not enough balance");
      console.log("balance", balance)

      const withdraw = await prisma.transaction.create({
        data: {
          userId: id,
          txnId: "",
          value: amount,
          type: "WITHDRAW",
          status: "pending",
          reference: "",
          valueToken: 0,
        },
      });
    
        return res.status(201).json(withdraw);
      } catch (err) {
        console.error('Error creating withdrawal:', err);
        return res.status(500).json({ error: 'Failed to create withdrawal' });
      }
    }
    

    if (req.method === 'PUT') {
      const { role } = user as {role: string}
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

    if (req.method === "GET") {
      const { id, role } = user as {id: string, role: string}
      try {
  
        const { page = 1, limit = 10, type = "WITHDRAW" } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const pageLimit = parseInt(limit as string, 10);
  
        const whereClause = {
        ...(role === "admin" ? {} : { userId: id }),
        type: type as string,
      };
  
        const totalRecords = await prisma.transaction.count({ where: whereClause });
        const totalPages = Math.ceil(totalRecords / pageLimit);
  
        const transactions = await prisma.transaction.findMany({
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
          transactions,
          totalPages,
          currentPage: pageNumber,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    

    res.setHeader('Allow', ['POST', 'PUT', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Error handling withdrawal request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
