import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  verifyToken: string,
  isVerify: boolean
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verifyToken}`;
  const resetPasswordUrl = `${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${verifyToken}`;

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Giglink - Verify your email address",
    html: isVerify
      ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ik.imagekit.io/msxxxaegj/coinpayment/logo-dummy.png?updatedAt=1731895642836" alt="Company Logo" style="width: 100px; height: auto;">
        </div>
        <h1 style="color: #333;">Verify your email address</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
        <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <div style="text-align: center; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Giglink. All rights reserved.</p>
          <p>123 Business Street, City, Country</p>
          <p><a href="https://giglink.com/privacy" style="color: #007BFF; text-decoration: none;">Privacy Policy</a> | <a href="https://giglink.com/terms" style="color: #007BFF; text-decoration: none;">Terms of Service</a></p>
        </div>
      </div>
    `
      : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ik.imagekit.io/msxxxaegj/coinpayment/logo-dummy.png?updatedAt=1731895642836" alt="Company Logo" style="width: 100px; height: auto;">
        </div>
        <h1 style="color: #333;">Forgot Password address</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 10px;">Forgot Password</a>
        <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <div style="text-align: center; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Giglink. All rights reserved.</p>
          <p>123 Business Street, City, Country</p>
          <p><a href="https://giglink.com/privacy" style="color: #007BFF; text-decoration: none;">Privacy Policy</a> | <a href="https://giglink.com/terms" style="color: #007BFF; text-decoration: none;">Terms of Service</a></p>
        </div>
      </div>
    `,
  });
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
