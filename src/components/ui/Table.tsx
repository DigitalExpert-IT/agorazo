import React, { useState } from "react";
import { TableColumn } from "./tableColumn";
import { Users } from "constant";
import { Search } from "lucide-react";

export const Table = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const totalPage = Math.ceil(Users.length/5)


  return (
    <div className="w-full p-10">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex flex-row gap-5 justify-end ps-1.5 my-4">
            <div className="form-icon relative sm:block">
              <Search className="absolute top-4 -translate-y-1/2 start-3 text-black dark:text-white" />
              <input
                type="text"
                className="form-input min-h-10 w-56 ps-9 py-2 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white text-black shadow-md"
                name="s"
                id="searchItem"
                placeholder="Search..."
              />
            </div>
            {isAdmin ?
            <div>
              <button
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                  Withdraw All
              </button>
            </div>
            : null }
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="dark:bg-gray-700 bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Asset Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Join Since
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Users.slice(0,5).map((item, idx) => (
                <TableColumn key={idx} profile_email={item.profile_email} profile_name={item.profile_name} amount={item.amount} member_since={item.member_since}/>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-5">
              <div className="flex flex-row gap-2">
                <button
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    Prev
                </button>
                {Array.from({ length: totalPage }, (_, idx) => (
                  <button
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    key={idx}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    Next
                </button>
              </div>
            </div>
      </div>
    </div>
  );
};
