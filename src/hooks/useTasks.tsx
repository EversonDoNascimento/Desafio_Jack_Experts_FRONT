import { useCallback, useContext, useEffect, useState } from "react";
import { HeaderContext } from "../contexts/HeaderContext";
import { changeStatusTask, getAllTasks, registerTask } from "../Api/tasks";

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
  // Flag para controlar o recarregamento de tasks
  const [reloadTasks, setReloadTasks] = useState(false);
  const loadTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (user && token) {
      const { data, status } = await getAllTasks(user.user_info.id, token);
      if (status === 200) {
        const initializedTasks = data.data.map((task: TaskBoard) => ({
          id: task.id,
          title: task.title,
          completed: `${task.completed}`,
        }));
        setTasks(initializedTasks); // Atualiza as tasks
      } else {
        setMessageError({ show: true, message: data.error });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    } else {
      setMessageError({ show: true, message: "Token não enviado!" });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  }; // Dependendo de user para memorizar corretamente

  const createTask = async (info_task: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (user && token && info_task) {
      const { status, data } = await registerTask(
        { ...info_task, id_user: user.user_info.id },
        token
      );
      if (status === 201) {
        setReloadTasks(true);
        console.log("criado");
      } else {
        setMessageError({ show: true, message: data.error });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    }
    setLoading(false);

    loadTasks();
  };

  const handleStatusTask = async (id_task: string, completed: number) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (user && token && id_task) {
      const { status, data } = await changeStatusTask(
        id_task,
        completed,
        token
      );
      if (status === 200) {
      } else {
        setMessageError({ show: true, message: data.error });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    }
    setLoading(false);
  };
  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadTasks();
  }, []);

  // useEffect(() => {
  //   console.log(tasks); // Apenas observa o estado sem causar loops
  // }, [setTasks]);
  return {
    tasks,
    loading,
    messageError,
    messageSuccess,
    loadTasks,
    setTasks,
    createTask,
    handleStatusTask,
    reloadTasks,
    setReloadTasks,
  };
};
