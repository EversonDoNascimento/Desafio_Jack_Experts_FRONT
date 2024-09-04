import { useDrag } from "react-dnd";
import renderColors from "../CONSTANTS/Colors";

// Como vou usar essa interface localmente, irei criar aqui mesmo
interface TaskProps {
  id: string;
  title: string;
}

const TaskCard = ({ id, title }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <>
      <div
        ref={drag}
        className={`montserrat-normal text-sm rounded-md`}
        style={{
          opacity: isDragging ? 0.5 : 1,
          padding: "8px",
          margin: "4px",
          cursor: "move",
          backgroundColor: `${renderColors("task-card")}`,
        }}
      >
        Título: {title}
      </div>
    </>
  );
};

export default TaskCard;
