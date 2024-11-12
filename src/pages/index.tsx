import { BalanceInfo, Table } from "components";
import { LayoutMain } from "components/layout";

export default function Home() {
  
  return (
    <LayoutMain>
      <BalanceInfo />
      <Table />
    </LayoutMain>
  );
}
