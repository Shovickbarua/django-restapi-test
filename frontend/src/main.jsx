import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Scrape from "./pages/Scrape/Scrape";
import ScrapeInput from "./pages/Scrape/ScrapeInput";
import UserProvider from "./context/UserContext";
import GuestRoot from "./root/GuestRoot";
import Root from "./root/Root";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestRoot />,
    children: [
      { path: "/", element: <Login />, },
      { path: "/register", element: <Register />, },
    ],
  },
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/scrape", element: <ScrapeInput />, },
      { path: "/scrape-list", element: <Scrape />, },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);