import { BalanceInfo, TableUser } from "components";
import { LayoutMain } from "components/layout";

const Dashboard = () => {

  return (
    <LayoutMain>
      <BalanceInfo />
      <TableUser />
    </LayoutMain>
  );
}

export default Dashboard;
