import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <nav className="p-4 bg-red-100">
        <Link to="/admin">Admin Dashboard</Link> |{" "}
        <Link to="/">Back to Home</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
