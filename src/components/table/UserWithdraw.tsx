import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "components/ui";
import Pagination from "components/Pagination";
import { IUserTransaction } from "constant";
import Link from "next/link";
import { statuses } from "constant/status";
import { Search } from "lucide-react";
import { useTransactions } from "context";

const columnHelper = createColumnHelper<IUserTransaction>();

export const UserWithdraw = () => {
  const { withdrawals} = useTransactions();

  const getStatusColor = (status: string): string => {
    const matchedStatus = statuses.find((item) => item.status === status);
    return matchedStatus ? matchedStatus.color : "#000000";
  };

  const columns = useMemo(() => [
    columnHelper.accessor("transactionDate", {
      cell: info => (
        <div className="min-w-[5rem] font-bold text-sm capitalize text-center">
          {info.getValue()}
        </div>
      ),
      header: () => <div>Date</div>,
    }),
    columnHelper.accessor("txnId", {
      cell: info => (
        <div className="min-w-[13rem] font-bold text-md capitalize text-center">
          {info.getValue()}
        </div>
      ),
      header: () => <div className="text-center">txnId</div>,
    }),
    columnHelper.accessor("amount", {
      cell: info => (
        <div className="min-w-[13rem] font-bold text-md capitalize text-center">
          {info.getValue()}
        </div>
      ),
      header: () => <div className="text-center">ZENQ Asset</div>,
    }),
    columnHelper.accessor("status", {
      cell: info => {
        const status = info.getValue();
        const color = getStatusColor(status);
        return (
          <span style={{backgroundColor: color}} className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            {info.getValue()}
          </span>
        )
      },
      header: () => <div className="text-center">Status</div>,
    }),
    columnHelper.accessor("reference", {
      cell: info => (
        <Link href={info.row.original.reference}>
          <div className="min-w-[13rem] font-bold text-md text-center hover:text-blue-700">
            {info.getValue().slice(0, 20) + "..."}
          </div>
        </Link>
      ),
      header: () => <div className="text-center">Reference</div>,
    }),
  ], []);

  const DataTableTransaction = useMemo(() => {
    if (!withdrawals) return [];

    return withdrawals.map((item) => ({
      txnId: item.txnId || "-",
      amount: item.value || 0,
      status: item.status || '',
      reference: item.reference || '',
      transactionDate: new Date(item.createdAt).toLocaleDateString() || "",
    }));
  }, [withdrawals]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = DataTableTransaction.slice(startIndex, endIndex);
  const totalPages = Math.ceil(DataTableTransaction.length / itemsPerPage);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-5 space-y-4">
       <div className="flex flex-row gap-5 justify-end ps-1.5 my-4">
          <div className="form-icon relative sm:block">
            <Search className="absolute top-5 -translate-y-1/2 start-3 text-black dark:text-white" />
            <input
              type="text"
              className="form-input min-h-10 w-56 ps-9 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white text-black shadow-md"
              name="search"
              id="searchItem"
              placeholder="Search..."
            />
          </div>
        </div>
      <div>
        <Table
          data={currentItems}
          columns={columns}

        />
      </div>

      {DataTableTransaction.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={handlePageClick}
          colorScheme="green"
        />
      )}
    </div>
  );
};