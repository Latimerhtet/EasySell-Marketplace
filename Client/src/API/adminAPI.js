import { axiosInstance } from "./axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/admin/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
