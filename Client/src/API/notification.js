import { axiosInstance } from "./axiosInstance";

export const notifyOwner = async (payload) => {
  try {
    const response = await axiosInstance.post("/notify", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllNotification = async () => {
  try {
    const response = await axiosInstance.get("/notifications");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
