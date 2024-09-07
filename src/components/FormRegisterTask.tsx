import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SchemaTaskRegister from "../zod/SchemaTaskRegister";
import { z } from "zod";
import renderColors from "../CONSTANTS/Colors";
import { useEffect } from "react";

type Props = {
  sendData: (data: z.infer<typeof SchemaTaskRegister>) => void;
  data?: { title: string; description: string };
  close: () => void;
};

const FormRegisterTask = ({ close, sendData, data }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof SchemaTaskRegister>>({
    resolver: zodResolver(SchemaTaskRegister),
  });

  const onSubmit = (data: z.infer<typeof SchemaTaskRegister>) => {
    sendData(data);
  };

  useEffect(() => {
    if (data && data.title.trim() !== "" && data.description.trim() !== "") {
      setValue("title", data?.title);
      setValue("description", data?.description);
    }
  }, [data, setValue]);

  return (
    <>
      <div className="itensHeaderAnimation">
        <form
          style={{
            backgroundColor: renderColors("task-card"),
            padding: `${data ? "0" : "0.5rem"}`,
            margin: `${data ? " 0px" : "0px 2px"}`,
          }}
          className="flex flex-col gap-2   rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1 ">
            <input
              className="rounded-md text-sm px-2"
              {...register("title")}
              type="text"
              placeholder="Digite o título da tarefa"
            />
            {errors.title && (
              <span className="text-black text-[12px]">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <textarea
              className="rounded-md text-sm px-2 max-h-12"
              {...register("description")}
              placeholder="Digite a descrição da tarefa"
            ></textarea>
            {errors.description && (
              <span className="text-black text-[12px]">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex gap-2 justify-center mt-2">
            {data ? (
              <>
                <button className="bg-blue-700 text-white rounded-md py-1  w-full hover:scale-105 transition-all ease-linear duration-200">
                  SALVAR EDIÇÃO
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-red-700 text-white rounded-lg py-1 px-2 text-[12px] hover:scale-105 transition-all ease-linear duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    close();
                  }}
                >
                  CANCELAR
                </button>
                <button className="bg-green-700 text-white rounded-lg py-1 px-2 text-[12px] hover:scale-105 transition-all ease-linear duration-200">
                  ADICIONAR
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormRegisterTask;
