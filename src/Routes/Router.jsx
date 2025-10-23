import { createBrowserRouter } from "react-router";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import CalendarPage from "../Pages/CalendarPage";
import Employee from "../Pages/Employee";

export  const router = createBrowserRouter([
 {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/calendar", element: <CalendarPage></CalendarPage> },
      { path: "/employees", element: <Employee></Employee> },
    //   { path: "/settings", element: <Settings /> },
    ],
  },
]);