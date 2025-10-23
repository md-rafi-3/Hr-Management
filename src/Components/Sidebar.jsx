import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import Logo from "../assets/logo.png";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const links = [
    { name: "Dashboard", to: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Employees", to: "/employees", icon: <Users size={20} /> },
    { name: "Reports", to: "/reports", icon: <FileBarChart size={20} /> },
    { name: "Settings", to: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`bg-base-100 shadow-lg flex flex-col h-screen fixed top-0 left-0 z-20 transition-width duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header / Logo */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-start"
        } p-4 border-b border-gray-200`}
      >
        {!collapsed && (
          <img src={Logo} alt="Logo"  />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`ml-auto btn btn-ghost btn-sm ${
            collapsed ? "" : "absolute right-4"
          }`}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <ul className="flex-1 mt-6 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                } ${collapsed ? "justify-center" : "justify-start"}`
              }
            >
              {link.icon}
              {!collapsed && <span className="font-medium">{link.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          className={`btn btn-error w-full flex items-center justify-center gap-2 ${
            collapsed ? "btn-circle" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
