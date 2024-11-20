import { BalanceInfo, Spinner, Table } from "components";
import { LayoutMain } from "components/layout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (session) {
        router.push("/dashboard");
      } else router.push("/login");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [router]);


  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="z-10 flex flex-col items-center justify-center max-w-3xl w-full mx-auto h-full">
        <Image
          src="/assets/images/logo-dark.png"
          width={300}
          height={300}
          className="block dark:hidden mb-8"
          alt="Logo"
          priority
        />
        <Spinner />
      </div>
    </div>
  );
}
