import React from "react";
import Link from "next/link";
import { AuthLayout } from "components/layout/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div className="container relative z-1">
        <div className="flex justify-center">
          <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
            <Link href="/">
              <img
                src={"/assets/images/logo-dark.png"}
                className="mx-auto h-7 block dark:hidden"
                alt=""
              />
              <img
                src={"/assets/images/logo-light.png"}
                className="mx-auto h-7 dark:block hidden"
                alt=""
              />
            </Link>
            <h5 className="my-6 text-xl font-semibold">Login</h5>
            <form className="text-start">
              <div className="grid grid-cols-1">
                <div className="mb-4">
                  <label className="font-semibold" htmlFor="LoginEmail">
                    Email Address:
                  </label>
                  <input
                    id="LoginEmail"
                    type="email"
                    className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="font-semibold" htmlFor="LoginPassword">
                    Password:
                  </label>
                  <input
                    id="LoginPassword"
                    type="password"
                    className="form-input w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3"
                    placeholder="Password:"
                  />
                </div>

                <div className="flex justify-between mb-4">
                  <div className="inline-flex items-center mb-0">
                    <input
                      className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-violet-600 focus:border-violet-600/30 focus:ring focus:ring-offset-0 focus:ring-violet-600/20 focus:ring-opacity-50 me-2"
                      type="checkbox"
                      value=""
                      id="RememberMe"
                    />
                    <label
                      className="form-checkbox-label text-slate-400"
                      htmlFor="RememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                  <p className="text-slate-400 mb-0">
                    <Link href="/reset-password" className="text-slate-400">
                      Forgot password ?
                    </Link>
                  </p>
                </div>

                <div className="mb-4">
                  <input
                    type="submit"
                    className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full"
                    value="Login / Sign in"
                  />
                </div>

                <div className="text-center">
                  <span className="text-slate-400 me-2">{`Don't have an account ?`}</span>{" "}
                  <Link
                    href="/signup"
                    className="text-black dark:text-white font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
