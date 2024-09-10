import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { UserIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkIcon, HomeIcon } from "@heroicons/react/24/solid";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Modal, Space } from "antd";
import { setUser } from "../store/Slices/userSlice";
const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between items-center py-3 px-10 bg-slate-100  border-b-[1px] shadow-lg fixed top-0 z-20">
      <Link to={"/"} className="text-2xl font-semibold text-[#5052b1]">
        Zayy Sine
      </Link>
      <div className="flex gap-3 items-center ">
        <NavLink className="p-2  text-[#5052b1]" to={"/"}>
          <HomeIcon className="w-6" />
        </NavLink>
        <NavLink className="p-2  text-[#5052b1]" to={"/contact"}>
          Contact
        </NavLink>
        <NavLink className="p-2  text-[#5052b1]" to={"/QandA"}>
          Q & A
        </NavLink>
      </div>
      <div className="flex gap-3 items-center text-white">
        {user.user ? (
          <>
            <NavLink className="p-2  text-[#5052b1]" to={"/savedProducts"}>
              <BookmarkIcon className="w-5" />
            </NavLink>
            {user.user.role === "user" || user.user.user?.role === "user" ? (
              <NavLink className="p-2  text-[#5052b1]" to={"/profile"}>
                <UserOutlined className="text-xl" />
              </NavLink>
            ) : (
              <NavLink className="p-2  text-[#5052b1]" to={"/admin"}>
                <UserIcon className="w-6" />
              </NavLink>
            )}
            <Space>
              <Modal
                open={open}
                title="Logout"
                onOk={logout}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                )}
              >
                Are you sure to logout?
              </Modal>
              <button className="cursor-pointer" onClick={showModal}>
                <ArrowRightStartOnRectangleIcon className="w-10 p-2  text-red-500" />
              </button>
            </Space>
          </>
        ) : (
          <>
            <NavLink className="p-2  text-[#5052b1] " to={"/login"}>
              Login
            </NavLink>
            <NavLink className="p-2  text-[#5052b1] " to={"/register"}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
