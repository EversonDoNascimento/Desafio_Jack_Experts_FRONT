import { useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { useTasks } from "../hooks/useTasks";

const TaskBoard = () => {
  const { loadTasks, tasks, setTasks } = useTasks(); // Extraímos apenas o que precisamos de useTasks

  const moveTask = (taskId: string, newStatus: string) => {
    alert(newStatus);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: newStatus } : task
      )
    );
    if (newStatus === "2") {
      alert("Tarefa concluída!" + " ID " + taskId);
    }
  };

  // Desabilitando o recurso do eslint que solicita que o state tenha alguma depencência, pois nesse caso não precisamos
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    loadTasks();
  }, []);
  const columns = ["0", "1", "2"];
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-2">
      {columns.map((column) => (
        <div className="">
          <TaskColumn
            completed={column}
            tasks={tasks.filter((task) => task.completed === column)}
            moveTask={moveTask}
          ></TaskColumn>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
