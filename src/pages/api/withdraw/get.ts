import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { prisma } from "pages/api/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getToken({ req });

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { userId, role } = session as { userId: string; role: string };

      const { page = 1, limit = 10 } = req.query;
      const pageNumber = parseInt(page as string, 10);
      const pageLimit = parseInt(limit as string, 10);

      const whereClause = role === "admin" ? {} : { userId };

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
      console.error("Error fetching withdraw history:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
