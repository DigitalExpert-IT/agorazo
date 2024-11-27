import { Session } from "next-auth";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Switcher } from "components/Switcher";
import { Navbar, TopNav, Footer } from "components/layout";

interface LayoutMainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<LayoutMainProps> = ({ children }) => {
  const [toggle] = useState(true);
  const { data: session } = useSession();

  return (
    <>
      <div className={`page-wrapper  ${toggle ? "toggled" : ""} min-h-lvh`}>
        <Navbar />
        <main className="page-content bg-gray-50 dark:bg-slate-800">
          <TopNav
            logOut={() => signOut()}
            auth={session as Session}
            toggleStat={toggle}
          />
          {children}
          <Footer />
        </main>
      </div>
      <Switcher />
    </>
  );
};
