import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import renderColors from "../CONSTANTS/Colors";
import FormRegisterTask from "./FormRegisterTask";
import { useState } from "react";

import { UseTaskContext } from "../contexts/TasksContext";

interface TaskColumnProps {
  completed: string;
  tasks: {
    id: string;
    title: string;
    completed: string;
    description: string;
  }[];
  moveTask: (id: string, completed: string) => void;
}

const TaskColumn = ({ completed, tasks, moveTask }: TaskColumnProps) => {
  const taskCtx = UseTaskContext();

  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => moveTask(item.id, completed),
  }));
  const [showWindowAdd, setShowWindowAdd] = useState(false);
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

  const renderContentAdd = (condition: string) => {
    if (condition === "0") {
      if (showWindowAdd) {
        return (
          <FormRegisterTask
            sendData={(data) => {
              if (taskCtx) {
                taskCtx.createTask(data);
                taskCtx.loadTasks();
              }

              setShowWindowAdd(false);
            }}
            close={() => {
              setShowWindowAdd(false);
            }}
          ></FormRegisterTask>
        );
      }
      return (
        <div
          onClick={() => {
            setShowWindowAdd(true);
            if (taskCtx) {
              taskCtx.setEditingMode(false);
              taskCtx.setTaskSelected(null);
            }
          }}
          style={{ backgroundColor: renderColors("btn-register") }}
          className="mx-1 hover:scale-105 transition-all opacity-60 hover:opacity-100 ease-linear duration-200 cursor-pointer rounded-md "
        >
          <div className="flex justify-center items-center relative p-4 w-full">
            <div className="w-6 border-b-4 border-white absolute rotate-90 "></div>
            <div className="w-6 border-b-4 border-white absolute "></div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      {/* {messageError.show ? (
            <StatusWindow
              text={messageError.message}
              error={true}
            ></StatusWindow>
          ) : null} */}
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
            <div
              onDoubleClick={() => {
                setShowWindowAdd(false);
                if (taskCtx) {
                  taskCtx.setTaskSelected(task.id);
                }
              }}
            >
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
              ></TaskCard>
            </div>
          );
        })}

        {renderContentAdd(completed)}

        <p className="text-[13px] text-white w-52 text-center mt-11 roboto-bold">
          Clique duas vezes na tarefa para visualizá-la
        </p>
      </div>
    </>
  );
};

export default TaskColumn;
