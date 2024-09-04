import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="w-4/5 flex justify-between items-center p-3  bg-[#5052b1]  fixed top-0 z-20">
      <Link to={"/"} className="text-2xl font-semibold text-white">
        Easy-Sell.io
      </Link>
      <div className="flex gap-3 items-center text-white">
        <NavLink className="p-2  " to={"/"}>
          Home
        </NavLink>
        {user.user ? (
          <>
            {user.user.role === "user" || user.user.user?.role === "user" ? (
              <NavLink className="p-2 flex gap-1 items-center" to={"/profile"}>
                Profile
              </NavLink>
            ) : (
              <NavLink className="p-2 flex gap-1 items-center" to={"/admin"}>
                Admin Panel
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink className="p-2 " to={"/login"}>
              Login
            </NavLink>
            <NavLink className="p-2 " to={"/register"}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
