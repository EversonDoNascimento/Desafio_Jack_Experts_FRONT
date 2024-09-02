import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ContainerRegister from "../components/ContainerRegister";
import Title from "../components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaRegister from "../zod/SchemaRegister";
import IconEmail from "./../assets/Icon-email.png";
import IconPass from "./../assets/Icon-pass.png";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SchemaRegister) });

  const onSubmit = (data: any) => {};
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <ContainerRegister>
        <Title title="Cadastro"></Title>
        <form
          className="w-[80%] flex flex-col gap-4 my-11"
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
                placeholder="Digite um email para acessar"
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
          <div className="flex flex-col">
            <label className="w-full border-b-[1px] border-white/25 flex gap-2 items-center">
              <img
                className="w-4 h-[0.8rem]"
                src={IconEmail}
                alt="Ícone de email"
              ></img>
              <input
                className="text-sm w-full bg-transparent outline-none montserrat-normal"
                placeholder="Confirme o email"
                {...register("confirm_email")}
                type="email"
              ></input>
            </label>
            {errors.confirm_email && (
              <span className="text-[10px]">
                {errors.confirm_email.message as string}
              </span>
            )}
          </div>
          <div className="flex flex-col">
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
                placeholder="Confirme sua senha"
                {...register("confirm_password")}
                type="text"
              ></input>
            </label>
            {errors.confirm_password && (
              <span className="text-[10px]">
                {errors.confirm_password.message as string}
              </span>
            )}
          </div>
          <Button text="CADASTRAR"></Button>
        </form>
      </ContainerRegister>
    </main>
  );
};

export default Register;
