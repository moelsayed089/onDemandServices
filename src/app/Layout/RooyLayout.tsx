import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/organisms/Navbar";

const RooyLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RooyLayout;
