import type { NextApiRequest, NextApiResponse } from "next";
import { Coinpayments } from "coinpayments";

type RequestBody = {
  amount: number;
};

type TransactionResponse = {
  qrCode: string;
  timeout: number;
  amount: string;
  address: string;
};

type ErrorResponse = {
  error: string;
};

const COINPAYMENTS_API_KEY = process.env.COINPAYMENTS_API_KEY;
const COINPAYMENTS_API_SECRET = process.env.COINPAYMENTS_API_SECRET;
const OWNER_USDT_ADDRESS = process.env.OWNER_USDT_ADDRESS;

if (!COINPAYMENTS_API_KEY || !COINPAYMENTS_API_SECRET) {
  throw new Error("CoinPayments API credentials not configured");
}

const client = new Coinpayments({
  key: COINPAYMENTS_API_KEY,
  secret: COINPAYMENTS_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount } = req.body as RequestBody;
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount provided" });
  }

  if (!OWNER_USDT_ADDRESS) {
    return res.status(500).json({ error: "USDT address not configured" });
  }

  try {
    const transaction = await client.createTransaction({
      currency1: "USDT.BEP20",
      currency2: "USDT.BEP20",
      amount: amount,
      address: OWNER_USDT_ADDRESS,
      buyer_email: "tuxpower27@gmail.com",
    });

    if (!transaction?.status_url) {
      throw new Error("Invalid transaction response");
    }

    return res.status(200).json({
      qrCode: transaction.qrcode_url,
      timeout: transaction.timeout,
      amount: transaction.amount,
      address: transaction.address
    });
  } catch (error) {
    console.error("CoinPayments transaction error:", error);
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to create transaction",
    });
  }
}
