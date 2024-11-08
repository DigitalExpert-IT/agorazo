import { User, LogOut, LogIn } from "lucide-react";
import Link from "next/link";

interface ProfileNavbar {
  userData: boolean;
  authenticated: boolean;
}

export const ProfileNavbar = ({ userData, authenticated }: ProfileNavbar) => {
  return (
    <div
      className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ${
        userData ? "block" : "hidden"
      }`}
    >
      <div className="relative">
        <div className="py-8 bg-gradient-to-tr from-violet-600 to-red-600"></div>
        <div className="absolute px-4 -bottom-7 start-0">
          {!authenticated ? null : (
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
          )}
        </div>
      </div>

      {/* <div className="mt-10 px-4">
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
              </div> */}

      <ul className="py-2 text-start">
        <li>
          <Link
            href="/login"
            className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
            passHref
          >
            <LogIn className="text-[16px] align-middle me-1" /> Login
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
            passHref
          >
            <User className="text-[16px] align-middle me-1" /> Signup
          </Link>
        </li>
        <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
        {authenticated ? (
          <li>
            <Link
              href="/login"
              className="flex items-center text-[14px] font-semibold py-1.5 px-4 hover:text-violet-600"
              passHref
            >
              <LogOut className="text-[16px] align-middle me-1" /> Logout
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};
