import DriverStatusManager from "./components/DriverStatusManager";
import DriverTracker from "./components/DriverTracker";

const HomePageDriver = () => {
  return (
    <>
      <DriverTracker />
      <DriverStatusManager />
    </>
  );
};

export default HomePageDriver;
