import axios from "axios";
import { api } from "./api";

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/user/register`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: error.response?.data,
        status: error.response?.status,
      };
    }
    throw error;
  }
};
