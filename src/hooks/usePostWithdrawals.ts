// hooks/usePostWithdrawal.ts
import { useState } from 'react';

interface UsePostWithdrawalResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  postWithdrawal: (amount: number) => Promise<void>;
}

export const usePostWithdrawal = (): UsePostWithdrawalResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const postWithdrawal = async ( amount: number): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create withdrawal request');
      }

      const data = await response.json();
      if (data.id) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err + 'Failed to create withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, postWithdrawal };
};
