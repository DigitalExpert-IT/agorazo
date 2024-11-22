import { useState, useEffect, useCallback } from "react";
import { UseRegister } from "./useAuth";

interface Transaction {
  id: string;
  userId: string;
  value: number;
  type: string;
  status: string;
  reference: string;
  createdAt: number;
}

interface UseTransactionsResult {
  transactions: Transaction[] | null;
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
  fetchById: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {sessionData} = UseRegister();
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch("/api/token-crypt/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [sessionData]);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {

      const response = await fetch(`/api/transaction/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: Transaction = await response.json();
      setTransaction(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transaction");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    transaction,
    loading,
    error,
    fetchById,
    refetch: fetchTransactions,
  };
};
