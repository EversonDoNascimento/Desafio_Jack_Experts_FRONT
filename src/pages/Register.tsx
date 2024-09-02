import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ContainerRegister from "../components/ContainerRegister";
import Title from "../components/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import SchemaRegister from "../zod/SchemaRegister";
import IconEmail from "./../assets/Icon-email.png";
import IconPass from "./../assets/Icon-pass.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../Api/register";
import Loading from "../components/Loading";
import StatusWindow from "../components/StatusWindow";
// Defindo a interface de tipos para o registro de usuários
interface Register {
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const navigate = useNavigate();
  // Definindo a estrutura do hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({ resolver: zodResolver(SchemaRegister) });
  // Definindo o state que irá controlar as mensagens de erros e sucesso
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  // State responsável por controlar o loading da página quando alguma requisição para API for realizada
  const [loading, setLoading] = useState(false);
  // A função handleRegisterUser vai chamar a função que realiza a requisição na API e fornecer os dados preenchidos no formulário
  const handleRegisterUser = async (infoUser: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    // Tentando registrar o usuário através da requisição feita pela função registerUser
    const { data, status } = await registerUser(infoUser);
    console.log(status);
    // Verificando se o usuário foi registrado com sucesso
    if (status === 200) {
      // Criando o token no localstorage com o token recebido da requisição
      localStorage.setItem("token", data.token);
      setMessageSuccess({ show: true, message: "Conta criada com sucesso!" });
      setTimeout(() => setMessageSuccess({ show: false, message: "" }), 3000);
      setTimeout(() => navigate("/"), 3000);
    } else {
      setMessageError({ show: true, message: data.error });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };

  const onSubmit = (data: Register) => {
    handleRegisterUser({ email: data.email, password: data.password });
  };
  return (
    <main className="w-full h-screen flex justify-center items-center">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageSuccess.show ? (
            <StatusWindow
              text={messageSuccess.message}
              error={false}
            ></StatusWindow>
          ) : null}
          {messageError.show ? (
            <StatusWindow
              text={messageError.message}
              error={true}
            ></StatusWindow>
          ) : null}
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
            <span className="text-sm">
              Você já possui um cadastro?
              <Link className="ml-2 underline" to={"/login"}>
                Faça login aqui
              </Link>
            </span>
          </ContainerRegister>
        </>
      )}
    </main>
  );
};

export default Register;
