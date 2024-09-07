import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {
  changeStatusTask,
  deleteTask,
  editTask,
  getAllTasks,
  registerTask,
} from "../Api/tasks";
import Loading from "../components/Loading";
import StatusWindow from "../components/StatusWindow";
import { useNavigate } from "react-router-dom";

export type TaskBoard = {
  id: string;
  title: string;
  completed: string;
  description: string;
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
  taskSelected: string | null;
  setTaskSelected: (value: string | null) => void;
  editingMode: boolean;
  setEditingMode: (value: boolean) => void;
  handleEditTask: (taskEdit: {
    id: string;
    title: string;
    description: string;
  }) => void;
  handleDeleteTask: (id_task: string) => void;
};

export const TaskContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const TaskProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<TaskBoard[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [taskSelected, setTaskSelected] = useState<null | string>(null);
  const [editingMode, setEditingMode] = useState(false);
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
          description: task.description,
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
      setTimeout(() => navigate("/login"), 3000);
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
        setMessageSuccess({
          show: true,
          message: "Tarefa criada com sucesso!",
        });
        setTimeout(() => setMessageSuccess({ show: false, message: "" }), 3000);
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

  const handleEditTask = async (taskEdit: {
    id: string;
    title: string;
    description: string;
  }) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token && taskEdit) {
      const { status, data } = await editTask(token, taskEdit);
      if (status === 200) {
        loadTasks();
        setEditingMode(false);
        setMessageSuccess({
          show: true,
          message: "Tarefa editada com sucesso!",
        });
        setTimeout(() => setMessageSuccess({ show: false, message: "" }), 3000);
      } else {
        setMessageError({
          show: true,
          message: data.error,
        });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    } else {
      setMessageError({
        show: true,
        message: "Token não encontrado!",
      });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id_task: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token && id_task) {
      const { data, status } = await deleteTask(token, id_task);
      if (status === 200) {
        loadTasks();
      } else {
        setMessageError({
          show: true,
          message: data.error,
        });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    } else {
      setMessageError({
        show: true,
        message: "Token não encontrado!",
      });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
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
        taskSelected,
        setTaskSelected,
        editingMode,
        setEditingMode,
        handleEditTask,
        handleDeleteTask,
      }}
    >
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageError.show && (
            <StatusWindow
              text={messageError.message}
              error={true}
            ></StatusWindow>
          )}
          {messageSuccess.show && (
            <StatusWindow
              text={messageSuccess.message}
              error={false}
            ></StatusWindow>
          )}
          {children}
        </>
      )}
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
