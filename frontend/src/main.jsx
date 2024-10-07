import { StrictMode } from "react";
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext';
import "./index.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import ModifyUser from './pages/ModifyUser';

import Layout from "./layout/index.tsx";

import ErrorPage from "./error-page.tsx";

const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/allusers',
          element: <UserManagement />
        },
        {
          path: '/modify/:id',
          element: <ModifyUser />
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)


