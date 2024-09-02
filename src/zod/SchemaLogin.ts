import { z } from "zod";

const SchemaLogin = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(4, "A senha deve conter pelo menos 4 caracteres"),
});

export default SchemaLogin;
