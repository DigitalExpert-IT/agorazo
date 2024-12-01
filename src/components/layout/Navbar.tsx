import Link from "next/link";
import { useState } from "react";
import { Airplay } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import Image from "next/image";
import { UseRegister } from "hooks";

export const Navbar = () => {
  const { sessionData } = UseRegister();
  const [manu] = useState("");

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <Link href="/index">
            <Image
              src="/assets/images/logo-dark.png"
              width={116}
              height={28}
              className="block dark:hidden"
              alt=""
            />
            <Image
              src="/assets/images/logo-light.png"
              width={116}
              height={28}
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
            {sessionData?.user.role === "admin" ? 
              <li className={["", "index"].includes(manu) ? "active" : ""}>
                <Link href="/dashboard">
                  <Airplay className="size-4 me-3" />
                  Dashboard
                </Link>
              </li>
            :
              <li className={["", "index"].includes(manu) ? "active" : ""}>
              <Link href="/dashboard">
                <Airplay className="size-4 me-3" />
                Dashboard
              </Link>
            </li>
            }
            <li className={["", "index"].includes(manu) ? "active" : ""}>
              <Link href="/withdraw">
                <Airplay className="size-4 me-3" />
                Withdraw
              </Link>
            </li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav>
  );
};
