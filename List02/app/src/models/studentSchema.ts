import { z } from "zod";

export const studentSchema = z.object({
  nome: z.string().min(1, "Por favor digite o nome"),
  sexo: z.string().min(1, "Por favor selecione o sexo"),
  telefone: z.string().min(1, "Por favor digite o telefone"),
  bilingue: z.boolean(),
  matricula: z.string().min(1, "Por favor digite o matricula"),
  cursos: z.array(z.string()),
});

export type Student = z.infer<typeof studentSchema>;
