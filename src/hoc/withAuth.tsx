import React, { useEffect } from "react";
import { LayoutIllustration } from "components/layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const withAuth = (WrappedComponent: () => JSX.Element | null) => {
  const RegistrationWrapper = () => {
    const { data: session } = useSession();
    if (!session) {
      return <RegistrationRequired />;
    }
    return <WrappedComponent />;
  };
  return RegistrationWrapper;
};

const RegistrationRequired = () => {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <LayoutIllustration
      illustrationUri="/assets/images/registration-required.svg"
      title={"Login Required"}
      description={"You need to be login to access this page"}
    />
  );
};
