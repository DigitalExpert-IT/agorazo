import { useState, useEffect } from "react"
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface IResponse {
  message?: string;
  error?: string;
}

export const UseRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<IResponse>()
  const [showToast, setShowToast] = useState<boolean>(false)
  const [sessionData, setSessionData] = useState<Session | null>()

  // Fetch session after registration
  const fetchSession = async () => {
    const session = await getSession();
    setSessionData(session);
  };

  const registerUser = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setShowToast(false)
    setResponse(undefined)

    try {
      const res = await fetch('/api/auth/register', { // Ensure correct endpoint is used
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data: IResponse = await res.json()

      if (res.status >= 400) {
        setResponse(data)
        setShowToast(true)  // Show error toast if status >= 400
        return;
      }

      setResponse(data)

      // Fetch the session after a successful registration
      await fetchSession();

      if (data.message) {
        setShowToast(true) // Show success toast if message exists
      }

    } catch (error) {
      setResponse({ error: error as string || 'Network error, please try again.' })
      setShowToast(true)  // Show error toast
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Optionally check session on component mount
    fetchSession();
  }, []);

  return {
    response,
    registerUser,
    isLoading,
    showToast,
    sessionData,
    setShowToast
  }
}
