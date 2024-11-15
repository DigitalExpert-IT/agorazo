import { useState } from "react";

interface IResponse {
  message?: string;
  error?: string;
}

export const UseRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IResponse>(); // Default to null
  const [showToast, setShowToast] = useState<boolean>(false);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setShowToast(false);
    setResponse(undefined);

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data: IResponse = await res.json();

      setResponse(data);

      if (res.status >= 400) {
        setShowToast(true);
      } else if (data.message) {
        setShowToast(true);
      }
    } catch (error) {
      setResponse({
        error: (error as string) || "Network error, please try again.",
      });
      setShowToast(true); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return {
    response,
    registerUser,
    isLoading,
    showToast,
    setShowToast,
  };
};
