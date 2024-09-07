import { useDrag } from "react-dnd";
import renderColors from "../CONSTANTS/Colors";
import { UseTaskContext } from "../contexts/TasksContext";
import FormRegisterTask from "./FormRegisterTask";
import IconTrash from "./../assets/Icon-trash.png";
// Como vou usar essa interface localmente, irei criar aqui mesmo
interface TaskProps {
  id: string;
  title: string;
  description: string;
}

const TaskCard = ({ id, title, description }: TaskProps) => {
  const taskCtx = UseTaskContext();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const renderTasks = () => {
    if (taskCtx) {
      if (id !== taskCtx.taskSelected) {
        return (
          <div
            ref={drag}
            className={`montserrat-normal text-sm rounded-md`}
            style={{
              opacity: isDragging ? 0.5 : 1,
              padding: "8px",
              margin: "4px",
              cursor: "move",
              backgroundColor: `${renderColors("task-card")}`,
              wordWrap: "break-word",
            }}
          >
            <p>
              <span className="font-bold mr-1">Título:</span>
              {title}
            </p>
          </div>
        );
      }
      return (
        <div
          ref={drag}
          className={`montserrat-normal text-sm rounded-md w-58 text-wrap`}
          style={{
            opacity: isDragging ? 0.5 : 1,
            padding: "8px",
            margin: "4px",
            cursor: "move",
            wordWrap: "break-word",
            backgroundColor: `${renderColors("task-card")}`,
          }}
        >
          {taskCtx && taskCtx.editingMode ? (
            <div className="w-full">
              <FormRegisterTask
                data={{ title, description }}
                close={() => {}}
                sendData={(data) => {
                  const tempTask = {
                    id: taskCtx.taskSelected as string,
                    title: data.title,
                    description: data.description,
                  };
                  taskCtx.handleEditTask(tempTask);
                }}
              ></FormRegisterTask>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex justify-end w-full">
                <button
                  onClick={() => {
                    if (taskCtx.taskSelected) {
                      taskCtx.handleDeleteTask(taskCtx.taskSelected);
                    }
                  }}
                  className="bg-red-700 text-white flex px-2 py-1 rounded-md text-sm hover:scale-105 transition-all ease-linear duration-200"
                >
                  <img width={18} src={IconTrash} alt="" />
                  Excluir
                </button>
              </div>

              <p className="mb-2">
                <span className="font-bold mr-1">Título:</span>
                {title}
              </p>
              <p>
                <span className="font-bold mr-1">Descrição:</span>
                {description}
              </p>
            </div>
          )}

          <div className="flex flex-col w-full gap-1 mt-1">
            {taskCtx && taskCtx.editingMode ? null : (
              <button
                onClick={() => {
                  if (taskCtx) {
                    taskCtx.setEditingMode(true);
                  }
                }}
                className="hover:scale-105 transition-all duration-200 ease-linear bg-blue-700  text-sm text-white py-1 rounded-md"
              >
                EDITAR
              </button>
            )}

            <button
              className="hover:scale-105 transition-all duration-200 ease-linear cursor-pointer bg-red-700 text-sm text-white py-1 rounded-md"
              onClick={() => {
                if (taskCtx) {
                  taskCtx.setTaskSelected(null);
                  taskCtx.setEditingMode(false);
                }
              }}
            >
              {taskCtx && taskCtx.editingMode ? "CANCELAR" : "FECHAR"}
            </button>
          </div>
        </div>
      );
    }
  };

  return <>{renderTasks()}</>;
};

export default TaskCard;
