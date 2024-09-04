import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import renderColors from "../CONSTANTS/Colors";

interface TaskColumnProps {
  completed: string;
  tasks: { id: string; title: string; completed: string }[];
  moveTask: (id: string, completed: string) => void;
}

const TaskColumn = ({ completed, tasks, moveTask }: TaskColumnProps) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => moveTask(item.id, completed),
  }));
  const renderTitle = (title: string) => {
    switch (title) {
      case "0":
        return "Backlog";
        break;
      case "1":
        return "Fazendo";
      case "2":
        return "Concluídas";
      default:
        break;
    }
  };
  return (
    <>
      <div
        ref={drop}
        style={{
          backgroundColor: `${renderColors("container-bg")}`,
        }}
        className="rounded-xl w-[16rem] p-4 min-h-40"
      >
        <h4 className="text-white font-semibold roboto-bold pb-2 mb-4 border-b-2 border-white/50">
          {renderTitle(completed)}
        </h4>

        {tasks.map((task) => {
          return (
            <>
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
              ></TaskCard>
            </>
          );
        })}
        {completed == "0" && (
          <div
            onClick={() => {
              alert("Clicou");
            }}
            style={{ backgroundColor: renderColors("btn-register") }}
            className="mx-1 hover:scale-105 transition-all opacity-60 hover:opacity-100 ease-linear duration-200 cursor-pointer rounded-md"
          >
            <div className="flex justify-center items-center relative p-4 w-full">
              <div className="w-6 border-b-4 border-white absolute rotate-90 "></div>
              <div className="w-6 border-b-4 border-white absolute "></div>
            </div>
          </div>
        )}

        <p className="text-[13px] text-white w-52 text-center mt-11 roboto-bold">
          Clique duas vezes na tarefa para visualizá-la
        </p>
      </div>
    </>
  );
};

export default TaskColumn;
