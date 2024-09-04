import { useCallback, useContext, useEffect, useState } from "react";
import { TaskType } from "../types/TaskType";
import { HeaderContext } from "../contexts/HeaderContext";
import { getAllTasks } from "../Api/tasks";

export interface TaskBoard {
  id: string;
  title: string;
  completed: string;
}

// O useTasks é um custom hook que ficará responsável por controlar todas as requisições feitas nas tarefas
export const useTasks = () => {
  const user = useContext(HeaderContext);
  const [tasks, setTasks] = useState<TaskBoard[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });

  const loadTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (user && token) {
      const { data, status } = await getAllTasks(user.user_info.id, token);
      if (status == 200) {
        const initializedTasks = data.data.map((task: TaskBoard) => ({
          id: task.id,
          title: task.title,
          completed: `${task.completed}`,
        }));
        setTasks(initializedTasks); // Atualizamos o estado local com as tarefas
      } else {
        setMessageError({ show: true, message: data.error });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    } else {
      setMessageError({ show: true, message: "Token não enviado!" });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };

  return {
    tasks,
    loading,
    messageError,
    messageSuccess,
    loadTasks,
    setTasks,
  };
};
