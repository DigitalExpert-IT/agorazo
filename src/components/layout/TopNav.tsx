/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Bell from "feather-icons-react";
import Menu from "feather-icons-react";
import React, { useState } from "react";
import SimpleBarReact from "simplebar-react";
import { DollarSign, ShoppingCart, Truck } from "lucide-react";
import { UseProfile } from "hooks/useProfile";
import { ProfileNavbar } from "components/layout";

interface TopNavProps {
  toggleStat?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ toggleStat }) => {
  const [toggle, setToggle] = useState(toggleStat);
  const {
    notification,
    setNotification,
    userHandler,
    userData,
    authenticated,
  } = UseProfile();

  const notificationtoggle = () => {
    setNotification(!notification);
  };

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
              className="dropdown-toggle btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
              type="button"
              onClick={notificationtoggle}
            >
              <Bell className="size-4" icon={""} />
              <span className="absolute top-0 end-0 flex items-center justify-center bg-emerald-600 text-white text-[10px] font-bold rounded-full size-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-emerald-600 after:top-0 after:end-0 after:rounded-full after:animate-ping"></span>
            </button>
            <div
              className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700  ${
                notification ? "block" : "hidden"
              }`}
            >
              <span className="px-4 py-4 flex justify-between">
                <span className="font-semibold">Notifications</span>
                <span className="flex items-center justify-center bg-emerald-600/20 text-emerald-600 text-[10px] font-bold rounded-full w-5 max-h-5 ms-1">
                  3
                </span>
              </span>
              <SimpleBarReact className="h-64">
                <ul className="py-2 text-start h-64 border-t border-gray-100 dark:border-gray-800">
                  <li>
                    <Link href="#" className="block font-medium py-1.5 px-4">
                      <div className="flex">
                        <div className="size-10 rounded-full shadow shadow-violet-600/10 dark:shadow-gray-700 bg-violet-600/10 dark:bg-slate-800 text-violet-600 dark:text-white flex items-center justify-center">
                          <ShoppingCart className="size-4" />
                        </div>
                        <div className="ms-2">
                          <span className="text-[15px] font-semibold block">
                            Order Complete
                          </span>
                          <small className="text-slate-400">15 min ago</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block font-medium py-1.5 px-4">
                      <div className="flex">
                        <img
                          src="/assets/images/client/01.jpg"
                          className="size-10 rounded-full shadow dark:shadow-gray-700"
                          alt=""
                        />
                        <div className="ms-2">
                          <span className="text-[15px] font-semibold block">
                            <span className="font-bold">Message</span> from Luis
                          </span>
                          <small className="text-slate-400">1 hour ago</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block font-medium py-1.5 px-4">
                      <div className="flex">
                        <div className="size-10 rounded-full shadow shadow-violet-600/10 dark:shadow-gray-700 bg-violet-600/10 dark:bg-slate-800 text-violet-600 dark:text-white flex items-center justify-center">
                          <DollarSign className="size-4" />
                        </div>
                        <div className="ms-2">
                          <span className="text-[15px] font-semibold block">
                            <span className="font-bold">Received Bid</span>
                          </span>
                          <small className="text-slate-400">2 hour ago</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block font-medium py-1.5 px-4">
                      <div className="flex">
                        <div className="size-10 rounded-full shadow shadow-violet-600/10 dark:shadow-gray-700 bg-violet-600/10 dark:bg-slate-800 text-violet-600 dark:text-white flex items-center justify-center">
                          <Truck className="size-4" />
                        </div>
                        <div className="ms-2">
                          <span className="text-[15px] font-semibold block">
                            Please check your activities
                          </span>
                          <small className="text-slate-400">Yesterday</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block font-medium py-1.5 px-4">
                      <div className="flex">
                        <img
                          src="/assets/images/client/02.jpg"
                          className="size-10 rounded-full shadow dark:shadow-gray-700"
                          alt=""
                        />
                        <div className="ms-2">
                          <span className="text-[15px] font-semibold block">
                            <span className="font-bold">Cally</span> started
                            following you
                          </span>
                          <small className="text-slate-400">2 days ago</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </SimpleBarReact>
            </div>
          </li>
          <li className="dropdown inline-block relative">
            <button
              data-dropdown-toggle="dropdown"
              className="dropdown-toggle items-center"
              type="button"
            >
              <span
                className="btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
                onClick={userHandler}
              >
                <img
                  src="/assets/images/client/02.jpg"
                  className="rounded-full"
                  alt=""
                />
              </span>
            </button>
            <ProfileNavbar userData={userData} authenticated={authenticated} />
          </li>
        </ul>
      </div>
    </div>
  );
};
