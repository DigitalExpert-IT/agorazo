import { Coinpayments } from "coinpayments";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "pages/api/prisma";

const COINPAYMENTS_API_KEY = process.env.COINPAYMENTS_API_KEY;
const COINPAYMENTS_API_SECRET = process.env.COINPAYMENTS_API_SECRET;

if (!COINPAYMENTS_API_KEY || !COINPAYMENTS_API_SECRET) {
  throw new Error("CoinPayments API credentials not configured");
}

const client = new Coinpayments({
  key: COINPAYMENTS_API_KEY,
  secret: COINPAYMENTS_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { txn_id } = req.query;

  if (!txn_id || typeof txn_id !== "string") {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    const status = await client.getTx({ txid: txn_id });

    await prisma.transaction.updateMany({
      where: { reference: txn_id },
      data: { status: status.status_text },
    });

    return res.status(200).json(status);
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Server error" });
  }
}
