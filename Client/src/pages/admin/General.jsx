import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
const General = () => {
  const { email, name, role } = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section>
      <h2 className="text-3xl mb-3">General</h2>
      <div className="flex flex-col gap-3 ">
        <p>Email - {email} </p>
        <p>Name - {name} </p>
        <p>Role - {role} </p>
      </div>
      <button
        className="flex gap-2 items-center text-white p-2 bg-red-600 rounded-md productAddButton mt-4 logout"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </section>
  );
};

export default General;
