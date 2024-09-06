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
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(`/updateProduct`, payload);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const upload = async (formData) => {
  try {
    const response = await axiosInstance.post(`/upload`, formData);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductImages = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/productImages/${product_id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSavedImages = async (payload) => {
  try {
    const { product_id, imageToDelete } = payload;
    const encodeImageToDelete = encodeURIComponent(imageToDelete);
    const response = await axiosInstance.delete(
      `/productImages/destory/${product_id}/${encodeImageToDelete}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const saveProducts = async (id) => {
  try {
    const response = await axiosInstance.post(`/save-product/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSavedProducts = async () => {
  try {
    const response = await axiosInstance.get("/getSavedProducts");
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
