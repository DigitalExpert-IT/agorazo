import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthLayout } from "components/layout/AuthLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdatePassword } from "hooks";
import { useRouter } from "next/router";
import { Toast } from "components/ui";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";

interface INewPassword {
  password: string;
  confPassword: string;
}

function useGetTokenFromUri() {
  const router = useRouter();
  const { query } = router;

  const token = query.token || null;

  return token;
}

export default function ResetPassword() {
  const token = useGetTokenFromUri()
  const router = useRouter();
  const { register, getValues, handleSubmit, formState: { errors } } = useForm<INewPassword>();
  const [showToast, setShowToast] = useState<boolean>(false)
  const [hideFirst, setHideFirst] = useState<boolean>(true)
  const [hideSecond, setHideSecond] = useState<boolean>(true)
  const { isLoading, error, success, updatePassword } = useUpdatePassword();

  const handleReset: SubmitHandler<INewPassword> = async data => {
    await updatePassword(token as string, data.password);
  };

  useEffect(() => {
    if (success) {
      setShowToast(true)
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else if (error) {
      setShowToast(true);
    }
  }, [success, error])

  return (
    <AuthLayout>
      <div className="container relative z-1">
        <div className="flex justify-center">
          <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
            <Link href="/">
              <Image
                src={"/assets/images/logo-dark.png"}
                className="mx-auto h-7 block dark:hidden"
                alt=""
                width={116}
                height={28}
              />
              <Image
                src={"/assets/images/logo-light.png"}
                className="mx-auto h-7 dark:block hidden"
                alt=""
                width={116}
                height={28}
              />
            </Link>
            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
            <div className="grid grid-cols-1">
              <p className="text-slate-400 mb-6">
                Please create your new password
              </p>
              <form className="text-start" onSubmit={handleSubmit(handleReset)}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                    <div className="flex items-center mt-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 border border-gray-200 dark:border-gray-800 rounded-full">
                      <input
                        {...register("password", {
                          required: true,
                          validate: {
                            minLength: value =>
                              value.length >= 8 || "Password must be at least 8 characters",

                            hasUpperCase: value =>
                              /[A-Z]/.test(value) || "Password must contain at least 1 uppercase letter",

                            hasNumber: value =>
                              /\d/.test(value) || "Password must contain at least 1 number",

                            hasSpecialChar: value =>
                              /[!@#$%^&*(),.?":{}|<>_\-+=[\]~;]/.test(value) ||
                              "Password must contain at least 1 special character",
                          },
                        })}
                        id="LoginPassword"
                        type={hideFirst ? "password" : "text"}
                        className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent outline-none border-none dark:focus:border-none focus:ring-0 rounded-l-full"
                        placeholder="Password:"
                      />
                      <button
                        type="button"
                        onClick={() => setHideFirst(!hideFirst)}
                        className="px-3"
                        aria-label="Toggle password visibility"
                      >
                        {hideFirst ? <EyeClosed className="text-gray-500 dark:text-slate-400" /> : <Eye className="text-gray-500 dark:text-slate-400" />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">New Password:</label>
                    <div className="flex items-center mt-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 border border-gray-200 dark:border-gray-800 rounded-full">
                      <input
                        {...register("confPassword", {
                          required: true,
                          validate: value => value === getValues("password") || "Passwords must match"
                        })}
                        id="LoginPassword"
                        type={hideSecond ? "password" : "text"}
                        className="form-input text-black w-full text-[15px] py-2 px-3 h-10 bg-transparent outline-none border-none dark:focus:border-none focus:ring-0 rounded-l-full"
                        placeholder="New Password:"
                      />
                      <button
                        type="button"
                        onClick={() => setHideSecond(!hideSecond)}
                        className="px-3"
                        aria-label="Toggle password visibility"
                      >
                        {hideSecond ? <EyeClosed className="text-gray-500 dark:text-slate-400" /> : <Eye className="text-gray-500 dark:text-slate-400" />}
                      </button>
                    </div>
                    {errors.confPassword && (
                      <span className="text-red-500 text-sm">
                        {errors.confPassword.message}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <input
                      type="submit"
                      className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full w-full"
                      value={isLoading ? "Updating" : "Update Password"}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          status={error ? "error" : "success"}
          message={
            error
              ? error || "An error occurred during registration."
              : "New Password Updated!"
          }
          onClose={() => setShowToast(false)}
        />
      )}
    </AuthLayout>
  );
}
