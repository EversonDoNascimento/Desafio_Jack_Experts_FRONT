import { useContext, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { HeaderContext } from "../contexts/HeaderContext";
import { UseTaskContext } from "../contexts/TasksContext";

const TaskBoard = () => {
  const userCtx = useContext(HeaderContext);
  const taskCtx = UseTaskContext();
  const moveTask = (taskId: string, newStatus: string) => {
    if (taskCtx) {
      taskCtx.handleStatusTask(taskId, Number(newStatus));
      taskCtx.loadTasks();
    }
  };

  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (userCtx) {
      // Setando o id do usuário no context da task
      taskCtx?.setUserId(userCtx.user_info.id);
      userCtx.getQtdTasksByStatus();
    }
  }, []);

  // Verificando se o state que controla a atualização do status recebeu alguma modificação
  // Caso ele tenha recebido, então o effect irá rodar e verificar se o handle é true
  // Se for siginifica que a função de carregar as tasks loadTasks precisa ser executada novamente
  // Isso irá garantir que sempre que movermos uma tarefa de um quadro para o outro, tudo se mantenha atualidado
  useEffect(() => {
    if (taskCtx?.handleStatus) {
      taskCtx.loadTasks();
      taskCtx.setHandleStatus(false);
      userCtx?.getQtdTasksByStatus();
    }
  }, [taskCtx?.handleStatus]);
  const columns = ["0", "1", "2"];
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-2">
      {columns.map((column) => (
        <div className="">
          {taskCtx ? (
            <>
              <TaskColumn
                completed={column}
                tasks={taskCtx.tasks.filter(
                  (task) => task.completed === column
                )}
                moveTask={moveTask}
              ></TaskColumn>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
