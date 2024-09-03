import axios from "axios";
import { api } from "./api";

export const qtdTasks = async (token: string, id_user: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/tasks/qtd/${id_user}`, { headers });
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

export const getAllTasks = async (id_user: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/tasks/${id_user}`, { headers });
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
