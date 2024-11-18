import { useState } from 'react';

interface UseUpdatePasswordResult {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  updatePassword: (resetToken: string, newPassword: string) => Promise<void>;
}

export const useUpdatePassword = (): UseUpdatePasswordResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updatePassword = async (resetToken: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update password. Please try again.');
      }
    } catch (err) {
      setError(err + 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    updatePassword,
  };
};
