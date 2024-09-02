import renderColors from "../CONSTANTS/Colors";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

{
  /* Component que serve para englobar o conteúdo das telas de login e cadastro */
}
const ContainerRegister = ({ children }: Props) => {
  return (
    <div
      style={{ backgroundColor: renderColors("container-bg") }}
      className={`roboto-medium text-white w-full h-screen sm:h-[60%]  px-4 sm:w-96 flex flex-col justify-center items-center py-5 sm:rounded-lg sm:shadow-md`}
    >
      {children}
    </div>
  );
};

export default ContainerRegister;
