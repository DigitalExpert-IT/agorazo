import { useState, useCallback } from "react";

interface UseUpdateWithdrawalResult {
  updateWithdrawal: (id: string, status: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useUpdateWithdrawal = (): UseUpdateWithdrawalResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateWithdrawal = useCallback(
    async (id: string, status: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/token-crypt/transaction/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id,
            status
          }),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();
        return data
      } catch (err) {
        setError(err + "Failed to update withdrawal");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    updateWithdrawal,
    loading,
    error,
  };
};
