import { withAuth } from "hoc";
import { BalanceInfo, Table } from "components";
import { LayoutMain } from "components/layout";

const Home = () => {
  return (
    <LayoutMain>
      <BalanceInfo />
      <Table />
    </LayoutMain>
  );
};

export default withAuth(Home);
