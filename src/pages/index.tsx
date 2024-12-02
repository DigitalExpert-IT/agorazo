import LoadingScreen from "components/LoadingScreen";
import { withAuth } from "hoc";

const Home = () => {
  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default withAuth(Home);
