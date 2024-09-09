import { useEffect, useState } from "react";
import renderColors from "../CONSTANTS/Colors";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Navegar para a página inicial quando o contador chegar a 0
    if (count <= 0) {
      navigate("/");
    }

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <main
      style={{ backgroundColor: renderColors("container-bg") }}
      className="flex w-screen h-screen justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center w-72 h-64 itensHeaderAnimation rounded-lg">
        <p className="text-3xl roboto-bold text-white">404</p>
        <p className="text-xl roboto-normal text-white">
          Página não encontrada!
        </p>
        <p className="text-white roboto-light text-sm">
          Você será redirecionado em: {count}s
        </p>
      </div>
    </main>
  );
};

export default NotFound;
