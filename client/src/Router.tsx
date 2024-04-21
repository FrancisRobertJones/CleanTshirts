import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import AdminPage from "./pages/AdminPage";
import Authpage from "./pages/Authpage";

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
      {
        path: "/auth",
        element: <Authpage />
      }
    ],
  },
]);