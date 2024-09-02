import { useForm } from "react-hook-form";
import ContainerRegister from "../components/ContainerRegister";
import Title from "../components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaLogin from "../zod/SchemaLogin";
import IconEmail from "./../assets/Icon-email.png";
import IconPass from "./../assets/Icon-pass.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const contextLogin = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(SchemaLogin) });

  const onSubmit = (data: Login) => {
    contextLogin?.sendLogin(data);
  };
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <ContainerRegister>
        <Title title="Entrar"></Title>
        <form
          className="w-[80%] flex flex-col gap-5 my-11"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="w-full border-b-[1px] border-white/25 flex gap-2 items-center">
              <img
                className="w-4 h-[0.8rem]"
                src={IconEmail}
                alt="Ícone de email"
              ></img>
              <input
                className="text-sm w-full bg-transparent outline-none montserrat-normal"
                placeholder="Digite o email de acesso"
                {...register("email")}
                type="email"
              ></input>
            </label>
            {errors.email && (
              <span className="text-[10px]">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-8">
            <label className="w-full border-b-[1px] border-white/25 flex gap-2 items-center">
              <img
                className="w-[0.8rem] h-[0.8rem]"
                src={IconPass}
                alt="Ícone de senha"
              ></img>
              <input
                autoComplete="off"
                className="text-sm w-full bg-transparent outline-none montserrat-normal"
                placeholder="Digite sua senha"
                {...register("password")}
                type="text"
              ></input>
            </label>
            {errors.password && (
              <span className="text-[10px]">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <Button text="ENTRAR"></Button>
        </form>
        <span className="text-sm text-center">
          Você já possui um cadastro?
          <Link className="ml-2 underline" to={"/register"}>
            Cadastre-se aqui
          </Link>
        </span>
      </ContainerRegister>
    </main>
  );
};

export default Login;
