import Link from "next/link";
import React, { useState } from "react";
import { ProfileNavbar } from "components/layout";
import { Session } from "next-auth";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui";

interface TopNavProps {
  toggleStat?: boolean;
  auth: Session
  logOut: () => void
}

export const TopNav: React.FC<TopNavProps> = ({ toggleStat, auth, logOut }) => {
  const [toggle, setToggle] = useState(toggleStat);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="top-header">
      <div className="header-bar flex justify-between">
        <div className="flex items-center space-x-1">
          <Link href="#" className="xl:hidden block me-2">
            <Image
              src="/assets/images/logo-icon-32.png"
              className="md:hidden block"
              alt="logo-icon"
              width={32}
              height={32}
            />
            <span className="md:block hidden">
              <Image
                src="/assets/images/logo-dark.png"
                className="inline-block dark:hidden"
                alt=""
                width={116}
                height={28}
              />
              <Image
                src="/assets/images/logo-light.png"
                className="hidden dark:inline-block"
                alt=""
                width={116}
                height={28}
              />
            </span>
          </Link>
          <Link
            href="#"
            id="close-sidebar"
            className="btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
          >
            <div onClick={() => toggleHandler()}>
              <Menu className="size-4" />
            </div>
          </Link>
        </div>

        <ul className="list-none mb-0 space-x-1">
          <li className="dropdown inline-block relative">
            <Avatar onClick={() => setIsOpen(!isOpen)} className="hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{auth.user.name}</AvatarFallback>
            </Avatar>
            <ProfileNavbar logOut={() => logOut()} onOpen={isOpen} user={auth?.user} token={auth?.token} expires={auth?.expires} />
          </li>
        </ul>
      </div>
    </div>
  );
};
