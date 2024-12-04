import "styles/globals.css";
import "styles/animations.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { TransactionProvider } from "context";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </SessionProvider>
  );
}
