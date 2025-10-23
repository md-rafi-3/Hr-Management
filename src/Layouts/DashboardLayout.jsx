import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useState } from "react";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content */}
      <div
        className={`flex-1 bg-base-200 min-h-screen transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar />

        {/* Page content below navbar */}
        <div className=" p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
