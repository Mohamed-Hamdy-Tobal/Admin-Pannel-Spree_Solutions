import React from 'react';
import Layout from './components/layout/Layout';
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
      { index: true, element: <Dashboard /> },
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
