import DriverNewMoveRequest from "./components/DriverNewMoveRequest";
import DriverStatusManager from "./components/DriverStatusManager";

const HomePageDriver = () => {
  return (
    <>
      <DriverStatusManager />

      <DriverNewMoveRequest />
    </>
  );
};

export default HomePageDriver;
