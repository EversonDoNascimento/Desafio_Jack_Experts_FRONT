import renderColors from "../CONSTANTS/Colors";
import IconUser from "./../assets/Icon-user.png";
import IconArrow from "./../assets/Icon-arrow.png";
import IconLogout from "./../assets/Icon-logout.png";
import QtdTasks from "./QtdTasks";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderContext } from "../contexts/HeaderContext";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const headerCtx = useContext(HeaderContext);
  useEffect(() => {
    (function () {
      if (typeof window !== "undefined") {
        const localStorageHeader = localStorage.getItem("headerOpen");
        if (localStorageHeader) {
          setOpenNav(JSON.parse(localStorageHeader));
        }
      }
    })();
    return () => {};
  }, [headerCtx]);
  return (
    <header
      style={{
        backgroundColor: renderColors("container-bg"),
        width: `${openNav ? "18rem" : "4rem"}`,
      }}
      className="h-screen flex flex-col items-center  gap-5 transition-all ease-in-out duration-200 rounded-r-xl"
    >
      <div className="w-full flex justify-end px-4 mt-5">
        <img
          onClick={() => {
            setOpenNav(!openNav);
            if (typeof window !== "undefined") {
              localStorage.setItem("headerOpen", `${!openNav}`);
            }
          }}
          style={{ rotate: `${openNav ? "" : "180deg"}` }}
          className="hover:scale-105 duration-200 transition-all ease-linear cursor-pointer"
          src={IconArrow}
          alt=""
        />
      </div>

      {openNav ? (
        <>
          <div
            style={{ backgroundColor: renderColors("btn-register") }}
            className="w-64 h-20 rounded-md flex items-center gap-2 p-2 itensHeaderAnimation"
          >
            <div>
              <img src={IconUser} width={65} alt="Ícone do usuário" />
            </div>
            <p
              title={
                headerCtx?.user_info.email
                  ? headerCtx.user_info.email
                  : "Sem informações"
              }
              className="text-white font-bold overflow-x-hidden w-40"
            >
              {headerCtx?.user_info.email
                ? headerCtx.user_info.email
                : "Sem informações"}
            </p>
          </div>
          <div className="flex flex-col mt-8  gap-4 itensHeaderAnimation">
            <QtdTasks
              title="Tarefas para fazer"
              qtd={
                headerCtx?.qtdTasksByStatus.todo
                  ? headerCtx?.qtdTasksByStatus.todo
                  : 0
              }
            ></QtdTasks>
            <QtdTasks
              title="Tarefas sendo feitas"
              qtd={
                headerCtx?.qtdTasksByStatus.doing
                  ? headerCtx?.qtdTasksByStatus.doing
                  : 0
              }
            ></QtdTasks>
            <QtdTasks
              title="Tarefas concluídas"
              qtd={
                headerCtx?.qtdTasksByStatus.done
                  ? headerCtx?.qtdTasksByStatus.done
                  : 0
              }
            ></QtdTasks>
            <QtdTasks
              hiddenLine={true}
              title="Total de Tarefas"
              qtd={
                headerCtx?.qtdTasksByStatus.total
                  ? headerCtx?.qtdTasksByStatus.total
                  : 0
              }
            ></QtdTasks>
          </div>
          <div className="h-[50%]"></div>
          <div className="mb-11 text-white flex gap-2 items-center itensHeaderAnimation hover:scale-105 cursor-pointer transition-all ease-linear duration-200">
            <div>
              <img src={IconLogout} width={35} alt="" />
            </div>
            <Link
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("token");
                }
              }}
              to="/login"
              className="underline"
            >
              Sair
            </Link>
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col justify-between  mt-5  itensHeaderAnimation">
          <div className="flex flex-col gap-4">
            <span className="text-black ml-2 bg-white px-2 py-1 rounded-lg text-center">
              {headerCtx?.qtdTasksByStatus.todo
                ? headerCtx?.qtdTasksByStatus.todo
                : 0}
            </span>
            <span className="text-black ml-2 bg-white px-2 py-1 rounded-lg text-center">
              {headerCtx?.qtdTasksByStatus.doing
                ? headerCtx?.qtdTasksByStatus.doing
                : 0}
            </span>
            <span className="text-black ml-2 bg-white px-2 py-1 rounded-lg text-center">
              {headerCtx?.qtdTasksByStatus.done
                ? headerCtx?.qtdTasksByStatus.done
                : 0}
            </span>
            <span className="text-black ml-2 bg-white px-2 py-1 rounded-lg text-center">
              {headerCtx?.qtdTasksByStatus.total
                ? headerCtx?.qtdTasksByStatus.total
                : 0}
            </span>
          </div>
          <div className=" mb-11 itensHeaderAnimation hover:scale-105 cursor-pointer transition-all ease-linear duration-200">
            <Link to="/login" className="underline">
              <img src={IconLogout} width={35} alt="" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

{
  /* <div>
            <img
              title="Tarefas para fazer"
              alt="Ícone Tarefas para fazer"
              src={IconTasksBacklog}
              width={35}
            ></img>
          </div>
          <div>
            <img
              title="Tarefas sendo feitas"
              alt="Ícone Tarefas sendo feitas"
              src={IconTaskBeing}
              width={35}
            ></img>
          </div>
          <div>
            <img
              title="Tarefas concluídas"
              alt="Ícone Tarefas concluídas"
              src={IconTasksDone}
              width={35}
            ></img>
          </div>
          <div className="h-[350px]"></div> */
}
