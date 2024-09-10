import { axiosInstance } from "./axiosInstance";

export const getAllProducts = async (pageNo, perPage) => {
  console.log(pageNo, perPage);
  try {
    const response = await axiosInstance.get(
      `/api/products?perPage=${perPage}&pageNo=${pageNo}`
    );
    console.log(response);
    return response.data;
  } catch (error) {}
};

export const getProductsByFilter = async (key, value) => {
  try {
    const response = await axiosInstance.post(
      `/api/products/filter?${key}=${value}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
