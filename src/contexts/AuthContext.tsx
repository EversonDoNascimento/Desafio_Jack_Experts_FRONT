import { createContext, ReactNode, useState } from "react";
import { loginUser } from "../Api/login";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import StatusWindow from "../components/StatusWindow";

type contextType = {
  sendLogin: ({ email, password }: { email: string; password: string }) => void;
};

export const AuthContext = createContext<null | contextType>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [messageUnauthorized, setMessageUnauthorized] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const sendLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const { data, status } = await loginUser({ email, password });
    if (status === 200) {
      localStorage.setItem("token", data.token);
      setMessageSuccess({
        show: true,
        message: "Login realizado com sucesso!",
      });
      setTimeout(() => {
        setMessageSuccess({ show: false, message: "" });
      }, 3000);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      setMessageUnauthorized({
        show: true,
        message: data.error,
      });
      setTimeout(() => {
        setMessageUnauthorized({ show: false, message: "" });
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ sendLogin }}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageSuccess.show ? (
            <StatusWindow
              error={false}
              text={messageSuccess.message}
            ></StatusWindow>
          ) : null}
          {messageUnauthorized.show ? (
            <StatusWindow
              error={true}
              text={messageUnauthorized.message}
            ></StatusWindow>
          ) : null}

          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
