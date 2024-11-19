import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerifyEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    if (token) {
      verifyEmail(token as string);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationToken }),
      });

      if (response.ok) {
        setStatus("success");
        // Redirect to login after 3 seconds
        setTimeout(() => router.push("/login"), 3000);
      } else {
        const { error } = await response.json(); // Attempt to extract error message from the response
        console.error("Verification error:", error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Verification request failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div>
          <h1>Email Verified!</h1>
          <p>Redirecting to login...</p>
        </div>
      )}
      {status === "error" && (
        <div>
          <h1>Verification Failed</h1>
          <p>Invalid or expired verification link.</p>
        </div>
      )}
    </div>
  );
}
