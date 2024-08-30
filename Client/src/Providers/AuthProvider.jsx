import React, { useEffect } from "react";
import { checkUserStatus } from "../API/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/userSlice";
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserStatus = async () => {
    try {
      const response = await checkUserStatus();
      // console.log(response);
      if (response?.isSuccess) {
        dispatch(setUser(response.user));
      } else {
        navigate("/");
        throw new Error("User unauthorized!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserStatus();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
