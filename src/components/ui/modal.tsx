import React from "react";
import { useForm } from "react-hook-form";
import { IUserTransaction } from "constant";
import { useTransactions } from "context";

type ModalProps = {
  onClose: () => void;
  transaction: IUserTransaction[];
};

export const Modal = ({ onClose, transaction }: ModalProps) => {
  const { updateWithdrawal, refetch } = useTransactions();
  const { register, handleSubmit } = useForm<IUserTransaction>({
    defaultValues: {
      id: transaction[0]?.id,
      status: transaction[0]?.status,
      value: transaction[0]?.value,
      createdAt: transaction[0]?.createdAt
    },
  });

  const onSubmit = async (data: Partial<IUserTransaction>) => {
    try {
      await updateWithdrawal(data.id as string, data.status as string);
      await refetch();
      onClose();
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <div style={{zIndex: 9999999999}} className="fixed min-h-full inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Transaction
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5 space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="id"
                {...register("id")}
                value={transaction.id}
                readOnly
                className="form-input min-w-full w-56 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white text-black shadow-md"
                />
            </div>

            <div>
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Amount
              </label>
              <input
                type="number"
                id="value"
                value={transaction.value}
                readOnly
                className="form-input min-h-10 min-w-full px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white text-black shadow-md"
                />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="mt-1 min-h-10 block min-w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="createdAt"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Created At
              </label>
              <input
                type="text"
                id="createdAt"
                value={new Date(transaction.createdAt).toLocaleDateString()}
                readOnly
                className="form-input min-w-full px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white text-black shadow-md"
              />
            </div>

            <div className="flex justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                Save
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
