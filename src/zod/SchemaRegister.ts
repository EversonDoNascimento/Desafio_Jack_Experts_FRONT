import { z } from "zod";

const SchemaRegister = z
  .object({
    email: z.string().email("Email inválido!"),
    confirm_email: z.string().email("Email inválido!"),
    password: z.string().min(4, "Senha deve conter pelo menos 4 caracteres"),
    confirm_password: z
      .string()
      .min(4, "Senha deve conter pelo menos 4 caracteres"),
  })
  .refine((data) => data.email === data.confirm_email, {
    message: "Emails não correspondem!",
    path: ["confirm_email"],
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não correspondem!",
    path: ["confirm_password"],
  });

export default SchemaRegister;
