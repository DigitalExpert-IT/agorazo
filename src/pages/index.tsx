import { withAuth } from "hoc";
import { LoadingScreen } from "components";

const Home = () => {
  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default withAuth(Home);
