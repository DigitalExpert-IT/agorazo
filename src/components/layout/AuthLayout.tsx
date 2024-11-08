import Link from "next/link";
import Icon from "feather-icons-react";

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
          href="/"
          className="back-button btn btn-icon bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full"
        >
          <Icon icon="arrow-left" className="size-4" />
        </Link>
        </div>
      </div>
  );
};
