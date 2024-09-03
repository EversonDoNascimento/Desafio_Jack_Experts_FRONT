type Props = {
  title: string;
  qtd: number;
  hiddenLine?: boolean;
};

const QtdTasks = ({ title, qtd, hiddenLine }: Props) => {
  return (
    <div
      className={`w-64 flex justify-between items-center text-white ${
        hiddenLine ? "" : "border-b-2"
      }  border-white/25 pb-4`}
    >
      <p className="font-bold">{title}:</p>{" "}
      <span className="text-black ml-2 bg-white px-2 py-1 rounded-lg">
        {qtd}
      </span>
    </div>
  );
};
export default QtdTasks;
