import React, { useState } from "react";
import Image from "next/image";

export const BalanceInfo = () => {
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    console.log(`Buying for ${amount}`);
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
            <p className="text-3xl font-bold text-black dark:text-white">
              $1,234.56
            </p>
            <p className="text-gray-600 dark:text-gray-400">ZENQ Token Price</p>
          </div>
          <div className="mt-4">
            <div className="flex">
              <Image
                src="/zenq.svg"
                alt="zenq-logo"
                className="mr-2"
                width={40}
                height={40}
              />
              <p className="text-3xl font-bold text-black dark:text-white">
                $1,234.56
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">ZENQ Balance</p>
          </div>

          <div className="mt-4">
            <div className="flex">
              <Image
                src="/usdt.svg"
                alt="zenq-logo"
                className="mr-2"
                width={40}
                height={40}
              />
              <p className="text-3xl font-bold text-black dark:text-white">
                $1,234.56
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">USDT Balance</p>
          </div>
        </div>

        {/* Purchase Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Make a Purchase</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleBuy}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
