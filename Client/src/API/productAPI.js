import { axiosInstance } from "./axiosInstance";

export const addProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/addProduct", payload);
    // console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllproducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    // console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(`/updateProduct`, payload);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteProduct/${id}`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
