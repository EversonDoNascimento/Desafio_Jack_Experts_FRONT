import { z } from "zod";

const SchemaTaskRegister = z.object({
  title: z.string().min(2, "Digite um título").trim(),
  description: z.string().min(2, "Digite uma descrição").trim(),
});

export default SchemaTaskRegister;
