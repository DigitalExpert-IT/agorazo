import { useState, useEffect, useCallback } from 'react';
import { Transaction } from './useTransaction';

interface Pagination {
  totalPages: number;
  currentPage: number;
}

interface UseGetWithdrawalsResponse {
  withdrawals: Transaction[];
  withdraw: Transaction[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  fetchById: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useGetWithdrawals = (page: number = 1, limit: number = 10): UseGetWithdrawalsResponse => {
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [withdraw, setWithdraw] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ totalPages: 0, currentPage: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWithdrawals = useCallback(async () => {
    setLoading(true);
    setError(null);
    setWithdrawals([])

    try {
      const url = `/api/withdraw?page=${page}&limit=${limit}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch withdrawal history');
      }

      const data = await response.json();

      setWithdrawals(data.transactions);
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    } catch (err) {
      setError(err + 'Failed to fetch withdrawal history');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/token-crypt/transaction/${id}`, {
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
      setWithdraw(data);
    } catch (err) {
      setError(err + "Failed to fetch transaction");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return { withdrawals, pagination, loading, error, withdraw, fetchById, refetch: fetchWithdrawals };
};
