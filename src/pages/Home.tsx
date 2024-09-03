import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { HeaderContext } from "../contexts/HeaderContext";
import { useTasks } from "../hooks/useTasks";
import Loading from "../components/Loading";
import StatusWindow from "../components/StatusWindow";
const Home = () => {
  const user = useContext(HeaderContext);
  const useTask = useTasks();
  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    user?.getQtdTasksByStatus();
  }, []);

  return (
    <>
      {useTask.loading ? (
        <Loading></Loading>
      ) : (
        <>
          {useTask.messageSuccess.show ? (
            <StatusWindow
              text={useTask.messageSuccess.message}
              error={false}
            ></StatusWindow>
          ) : null}
          {useTask.messageError.show ? (
            <StatusWindow
              text={useTask.messageError.message}
              error={true}
            ></StatusWindow>
          ) : null}
          <main className="flex">
            <Header></Header>
            {useTask.tasks.map((item) => {
              return <div>{item.completed}</div>;
            })}
            <button
              onClick={() => {
                user?.getQtdTasksByStatus();
              }}
            >
              recarregar
            </button>
          </main>
        </>
      )}
    </>
  );
};

export default Home;
