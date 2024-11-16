import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export const BalanceInfo = () => {
  const [amount, setAmount] = useState("");
  const {data: session} = useSession();
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          const perviousePrice = data.stats[data.stats.length - 2][1];
          setTokenPrice(currentPrice);
          setPrevPrice(perviousePrice);
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

  const handleBuy = async () => {
    if (!amount || !tokenPrice) return;

    try {
      console.log(`Buying ZENQ tokens for ${amount} USDT`);
      const tokensToReceive = Number(amount) / tokenPrice;
      console.log(
        `You will receive approximately ${tokensToReceive.toFixed(
          6
        )} ZENQ tokens`
      );
    } catch (err) {
      console.error("Error during purchase:", err);
    }
  };

  const priceChange =
    tokenPrice !== null && prevPrice !== null ? tokenPrice - prevPrice : null;

  const formatPrice = (price: number | null) => {
    if (price === null) return "$-.--";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Balance Information*/}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
            Balance Information
          </h2>
          <div>
            {isLoading ? (
              <p className="text-gray-600 dark:text-gray-400">
                Loading price...
              </p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p
                    className={`text-3xl font-bold ${
                      priceChange! >= 0 ? "text-green-500" : "text-red-500"
                    } `}
                  >
                    {formatPrice(tokenPrice)}
                  </p>
                  {priceChange !== null ? (
                    priceChange >= 0 ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-red-500" />
                    )
                  ) : null}
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  ZENQ Token Price
                </p>
              </>
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="/zenq.svg"
                  alt="ZENQ token"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-3xl font-bold text-black dark:text-white">
                {formatPrice(12345678)}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">ZENQ Balance</p>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image
                  src="/usdt.svg"
                  alt="USDT token"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-3xl font-bold text-black dark:text-white">
                {formatPrice(1234.56)}
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">USDT Balance</p>
          </div>
        </div>

        {/* Purchase Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Make a Purchase
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="number"
                placeholder="Enter amount in USDT"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              {tokenPrice && amount && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ≈ {(Number(amount) / tokenPrice).toFixed(6)} ZENQ
                </div>
              )}
            </div>
            <button
              onClick={handleBuy}
              disabled={!amount || isLoading || !!error || session !== null}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Buy ZENQ"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfo;
