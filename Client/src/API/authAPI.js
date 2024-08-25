import { axiosInstance } from "./axiosInstance";

export const register = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
