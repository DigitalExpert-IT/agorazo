import crypto from "crypto";
import { prisma } from "pages/api/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const COINPAYMENTS_IPN_SECRET = process.env.COINPAYMENTS_IPN_SECRET;

if (!COINPAYMENTS_IPN_SECRET) {
  throw new Error("IPN secret not configured");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ipnData = req.body;
  const hmac = req.headers["hmac"] as string;

  if (!hmac) {
    console.error("Missing HMAC header");
    return res.status(400).json({ error: "Missing HMAC header" });
  }

  try {
    const calculatedHmac = crypto
      .createHmac("sha512", COINPAYMENTS_IPN_SECRET as string)
      .update(new URLSearchParams(ipnData).toString())
      .digest("hex");

    if (hmac !== calculatedHmac) {
      console.error("Invalid IPN signature");
      return res.status(403).json({ error: "Invalid IPN signature" });
    }

    const transactionId = ipnData.txn_id;
    const status = parseInt(ipnData.status, 10);

    console.info("Processing IPN for transaction:", transactionId, "Status:", status);

    let newStatus = "PENDING";
    if (status >= 100) {
      newStatus = "SUCCESS";
    } else if (status < 0) {
      newStatus = "FAILED";
    }

    const updated = await prisma.transaction.updateMany({
      where: { reference: transactionId, status: "PENDING" },
      data: { status: newStatus },
    });

    if (updated.count === 0) {
      console.warn("No matching transactions found for IPN");
    }

    res.status(200).json({ message: "IPN processed successfully" });
  } catch (error) {
    console.error("Error processing IPN:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
