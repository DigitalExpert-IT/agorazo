export interface IUserTransaction {
  value: string;
  id:string;
  txnId: string;
  email:string;
  user?: string;
  transactionDate: string;
  amount: number;
  status: string;
  reference: string;
  createdAt?: Date;
  action?: () => void;
}

export const USER_TRANSACTION = () => {
  const dataTable = [];
  for (let index = 1; index <= 50; index++) {
    dataTable.push({
      email: `level ${index}`,
      amount: 60000,
      Status: "SUCCESS",
      reference: "Tong Shancong",
      transactionDate: "162923829"
    });
  }
  return dataTable;
};