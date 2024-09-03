import { useContext, useEffect, useState } from "react";
import { TaskType } from "../types/TaskType";
import { HeaderContext } from "../contexts/HeaderContext";
import { getAllTasks } from "../Api/tasks";

export const useTasks = () => {
  const user = useContext(HeaderContext);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });

  // Buscando todas as tasks do usuário
  const fetchTasks = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && user?.user_info) {
        const { status, data } = await getAllTasks(user?.user_info.id, token);
        if (status == 200) {
          console.log(data.data);
          setTasks(data.data);
        } else {
          setMessageError({ show: true, message: data.error });
          setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
        }
      } else {
        setMessageError({ show: true, message: "Token não enviado!" });
        setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
      }
    }
    setLoading(false);
  };

  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchTasks();
  }, []);
  return { tasks, loading, messageError, fetchTasks, messageSuccess };
};
