import Link from "next/link";
import { useState } from "react";
import { Airplay } from "lucide-react";
import SimpleBarReact from "simplebar-react";
import Image from "next/image";

export const Navbar = () => {
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
