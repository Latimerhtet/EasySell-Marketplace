import { axiosInstance } from "./axiosInstance";

export const createBid = async (payload) => {
  try {
    const response = await axiosInstance.post("/createBid", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getBidById = async (id) => {
  try {
    const response = await axiosInstance.get(`/bid/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
