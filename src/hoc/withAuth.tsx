import React from "react";
import { LayoutIllustration } from "components/layout";
import Link from "next/link";
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
  return (
    <LayoutIllustration
      illustrationUri="/assets/images/registration-required.svg"
      title={"Registration Required"}
      description={"You need to be registered to access this page"}
    >
      <Link href="/signup">
        <button className="mt-3 bg-[#9321dd] text-white hover:bg-[#61089c] rounded-xl font-medium text-md py-2 px-4">
          Register
        </button>
      </Link>
    </LayoutIllustration>
  );
};
