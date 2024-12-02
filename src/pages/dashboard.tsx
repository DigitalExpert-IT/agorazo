import { BalanceInfo, TableUser } from "components";
import { LayoutMain } from "components/layout";
import { withAuth } from "hoc";

const Dashboard = () => {

  return (
    <LayoutMain>
      <BalanceInfo />
      <TableUser />
    </LayoutMain>
  );
}

export default withAuth(Dashboard);
