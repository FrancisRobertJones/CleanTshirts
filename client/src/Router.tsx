import {
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import AdminPage from "./pages/AdminPage";
import Authpage from "./pages/Authpage";
import OrdersPage from "./pages/OrdersPage";
import Checkout from "./pages/Checkout";

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
      },
      {
        path: "/checkout",
        element: <Checkout />
      }
      ,
      {
        path: "/orders",
        element: <OrdersPage />
      }
    ],
  },
]);