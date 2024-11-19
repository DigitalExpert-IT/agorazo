import { useEffect, useState } from "react";

export interface IUser {
  profile_name: string;
  profile_email: string;
  amount: number;
  member_since: number;
}

export const TableColumn: React.FC<IUser> = ({
  profile_email,
  profile_name,
  amount,
  member_since,
}) => {

  const [memberSince, setMemberSince] = useState<string | null >(null);

  useEffect(() => {
      setMemberSince(new Date(member_since).toLocaleDateString());
  }, [member_since]);
  
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {profile_name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {profile_email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 dark:text-gray-100">{amount}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-gray-600 text-green-800 dark:text-green-300">
          {memberSince}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <button
          type="button"
          style={{ backgroundColor: "rgb(147 51 234)", color: "white" }}
          className="focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Withdraw
        </button>
      </td>
    </tr>
  );
};
