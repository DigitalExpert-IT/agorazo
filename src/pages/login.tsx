import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthLayout } from "../components/layout/AuthLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import Icon from "feather-icons-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { Toast } from "components/ui";
import Image from "next/image";

export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

export default function Login() {
  const router = useRouter()
  const [hide, setHide] = useState<boolean>(true)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [status, setStatus] = useState<number>()
  const { register, handleSubmit } = useForm<ILogin>();

  const handleLogin: SubmitHandler<ILogin> = async data => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    })

    setStatus(res?.status)
  };

  useEffect(() => {
    if (status === 200) {
      setShowToast(true)
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else if (status as number >= 400) {
      setShowToast(true);
    }
  }, [status, router])

  return (
    <AuthLayout>
      <div className="container relative z-1">
        <div className="flex justify-center">
          <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
            <Link href="/dashboard">
              <img
                src={"/assets/images/logo-dark.png"}
                width={116}
                height={28}
                className="mx-auto h-7 block dark:hidden"
                alt=""
              />
              <Image
                src={"/assets/images/logo-light.png"}
                className="mx-auto h-7 dark:block hidden"
                alt=""
                width={116}
                height={28}
              />
            </Link>
            <h5 className="my-6 text-xl font-semibold">Login</h5>
            <form className="text-start" onSubmit={handleSubmit(handleLogin)}>
              <div className="grid grid-cols-1">
                <div className="mb-4">
                  <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                  <input {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })} id="LoginEmail" type="email" className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="name@example.com" />
                </div>

                <div className="mb-4">
                  <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                  <div className="flex items-center mt-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 border border-gray-200 dark:border-gray-800 rounded-full">
                    <input
                      {...register("password", { required: true })}
                      id="LoginPassword"
                      type={hide ? "password" : "text"}
                      className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent outline-none border-none dark:focus:border-none focus:ring-0 rounded-l-full"
                      placeholder="Password:"
                    />
                    <button
                      type="button"
                      onClick={() => setHide(!hide)}
                      className="px-3"
                      aria-label="Toggle password visibility"
                    >
                      {hide ? <Icon icon="eye-off" className="text-gray-500 dark:text-slate-400" /> : <Icon icon="eye" className="text-gray-500 dark:text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="inline-flex items-center mb-0">
                    <input {...register("remember")} className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-violet-600 focus:border-violet-600/30 focus:ring focus:ring-offset-0 focus:ring-violet-600/20 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe" />
                    <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                  </div>
                  <p className="text-slate-400 mb-0"><Link href="/reset-password" className="text-slate-400">Forgot password ?</Link></p>
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
      {showToast && (
        <Toast
          status={status === 200 ? "success" : "error"}
          message={
            status === 200
              ? "Login Successful!"
              : "Login Error Please Check Your Credential"
          }
          onClose={() => setShowToast(false)}
        />
      )}
    </AuthLayout>
  );
}
