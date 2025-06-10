import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/organisms/Navbar";
import Footer from "../../shared/components/organisms/Footer";
import ScrollToTop from "../../utils/ScrollToTop";

const RooyLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RooyLayout;
