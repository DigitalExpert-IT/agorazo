import Image from "next/image";
import { Tooltip } from "react-tooltip";
import React, { useState } from "react";
import { useTokenPurchase } from "hooks";
import { useSession } from "next-auth/react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export const BalanceInfo = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState("");
  const { tokenPrice, handleBuy, error, prevPrice, isLoading, buyError } = useTokenPurchase()

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
                    className={`text-3xl font-bold ${priceChange! >= 0 ? "text-green-500" : "text-red-500"
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
        </div>

        {/* Purchase Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Make a Purchase using USDT
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
              {buyError && <div className="text-sm text-red-500 mt-1">
                {buyError}
              </div>}
              {tokenPrice && amount && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ≈ {(Number(amount) / tokenPrice).toFixed(6)} ZENQ
                </div>
              )}
            </div>
            <div className="flex space-x-5">
              <button
                onClick={() => handleBuy(Number(amount))}
                disabled={!amount || isLoading || !!error || session == null}
                data-tip
                data-tooltip-content={session == null ? "Please Login First!" : ""}
                data-tooltip-id="buyTooltip"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Buy ZENQ"}
              </button>
              <Tooltip id="buyTooltip" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfo;
