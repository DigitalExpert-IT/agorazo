import { withAuth } from "hoc";
import { Spinner } from "components";
import Image from "next/image"

const Home = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="z-10 flex flex-col items-center justify-center max-w-3xl w-full mx-auto h-full">
        <Image
          src="/assets/images/logo-dark.png"
          width={300}
          height={300}
          className="block dark:hidden mb-8"
          alt="Logo"
          priority
        />
        <Spinner />
      </div>
    </div>
  );
};

export default withAuth(Home);
