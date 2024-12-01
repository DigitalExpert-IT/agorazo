import { useTransactions } from "hooks";
import { Search } from "lucide-react";
import { ReactNode } from "react";

export const TableWrapper = (children: ReactNode) => {
    const { currentPage, totalPages, setPage } = useTransactions();

    
    return (
        <div className="w-full container mx-auto p-2">
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
                    <div>
                    <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Withdraw All
                    </button>
                    </div>
                </div>
                    {children}
                <div className="flex justify-end mt-5">
                <div className="flex flex-row gap-2">
                    <button
                    onClick={() => setPage(currentPage - 1)}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                    Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                    ))}
                    <button
                    onClick={() => setPage(currentPage + 1)}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    >
                    Next
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}