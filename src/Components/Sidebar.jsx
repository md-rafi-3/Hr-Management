import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { name: "Dashboard", to: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Employees", to: "/employees", icon: <Users size={20} /> },
    { name: "Reports", to: "/reports", icon: <FileBarChart size={20} /> },
    { name: "Settings", to: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? "5rem" : "16rem" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-base-100 shadow-lg p-4 flex flex-col h-screen fixed left-0 top-0 z-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <AnimatePresence>
          {!collapsed && (
            <motion.img
              key="logo"
              src={Logo}
              alt="Logo"
             
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-sm btn-ghost absolute top-4 right-3"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <ul className="space-y-2 flex-1 mt-8">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              {link.icon}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-auto"
      >
        <button
          className={`btn btn-error w-full flex items-center justify-center gap-2 ${
            collapsed ? "btn-circle" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
