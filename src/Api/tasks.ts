import axios from "axios";
import { api } from "./api";
import { TaskTypeRegister } from "../types/TaskType";

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

export const registerTask = async (data: TaskTypeRegister, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post(`/task/register`, data, { headers });
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

export const changeStatusTask = async (
  id_task: string,
  completed: number,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.patch(
      `/task/completed/${id_task}`,
      { completed },
      { headers }
    );
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

export const editTask = async (
  token: string,
  data: { id: string; title: string; description: string }
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.patch(`/task/edit`, data, { headers });
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

export const deleteTask = async (token: string, id_task: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.delete(`/task/delete/${id_task}`, { headers });
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
