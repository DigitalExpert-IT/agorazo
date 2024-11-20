import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type ComponentType = React.ComponentType<unknown>;

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType,
  options?: {
    redirectTo?: string;
  }
) => {
  const AuthWrapper: React.FC<P> = props => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const loginPath = options?.redirectTo || "/login";

    useEffect(() => {
      // If auth is finished loading and there's no session, redirect to login
      if (!isLoading && !session) {
        router.replace(loginPath);
      }
    }, [isLoading, session, router, loginPath]);

    // While loading or redirecting, show nothing
    if (isLoading || !session) {
      return null;
    }

    // If authenticated, show the protected component
    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  AuthWrapper.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthWrapper;
};
