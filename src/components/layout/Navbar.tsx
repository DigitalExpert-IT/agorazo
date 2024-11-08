import Link from "next/link";
import { useState } from "react";
import { Airplay } from "lucide-react";
import SimpleBarReact from "simplebar-react";

export const Navbar = () => {
  const [manu] = useState("");

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <Link href="/index">
            <img
              src="/assets/images/logo-dark.png"
              height="24"
              className="block dark:hidden"
              alt=""
            />
            <img
              src="/assets/images/logo-light.png"
              height="24"
              className="hidden dark:block"
              alt=""
            />
          </Link>
        </div>
        <SimpleBarReact style={{ height: "calc(100% - 70px)" }}>
          <ul
            className="sidebar-menu border-t dark:border-white/10 border-gray-100"
            data-simplebar
            style={{ height: "calc(100% - 70px)" }}
          >
            <li className={["", "index"].includes(manu) ? "active" : ""}>
              <Link href="/index">
                <Airplay className="size-4 me-3" />
                Dashboard
              </Link>
            </li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav>
  );
};
