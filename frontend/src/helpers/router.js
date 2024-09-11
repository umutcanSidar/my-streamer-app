import { createBrowserRouter } from "react-router-dom";
// layouts
import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";
// pages
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
// pages -> Admin
// import DashBoardPage from "../pages/admin/DashBoardPage";
import ProtectedRoute from "../layouts/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
    ],
  },
]);
