import React, { useState } from "react";
import {Navbar, TopNav, Footer} from "components/layout"
import { Switcher } from "components/Switcher";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface LayoutMainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<LayoutMainProps> = ({ children }) => {
  const [toggle] = useState(true);
  const {data: session} = useSession();

  return (
    <>
      <div className={`page-wrapper  ${toggle ? "toggled" : ""}`}>
        <Navbar />
        <main className="page-content bg-gray-50 dark:bg-slate-800">
          <TopNav logOut={() => signOut()}  auth={session as Session} toggleStat={toggle} />
          {children}
          <Footer />
        </main>
      </div>
      <Switcher />
    </>
  );
};
