import bcrypt from "bcryptjs";
import { prisma } from "pages/api/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { sendVerificationEmail, generateVerificationToken } from "utils/email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, name, password } = req.body;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyToken = generateVerificationToken();

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user",
          verifyToken,
        },
      });

      await sendVerificationEmail(email, verifyToken, true);

      res.status(201).json({
        message:
          "Registration successful. Please check your email to verify your account.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
