import Header from "../components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "../components/TaskBoard";
const Home = () => {
  return (
    <main className="flex gap-11 h-full">
      <Header></Header>
      <div className="flex flex-col items-center justify-center ml-4 sm:ml-0   w-full gap-11  mb-20 sm:mb-0">
        <h1 className="text-2xl font-bold mt-4 ">Quadro de tarefas</h1>

        <DndProvider backend={HTML5Backend}>
          <TaskBoard></TaskBoard>
        </DndProvider>
      </div>
    </main>
  );
};

export default Home;
