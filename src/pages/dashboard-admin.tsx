import { BalanceInfo } from "components";
import { LayoutMain } from "components/layout";
import { TableAdmin } from "components/ui/TableAdmin";

const DashboardAdmin = () => {

  return (
    <LayoutMain>
      <BalanceInfo />
      <TableAdmin />
    </LayoutMain>
  );
}

export default DashboardAdmin;
