import React from "react";
import Link from "next/link";
import { AuthLayout } from "components/layout/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";

interface IResetPassword {
    email: string;

}

export default function ResetPassword() {
    const {register, handleSubmit} = useForm<IResetPassword>();

    const onSubmit: SubmitHandler<IResetPassword> = (data) => console.log(data)

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
            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
            <div className="grid grid-cols-1">
              <p className="text-slate-400 mb-6">
                Please enter your email address. You will receive a link to
                create a new password via email.
              </p>
              <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      Email Address:
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is Required",
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                        }})}
                      id="LoginEmail"
                      type="email"
                      className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="submit"
                      className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full"
                      value="Send"

                    />
                  </div>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="text-black dark:text-white font-bold"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
