import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import NotFound from "pages/404";
import SigninPage from "@/pages/Login";
import HomePage from "@/pages/Home";

import RootRoute, { rootRouteLoader } from "./root";
import AuthRoute, { authRouteLoader } from "./auth";
import PrivateRoute, { privateRouterLoader } from "./private";
import OnBoarding from "@/pages/OnBoarding";
import Logout from "@/pages/Logout";

const RouterApp = (props: any) => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootRoute />,
      loader: rootRouteLoader,
      children: [
        {
          element: <AuthRoute />,
          loader: authRouteLoader,
          children: [
            {
              path: "login",
              element: <SigninPage />,
            },
            {
              path: "onboarding",
              element: <OnBoarding />,
            },
          ],
        },
        {
          element: <PrivateRoute />,
          loader: privateRouterLoader,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "logout",
              element: <Logout />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default React.memo(RouterApp);
