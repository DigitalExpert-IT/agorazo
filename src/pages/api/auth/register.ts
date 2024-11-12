import { prisma } from "pages/api/prisma";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user"
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
