import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { changeStatusTask, getAllTasks, registerTask } from "../Api/tasks";
import Loading from "../components/Loading";

export type TaskBoard = {
  id: string;
  title: string;
  completed: string;
};

type ContextType = {
  tasks: TaskBoard[];
  setTasks: (task: TaskBoard[]) => void;
  loadTasks: () => void;
  userId: string | null;
  setUserId: (id: string) => void;
  createTask: (info_task: { title: string; description: string }) => void;
  handleStatusTask: (id_task: string, completed: number) => void;
  handleStatus: boolean;
  setHandleStatus: (value: boolean) => void;
};

export const TaskContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<TaskBoard[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [handleStatus, setHandleStatus] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (userId && token) {
      const { data, status } = await getAllTasks(userId, token);
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
  };

  const createTask = async (info_task: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (userId && token && info_task) {
      const { status, data } = await registerTask(
        { ...info_task, id_user: userId },
        token
      );
      if (status === 201) {
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
    if (token && id_task) {
      const { status, data } = await changeStatusTask(
        id_task,
        completed,
        token
      );
      if (status === 200) {
        setHandleStatus(true);
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
    if (userId) {
      loadTasks();
    }
  }, [userId]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loadTasks,
        userId,
        setUserId,
        createTask,
        handleStatusTask,
        handleStatus,
        setHandleStatus,
      }}
    >
      {loading ? <Loading></Loading> : <> {children}</>}
    </TaskContext.Provider>
  );
};

export const UseTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("O contexto precisa ficar dentro de um provider");
  }
  return context;
};
