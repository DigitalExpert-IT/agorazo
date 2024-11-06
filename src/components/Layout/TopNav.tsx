import Link from "next/link";
import Bell from "feather-icons-react";
import Menu from "feather-icons-react";
import React, { useEffect, useState } from "react";
import SimpleBarReact from "simplebar-react";
import {
  Wallet,
  Search,
  DollarSign,
  ShoppingCart,
  Settings,
  Truck,
  LogOut,
  User,
} from "lucide-react";

interface TopNavProps {
  toggleStat?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ toggleStat }) => {
  const [userData, setUserData] = useState(false);
  const [toggle, setToggle] = useState(toggleStat);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const handlar = () => {
      setNotification(false);
    };

    const user = () => {
      setUserData(false);
    };
    document.addEventListener("mousedown", handlar);
    document.addEventListener("mousedown", user);
  }, []);

  const notificationtoggle = () => {
    setNotification(!notification);
  };
  const userHandler = () => {
    setUserData(!userData);
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
          <div className="ps-1.5">
            <div className="form-icon relative sm:block hidden">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3" />
              <input
                type="text"
                className="form-input w-56 ps-9 py-2 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white"
                name="s"
                id="searchItem"
                placeholder="Search..."
              />
            </div>
          </div>
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
          <li className="inline-block mb-0">
            <Link
              href="#"
              id="connectWallet"
              className="btn btn-icon btn-sm rounded-full inline-flex bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
            >
              <Wallet />
            </Link>
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
            <div
              className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${
                userData ? "block" : "hidden"
              }`}
            >
              <div className="relative">
                <div className="py-8 bg-gradient-to-tr from-violet-600 to-red-600"></div>
                <div className="absolute px-4 -bottom-7 start-0">
                  <div className="flex items-end">
                    <img
                      src="/assets/images/client/02.jpg"
                      className="rounded-full size-10 shadow dark:shadow-gray-700"
                      alt=""
                    />

                    <span className="font-semibold text-[15px] ms-1">
                      Jenny Jimenez
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10 px-4">
                <h5 className="font-semibold text-[15px]">Wallet:</h5>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-400">
                    qhut0...hfteh45
                  </span>
                  <Link href="#" className="text-violet-600">
                    <Wallet />
                  </Link>
                </div>
              </div>

              <div className="mt-4 px-4">
                <h5 className="text-[15px]">
                  Balance:{" "}
                  <span className="text-violet-600 font-semibold">
                    0.00045ETH
                  </span>
                </h5>
              </div>

              <ul className="py-2 text-start">
                <li>
                  <Link
                    href="/creator-profile"
                    className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
                  >
                    <User className="text-[16px] align-middle me-1" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/creator-profile-setting"
                    className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
                  >
                    <Settings className="text-[16px] align-middle me-1" />{" "}
                    Settings
                  </Link>
                </li>
                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
                  >
                    <LogOut className="text-[16px] align-middle me-1" /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
