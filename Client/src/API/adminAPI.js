import { axiosInstance } from "./axiosInstance";

export const getAllProducts = async (pageNo, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/admin/products?pageNo=${pageNo}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setProductStatus = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/admin/setStatus/${payload.productId}`,
      { status: payload.productStatus }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const setUserStatus = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/admin/setUserStatus/${payload.userId}`,
      { status: payload.userStatus }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
