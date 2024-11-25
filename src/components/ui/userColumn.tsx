import { TableColumnProps } from "./tableColumn";

export const UserTableColumn = (transaction : TableColumnProps ) => {
    const { reference, transaction_date, amount, status } = transaction;
    return (
      <tr>
        <td className="px-6 py-4">{new Date(transaction_date).toLocaleDateString()}</td>
        <td className="px-6 py-4">{amount}</td>
        <td className="px-6 py-4">
        <span
          style={
            status === "verified"
              ? { backgroundColor: "rgb(220 252 231)" }
              : { backgroundColor: "rgb(254 249 195)" }
          }
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full dark:bg-gray-600 text-slate-500 dark:text-green-300"
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <a
          href={reference}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          {reference.slice(0,20)+"..."}
        </a>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <button
          type="button"
          disabled={true}
          style={{ backgroundColor: "rgb(147 51 234)", color: "white" }}
          className="focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Withdraw
        </button>
      </td>
      </tr>
    );
  };