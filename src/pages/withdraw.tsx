import { UserWithdraw } from "components";
import { LayoutMain } from "components/layout";
import WithdrawForm from "components/WithdrawForm";

const Dashboard = () => {

  return (
    <LayoutMain>
        <WithdrawForm/>
        <UserWithdraw />
    </LayoutMain>
  );
}

export default Dashboard;
