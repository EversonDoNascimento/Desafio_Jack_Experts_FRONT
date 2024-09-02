import axios from "axios";
import { api } from "./api";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/login`, { email, password });
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

export const verifyToken = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/user/verifyToken`, { headers });
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
