
import React, { createContext, useState, useContext, useCallback } from 'react';
import { IUserTransaction } from 'constant';

interface TransactionContextType {
  withdrawals: IUserTransaction[];
  withdraw: IUserTransaction[];
  loading: boolean;
  error: string | null;
  fetchWithdrawals: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  updateWithdrawal: (id: string, status: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [withdrawals, setWithdrawals] = useState<IUserTransaction[]>([]);
  const [withdraw, setWithdraw] = useState<IUserTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWithdrawals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/withdraw');
      if (!response.ok) {
        throw new Error('Failed to fetch withdrawals');
      }
      const data = await response.json();
      setWithdrawals(data.transactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/token-crypt/transaction/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transaction');
      }
      const data = await response.json();
      setWithdraw(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWithdrawal = useCallback(async (id: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/token-crypt/transaction/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update withdrawal');
      }

      // Refetch withdrawals after successful update
      await fetchWithdrawals();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchWithdrawals]);

  // Initial fetch on provider mount
  React.useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

  return (
    <TransactionContext.Provider 
      value={{ 
        withdrawals, 
        withdraw, 
        loading, 
        error, 
        fetchWithdrawals, 
        fetchById, 
        updateWithdrawal,
        refetch: fetchWithdrawals
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use transaction context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};