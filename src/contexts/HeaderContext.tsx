import { createContext, ReactNode, useEffect, useState } from "react";
import decodedToken from "../utils/DecodedToken";
import { qtdTasks } from "../Api/tasks";

type UserInfo = {
  id: string;
  email: string;
};

type TaskStatus = {
  doing: number;
  todo: number;
  done: number;
  total: number;
};

type ContextType = {
  user_info: UserInfo;
  qtdTasksByStatus: TaskStatus;
  getQtdTasksByStatus: () => void;
};

export const HeaderContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const HeaderProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    id: "",
  });

  const [qtdTasksByStatus, setQtdTasksByStatus] = useState<TaskStatus>({
    done: 0,
    doing: 0,
    todo: 0,
    total: 0,
  });

  const getQtdTasksByStatus = async () => {
    const token = localStorage.getItem("token");
    if (userInfo.id !== "" && token) {
      const { status, data } = await qtdTasks(token, userInfo.id);
      if (status === 200) {
        setQtdTasksByStatus({
          todo: data.todo,
          doing: data.doing,
          done: data.done,
          total: data.total,
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodedToken(token) as UserInfo;
        if (decoded && decoded.email && decoded.id) {
          setUserInfo({ email: decoded.email, id: decoded.id });
        }
      }
    }
  }, []);

  return (
    <HeaderContext.Provider
      value={{ user_info: userInfo, qtdTasksByStatus, getQtdTasksByStatus }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
