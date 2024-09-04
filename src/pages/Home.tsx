import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { HeaderContext } from "../contexts/HeaderContext";
import { useTasks } from "../hooks/useTasks";
import Loading from "../components/Loading";
import StatusWindow from "../components/StatusWindow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "../components/TaskBoard";
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
          <main className="flex gap-11">
            <Header></Header>

            <div className="flex flex-col gap-11 ml-24 sm:ml-0 mb-20 sm:mb-0">
              <h1 className="text-2xl font-bold mt-4 ">Tarefas:</h1>
              <DndProvider backend={HTML5Backend}>
                <TaskBoard></TaskBoard>
              </DndProvider>
            </div>
          </main>
          {useTask.tasks.map((item) => item.completed)}
        </>
      )}
    </>
  );
};

export default Home;
