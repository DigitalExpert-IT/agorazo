import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "pages/api/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { verifyToken: token },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid verification token" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verifyToken: null,
      },
    });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Error verifying email" });
  }
}
