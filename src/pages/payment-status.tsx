import React from "react";
import { usePaymentStatus } from "hooks";

export const PaymentStatus = ({ txnId }: { txnId: string }) => {
  const { status, error } = usePaymentStatus(txnId);

  return (
    <div className="p-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : status ? (
        <p className="text-green-500">Transaction Status: {status}</p>
      ) : (
        <p>Loading transaction status...</p>
      )}
    </div>
  );
};
