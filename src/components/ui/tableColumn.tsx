import { WithRole } from "hoc";
import { AdminTableColumn } from "./adminColumn";
import { UserTableColumn } from "./userColumn";

export interface TableColumnProps {
  email?: string;
  reference: string;
  transaction_date: string;
  amount: number;
  status: string;
  userRole: string;
}

export const TableColumn: React.FC<TableColumnProps> = ({
  email,
  reference,
  transaction_date,
  amount,
  status,
  userRole,
}) => {
  return (
      <WithRole allowedRoles={["admin"]} userRole={userRole} 
        fallback={
          <UserTableColumn 
            userRole={userRole} 
            transaction_date={transaction_date} 
            amount={amount} status={status} 
            reference={reference} 
            email={email}
          />
        }>
          <AdminTableColumn 
            userRole={userRole} 
            transaction_date={transaction_date} 
            amount={amount} status={status} 
            reference={reference} 
            email={email} />
      </WithRole>

  );
};
