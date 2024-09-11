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

export const deleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteNoti/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteAllNotifications = async (id) => {
  try {
    const response = await axiosInstance.delete(`/deleteAllNotis/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const markAsReadNoti = async (id) => {
  try {
    const response = await axiosInstance.post(`/markAsRead/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
