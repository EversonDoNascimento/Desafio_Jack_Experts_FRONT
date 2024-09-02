import renderColors from "../CONSTANTS/Colors";

type Props = {
  text: string;
  click?: () => void;
};
const Button = ({ text, click }: Props) => {
  return (
    <button
      style={{ backgroundColor: renderColors("btn-register") }}
      className="py-1 text-sm w-full rounded-md montserrat-normal hover:scale-105 transition-all ease-linear duration-200"
      onClick={() => (click ? click() : null)}
    >
      {text}
    </button>
  );
};

export default Button;
