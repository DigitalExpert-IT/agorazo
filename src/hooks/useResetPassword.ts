import { useState } from 'react';

interface UseResetPasswordResult {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  sendResetEmail: (email:string) => Promise<void>;
}

export const useResetPassword = (): UseResetPasswordResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendResetEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send reset email. Please try again.');
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
    sendResetEmail,
  };
};
