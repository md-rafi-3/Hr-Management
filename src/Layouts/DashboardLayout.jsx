import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 md:ml-64 bg-base-200 min-h-screen p-6 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
