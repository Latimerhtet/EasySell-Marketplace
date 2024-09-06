import React from "react";
import Login from "./pages/auth/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile/Profile";
import AuthProvider from "./Providers/AuthProvider";
import Admin from "./pages/admin/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import QuestionsAndAnswer from "./pages/Q&A";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        { index: true, element: <Home /> },
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
        { path: "/productDetail/:id", element: <ProductDetail /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/QandA", element: <QuestionsAndAnswer /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
