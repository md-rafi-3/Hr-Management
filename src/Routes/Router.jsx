import { createBrowserRouter } from "react-router";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";

export  const router = createBrowserRouter([
 {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
    //   { path: "/employees", element: <Employees /> },
    //   { path: "/reports", element: <Reports /> },
    //   { path: "/settings", element: <Settings /> },
    ],
  },
]);