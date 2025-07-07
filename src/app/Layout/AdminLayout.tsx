import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  CreditCard,
  AlertTriangle,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import icon from "../../assets/icons/logoicon.webp";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin/dashboard" },
  { icon: Users, label: "Customers", to: "/admin/customers" },
  { icon: Car, label: "Drivers", to: "/admin/drivers" },
  { icon: Calendar, label: "Bookings", to: "/admin/orders" },
  { icon: CreditCard, label: "Payments", to: "/admin/payments" },
  { icon: AlertTriangle, label: "Disputes", to: "/admin/disputes" },
  { icon: BarChart3, label: "Reports", to: "/admin/reports" },
  { icon: Settings, label: "Settings", to: "/admin/settings" },
];

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const Sidebar = (
    <div className="w-64 bg-white shadow-sm border-r flex flex-col h-full">
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={icon} alt="logo" />
          </div>
          <span className="text-xl font-semibold text-main-color">
            DeliverCo
          </span>
        </div>
        <button className="md:hidden text-gray-500" onClick={toggleSidebar}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={index}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-6 py-3 transition-colors duration-200 rounded-r-full ${
                isActive
                  ? "bg-main-color text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 text-xs text-gray-500">SwiftMove Admin v1.0</div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black/30 bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed z-50 md:static h-full transition-transform duration-300 md:translate-x-0 bg-white ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {Sidebar}
      </div>

      <div className="flex-1 overflow-y-auto  ">
        <div className="md:hidden flex items-center justify-between p-4 md:p-8 border-b border-gray-200">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <span className="text-lg font-semibold text-gray-800">
            Admin Panel
          </span>
        </div>
        <div className="p-4 md:p-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
