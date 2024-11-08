import React, { useState } from "react";
import Link  from "next/link"
import { AuthLayout } from "../components/layout/AuthLayout";
import Icon from "feather-icons-react"
import { useForm, SubmitHandler } from "react-hook-form";

interface IRegister {
    name: string;
    email: string;
    password: string;
    accept: boolean
}



export default function Signup(){
    const [hide, setHide] = useState<boolean>(true)
    const {register, handleSubmit} = useForm<IRegister>();

    const onSubmit: SubmitHandler<IRegister> = (data) => console.log(data)

    return(
        <AuthLayout>
            <div className="container relative z-1">
                <div className="flex justify-center">
                    <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                        <Link href="/">
                            <img src={"/assets/images/logo-dark.png"} className="mx-auto h-7 block dark:hidden" alt=""/>
                            <img src={"/assets/images/logo-light.png"} className="mx-auto h-7 dark:block hidden" alt=""/>
                        </Link>
                        <h5 className="my-6 text-xl font-semibold">Signup</h5>
                        <form onSubmit={handleSubmit(onSubmit)} action="signup-success.html" className="text-start">
                            <div className="grid grid-cols-1">
                                <div className="mb-4">
                                    <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                                    <input {...register("name", {required: true})} id="RegisterName" type="text" className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="Harry"/>
                                </div>

                                <div className="mb-4">
                                    <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                    <input {...register("email", {
                                        required: "Email is Required",
                                        pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address"
                                    }})} id="LoginEmail" type="email" className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-full outline-none border border-gray-200 focus:border-violet-600 dark:border-gray-800 dark:focus:border-violet-600 focus:ring-0 mt-3" placeholder="name@example.com"/>
                                </div>

                                <div className="flex items-center mt-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 border border-gray-200 dark:border-gray-800 rounded-full">
                                    <input
                                        {...register("password", {required: true})}
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

                                <div className="flex items-center mb-4">
                                    <input {...register("accept", {required: true})} className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-violet-600 focus:border-violet-600/30 focus:ring focus:ring-offset-0 focus:ring-violet-600/20 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C"/>
                                    <label className="form-checkbox-label text-slate-400" htmlFor="AcceptT&C">I Accept <Link href="/" className="text-violet-600">Terms And Condition</Link></label>
                                </div>

                <div className="mb-4">
                  <input
                    type="submit"
                    className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full"
                    value="Register"
                  />
                </div>

                <div className="text-center">
                  <span className="text-slate-400 me-2">
                    Already have an account ?{" "}
                  </span>{" "}
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
        </AuthLayout>
  );
}
