import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { cn } from "../../lib/utils";
import Navbar from "../../shared/components/organisms/Navbar";
import Footer from "../../shared/components/organisms/Footer";

const StartLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const steps = [
    { label: "Insurance Package", path: "insurance" },
    { label: "Create an Order", path: "order" },
    { label: "Payment", path: "payment" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center px-4 py-2 border-b">
        <button
          onClick={() => setSidebarOpen((open) => !open)}
          className="text-gray-700 focus:outline-none"
          aria-label="Open menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="ml-4 font-semibold text-lg">Menu</span>
      </div>

      <div className="flex flex-1 relative">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r px-6 py-8 gap-6 bg-white z-10">
          <div className="flex flex-col gap-2">
            {steps.map((step) => (
              <NavLink
                to={step.path}
                key={step.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-left font-medium text-sm transition",
                    isActive
                      ? "bg-main-color text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                {step.label}
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Sidebar drawer for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/15 bg-opacity-30"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-64 bg-white h-full  flex flex-col px-6 py-8 gap-6 z-50">
              <button
                className="absolute top-4 right-4 text-gray-700"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                {/* Close icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col gap-2 mt-8">
                {steps.map((step) => (
                  <NavLink
                    to={step.path}
                    key={step.path}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 rounded-md text-left font-medium text-sm transition",
                        isActive
                          ? "bg-main-color text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    {step.label}
                  </NavLink>
                ))}
              </div>
            </aside>
          </div>
        )}

        <main className="flex-1 px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default StartLayout;
