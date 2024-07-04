import React from "react";
import Home from "./Home.js";
import Result from "./Resultcomponent.js";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/result",
      element: <Result />,
    },
  ]);
  return routes;
};

export default AppRoutes;
