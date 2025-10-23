import { createBrowserRouter } from "react-router";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import CalendarPage from "../Pages/CalendarPage";

export  const router = createBrowserRouter([
 {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/calendar", element: <CalendarPage></CalendarPage> },
    //   { path: "/reports", element: <Reports /> },
    //   { path: "/settings", element: <Settings /> },
    ],
  },
]);