import React, { useState } from "react";
import { Navbar, Footer, TopNav } from "./";
import { Switcher } from "components/Switcher";

interface LayoutMainProps {
  children: React.ReactNode;
}

export const LayoutMain: React.FC<LayoutMainProps> = ({ children }) => {
  const [toggle] = useState(true);

  return (
    <>
      <div className={`page-wrapper  ${toggle ? "toggled" : ""}`}>
        <Navbar />
        <main className="page-content bg-gray-50 dark:bg-slate-800">
          <TopNav toggleStat={toggle} />
          {children}
          <Footer />
        </main>
      </div>
      <Switcher />
    </>
  );
};
