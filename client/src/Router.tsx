import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import AdminPage from "./pages/AdminPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          index: true,
        },
        {
            path: "/admin",
            element: <AdminPage />,
          },
      ],
    },
  ]);