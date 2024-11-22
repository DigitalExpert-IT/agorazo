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
  user: {
    email: string;
  };
}

interface UseTransactionsResult {
  transactions: Transaction[] | null;
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
  const { sessionData } = UseRegister();

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/token-crypt/transaction?page=${currentPage}`,
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

      const data = await response.json();
      setTransactions(data.transactions); // Assuming API returns transactions array
      setTotalPages(data.totalPages); // Assuming API returns total number of pages
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
