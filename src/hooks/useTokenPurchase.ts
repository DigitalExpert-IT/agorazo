import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface TransactionStatusHook {
  tokenPrice: number | null;
  prevPrice: number | null;
  isLoading: boolean;
  error: string | null;
  buyError: string | null;
  handleBuy: (amount: number) => Promise<void>;
}

export const useTokenPurchase = (): TransactionStatusHook => {
  const router = useRouter();
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch("/api/binance");
        if (!response.ok) {
          throw new Error("Failed to fetch token price");
        }
        const data = await response.json();

        if (data.stats && data.stats.length > 0) {
          const currentPrice = data.stats[data.stats.length - 1][1];
          const previousPrice = data.stats[data.stats.length - 2][1];
          setTokenPrice(currentPrice);
          setPrevPrice(previousPrice);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch price data"
        );
        console.error("Error fetching price:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenPrice();
    const interval = setInterval(fetchTokenPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = async (amount: number) => {
    if (!amount || amount <= 0 || !tokenPrice) return;

    if (amount < 0.2) {
      setBuyError(`The amount must be at least 0.2 USDT.`);
      return;
    }

    const valueToken = Number((Number(amount) / tokenPrice).toFixed(6));

    try {
      const response = await fetch("/api/coinpayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          valueToken
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transaction failed');
      }

      const paymentData = await response.json();

      router.push({
        pathname: '/payment-information',
        query: {
          qrCode: paymentData.qrCode,
          timeout: paymentData.timeout,
          amount: paymentData.amount,
          address: paymentData.address,
          status: paymentData.status,
          email: paymentData.email
        }
      });

    } catch (err) {
      console.error("Error during purchase:", err);
    }
  };

  return {
    tokenPrice,
    prevPrice,
    isLoading,
    error,
    buyError,
    handleBuy,
  };
};