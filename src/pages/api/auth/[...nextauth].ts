import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "pages/api/prisma";

const JWT_SECRET = process.env.AUTH_SECRET || "";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Please input the email and password");
        }

        const { email, password } = credentials;

        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
          throw new Error("User not found");
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("Email is not verified. Please verify your email to log in.");
        }

        const isPasswordValid = await bcrypt.compare(password as string, user.password!);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // JWT token generation
        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: '1h' }
        );

        return {
          id: user.id,
          userId: user.id,
          email: user.email,
          role: user.role,
          token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the JWT token in the session
      if (user) {
        //@ts-expect-error "the type of User at jwt not included token"
        token.jwt = user.token;
        token.email = user.email;
        //@ts-expect-error "the type of User at jwt not included token"
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add JWT token to the session object
      if (token?.jwt) {
        //@ts-expect-error "the type of User at jwt not included token"
        session.token = token.jwt;
        //@ts-expect-error "the type of User at jwt not included email"
        session.user.email = token.email;
        //@ts-expect-error "the type of User at jwt not included email"
        session.user.id = token.userId;
        //@ts-expect-error "the type of User at jwt not included email"
        session.user.role = token.role
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});