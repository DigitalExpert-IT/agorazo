// hooks/usePutWithdrawal.ts
import { useState } from 'react';

interface UsePutWithdrawalResponse {
  loading: boolean;
  error: string | null;
  success: boolean;
  putWithdrawal: (withdrawId: string, status: string, eventLog: string) => Promise<void>;
}

export const usePutWithdrawal = (): UsePutWithdrawalResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const putWithdrawal = async (
    withdrawId: string,
    status: string,
    eventLog: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/withdraw', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ withdrawId, status, eventLog }),
      });

      if (!response.ok) {
        throw new Error('Failed to update withdrawal request');
      }

      const data = await response.json();
      if (data.id) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to update withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, putWithdrawal };
};

export default usePutWithdrawal;
