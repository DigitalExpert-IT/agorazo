import { LayoutMain } from "components/layout";
import Image from "next/image";

export default function Home() {
  return (
    <LayoutMain>
      <div className="container-fluid relative px-3">
        <div className="layout-specing">
          <div className="md:flex justify-between items-center mb-10">
            <div>
              <h5 className="text-lg font-semibold dark:text-white">
                Frequently Asked Questions
              </h5>
            </div>
          </div>

          <div className="flex">
            <div className="rounded-md shadow dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 w-1/4 mr-2 space-y-3">
              <div>
                <h5 className="text-black dark:text-white text-sm">
                  Token Price
                </h5>
                <span className="dark:text-white text-black text-lg font-bold">
                  1500000
                </span>
              </div>
              <div className="space-y-2">
                <h5 className="dark:text-white text-black text-sm">
                  ZENQ Balance
                </h5>
                <div className="flex space-x-2">
                  <Image
                    src="/zenq.svg"
                    alt="zenq-logo"
                    height={30}
                    width={30}
                  />
                  <span className="text-lg font-bold dark:text-white text-black">
                    1500000
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="dark:text-white text-black text-sm">
                  USDT Balance
                </h5>
                <div className="flex space-x-2">
                  <Image
                    src="/usdt.svg"
                    alt="zenq-logo"
                    height={30}
                    width={30}
                  />
                  <span className="text-lg font-bold dark:text-white text-black">
                    1500000
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-md shadow dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 w-full">
              <h5 className="font-semibold">General Questions</h5>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
