import React from "react";
import { Link, NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="w-4/5 flex justify-between items-center p-3 border-y-2 border-[#5052b1]  fixed top-0">
      <Link to={"/"} className="text-2xl font-semibold ">
        Easy-Sell.io
      </Link>
      <div className="flex gap-3 items-center">
        <NavLink className="p-2  " to={"/"}>
          Home
        </NavLink>
        {user.user.user?._id || user.user.user ? (
          <NavLink className="p-2 flex gap-1 items-center" to={"/profile"}>
            <UserIcon /> Profile
          </NavLink>
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
