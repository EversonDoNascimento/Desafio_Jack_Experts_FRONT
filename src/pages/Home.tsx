import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { HeaderContext } from "../contexts/HeaderContext";

const Home = () => {
  const user = useContext(HeaderContext);
  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    user?.getQtdTasksByStatus();
  }, []);

  return (
    <main className="flex">
      <Header></Header>
      <button
        onClick={() => {
          user?.getQtdTasksByStatus();
        }}
      >
        recarregar
      </button>
    </main>
  );
};

export default Home;
