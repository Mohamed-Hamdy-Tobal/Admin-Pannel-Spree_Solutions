import React from 'react';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      //  dashboard  
      { index: true, element: <Home /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
