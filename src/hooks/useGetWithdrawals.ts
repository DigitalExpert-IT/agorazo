// hooks/useGetWithdrawals.ts
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react'; // to get session info if you're using next-auth

interface Withdraw {
  id: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface Pagination {
  totalPages: number;
  currentPage: number;
}

interface UseGetWithdrawalsResponse {
  withdrawals: Withdraw[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
}

export const useGetWithdrawals = (page: number = 1, limit: number = 10): UseGetWithdrawalsResponse => {
  const [withdrawals, setWithdrawals] = useState<Withdraw[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ totalPages: 0, currentPage: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get the session info (user role)
        const session = await getSession();

        if (!session) {
          setError('You need to be logged in to see withdrawals');
          setLoading(false);
          return;
        }

        const userId = session.user.userId;
        const role = session.user.role;

        // Fetching based on user role
        const url = role === 'admin' 
          ? `/api/withdraw?page=${page}&limit=${limit}` 
          : `/api/withdraw?page=${page}&limit=${limit}&userId=${userId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch withdrawal history');
        }

        const data = await response.json();

        setWithdrawals(data.withdrawals);
        setPagination({
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      } catch (err) {
        setError('Failed to fetch withdrawal history');
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, [page, limit]);

  return { withdrawals, pagination, loading, error };
};
