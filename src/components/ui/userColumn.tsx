import { TableColumnProps } from "./tableColumn";

export const UserTableColumn = (transaction: TableColumnProps) => {
  const { reference, transaction_date, amount, status } = transaction;
  return (
    <tr>
      <td className="px-6 py-4 dark:text-white">{new Date(transaction_date).toLocaleDateString()}</td>
      <td className="px-6 py-4 dark:text-white">{amount} Zenq</td>
      <td className="px-6 py-4">
        <span
          style={
            status === "verified"
              ? { backgroundColor: "rgb(220 252 231)" }
              : { backgroundColor: "rgb(254 249 195)" }
          }
          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-500 dark:text-black"
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <a
          href={status === "verified" ? reference : ""}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          {status === "verified" ? reference.slice(0, 20) + "..." : "-"}
        </a>
      </td>
    </tr>
  );
}
