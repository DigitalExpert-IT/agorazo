import { useState, useEffect, useCallback } from "react";
import { UseRegister } from "./useAuth";

interface Transaction {
  id: string;
  txnId: string;
  userId: string;
  value: number;
  valueToken: number;
  type: string;
  status: string;
  reference: string;
  createdAt: number;
  user: {
    email: string;
  };
}

interface UseTransactionsResult {
  transactions: Transaction[] | null;
  totalAssets: number;
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
  fetchById: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalAssets, setTotalAssets] = useState<number>(0)
  const { sessionData } = UseRegister();

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/token-crypt/transaction?page=${currentPage}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { transactions, totalPages, currentPage: current } = await response.json();
      let totalAsset = 0

      for(let i = 0; i < transactions?.length; i++){
        totalAsset += transactions?.value
      }

      setTransactions(transactions);
      setTotalPages(totalPages);
      setCurrentPage(current);
      setTotalAssets(totalAsset)
    } catch (err) {
      setError(err + "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sessionData]);

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
    } catch (err) {
      setError(err + "Failed to fetch transaction");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    transactions,
    totalAssets,
    transaction,
    loading,
    error,
    fetchById,
    refetch: fetchTransactions,
    currentPage,
    totalPages,
    setPage,
  };
};
