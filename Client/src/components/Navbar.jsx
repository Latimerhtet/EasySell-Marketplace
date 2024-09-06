import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="w-full flex justify-between items-center py-3 px-10 bg-slate-100  border-b-[1px] shadow-lg fixed top-0 z-20">
      <Link to={"/"} className="text-2xl font-semibold text-[#5052b1]">
        Zayy Sine
      </Link>
      <div className="flex gap-3 items-center text-white">
        <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/"}>
          Home
        </NavLink>
        <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/about"}>
          About
        </NavLink>
        <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/contact"}>
          Contact
        </NavLink>
        <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/QandA"}>
          Q & A
        </NavLink>
        {user.user ? (
          <>
            {user.user.role === "user" || user.user.user?.role === "user" ? (
              <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/profile"}>
                Profile
              </NavLink>
            ) : (
              <NavLink className="p-2 shadow-xl text-[#5052b1]" to={"/admin"}>
                Admin Panel
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink className="p-2 shadow-xl text-[#5052b1] " to={"/login"}>
              Login
            </NavLink>
            <NavLink className="p-2 shadow-xl text-[#5052b1] " to={"/register"}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
