import React, { useState } from "react";
import { Navbar, Footer, TopNav } from "components/Layout";

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = ({ children }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className={`page-wrapper  ${toggle ? "toggled" : ""}`}>
      <Navbar />
      <main className="page-content bg-gray-50 dark:bg-slate-800">
        <TopNav />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default LayoutMain;
