/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Menu from "feather-icons-react";
import React, { useState } from "react";
import { UseProfile } from "hooks/useProfile";
import { ProfileNavbar } from "components/layout";
import { Session } from "next-auth";
import { IAuth } from "types/next-auth";
import { User } from "lucide-react";

interface TopNavProps {
  toggleStat?: boolean;
  auth: Session
  logOut: () => void
}

export const TopNav: React.FC<TopNavProps> = ({ toggleStat, auth, logOut }) => {
  const [toggle, setToggle] = useState(toggleStat);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {
    userHandler,
    userData,
    authenticated,
  } = UseProfile();

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="top-header">
      <div className="header-bar flex justify-between">
        <div className="flex items-center space-x-1">
          <Link href="#" className="xl:hidden block me-2">
            <img
              src="/assets/images/logo-icon-32.png"
              className="md:hidden block"
              alt=""
            />
            <span className="md:block hidden">
              <img
                src="/assets/images/logo-dark.png"
                className="inline-block dark:hidden"
                alt=""
              />
              <img
                src="/assets/images/logo-light.png"
                className="hidden dark:inline-block"
                alt=""
              />
            </span>
          </Link>
          <Link
            href="#"
            id="close-sidebar"
            className="btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
          >
            <div onClick={() => toggleHandler()}>
              <Menu className="size-4" icon="menu" />
            </div>
          </Link>
        </div>

        <ul className="list-none mb-0 space-x-1">
          <li className="dropdown inline-block relative">
            <button
              data-dropdown-toggle="dropdown"
              className="dropdown-toggle items-center"
              type="button"
            >
              <span
                className="btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
              {auth ?
                <img
                  src="/assets/images/client/02.jpg"
                  className="rounded-full"
                  alt=""
                />
                :
                <User className="text-[16px] align-middle me-1 ml-1" />
              }
              </span>
            </button>
              <ProfileNavbar logOut={() => logOut()} onOpen={isOpen} user={auth?.user} token={auth?.token}  expires={auth?.expires} />
          </li>
        </ul>
      </div>
    </div>
  );
};
