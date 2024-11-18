import { BalanceInfo, Table } from "components";
import { LayoutMain } from "components/layout";
import { withAuth } from "hoc";

const Home = () => {
  
  return (
    <LayoutMain>
      <BalanceInfo />
      <Table />
    </LayoutMain>
  );
}

export default withAuth(Home);
