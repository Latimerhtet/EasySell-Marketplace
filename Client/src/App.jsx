import React from "react";
import Login from "./pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Register from "./pages/Register";
import Profile from "./pages/Profile/Profile";
import AuthProvider from "./Providers/AuthProvider";
import Admin from "./pages/admin/Admin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <Admin />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
