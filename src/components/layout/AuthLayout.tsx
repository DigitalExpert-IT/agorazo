import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface IAuthWrapper {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: IAuthWrapper) => {
  return (
    <div>
      <section className="md:h-screen py-36 flex items-center bg-[url('/assets/images/cta.jpg')] bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        {children}
      </section>
      <div className="fixed bottom-3 end-3">
        <Link
          href="/login"
          className="back-button btn btn-icon bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full"
        >
          <ArrowLeft className="size-4" />
        </Link>
      </div>
    </div>
  );
};
