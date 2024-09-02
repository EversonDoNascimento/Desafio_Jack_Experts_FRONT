import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../Api/login";
import IconError from "./../assets/icon-error.png";
import Loading from "../components/Loading";

type Props = {
  children: ReactNode;
};

const PrivateRoutes = ({ children }: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    setLoading(true);
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        const localstorage = localStorage.getItem("token");
        if (localstorage) {
          const { status, data } = await verifyToken(localstorage);
          if (status === 200) {
            setAuth(true);
          } else {
            setMessageError({ show: true, message: data.error });
            setTimeout(
              () => setMessageError({ show: false, message: "" }),
              3000
            );
            setTimeout(() => navigate("/login"), 3000);
          }
        } else {
          setMessageError({ show: true, message: "Token não encontrado!" });
          setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    };
    checkToken();
    setLoading(false);
    return () => {};
  }, [navigate]);

  const renderMessage = () => {
    return (
      <>
        {messageError.show ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
            className="absolute bg-black/50"
          >
            <div className="WindowError">
              <img width={75} src={IconError} alt="Ícone de erro"></img>
              {messageError.message}
            </div>
          </div>
        ) : null}
      </>
    );
  };

  if (loading) return <Loading></Loading>;
  if (!auth) return <>{renderMessage()}</>;
  return <>{children}</>;
};

export default PrivateRoutes;
