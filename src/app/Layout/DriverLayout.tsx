import { Outlet, Link } from "react-router-dom";

const DriverLayout = () => {
  return (
    <div>
      <nav className="p-4 bg-green-200">
        <Link to="/driver">Driver Dashboard</Link> |{" "}
        <Link to="/driver/allTrips">All Trips</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DriverLayout;
