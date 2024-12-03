import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "components/ui";
import Pagination from "components/Pagination";
import { IUserTransaction } from "constant";
import { useGetWithdrawals } from "hooks";
import { Badge } from "components/ui/Badge";
import { usePaymentStatus } from "hooks/usePaymentStatus";
import Link from "next/link";
import { statuses } from "constant/status";

const columnHelper = createColumnHelper<IUserTransaction>();

export const UserWithdraw = () => {
  const { withdrawals } = useGetWithdrawals();

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

// Separate component to use the hook correctly
const TransactionStatusCell = ({ txnId }: { txnId: string }) => {
  const { statusText, error, signal } = usePaymentStatus(txnId);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-w-[13rem] font-bold text-md capitalize text-center">
      {statusText ? (
        <Badge variant={signal < 0 ? "destructive" : signal === 0 ? "warning" : "success"}>
          {statusText}
        </Badge>
      ) : (
        <div className="text-gray-500">Loading...</div>
      )}
    </div>
  );
};