import { Outlet } from "react-router-dom";
import Navbar from "../../shared/components/organisms/Navbar";
import Footer from "../../shared/components/organisms/Footer";
import ScrollToTop from "../../utils/ScrollToTop";

const RooyLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RooyLayout;
