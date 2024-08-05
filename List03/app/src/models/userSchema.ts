import { z } from "zod";

export const userSchema = z.object({
  id: z.number().readonly(),
  nome: z.string().min(1, "Nome não pode ser vazio"),
  idade: z.coerce
    .number({ invalid_type_error: "Por favor digite um número" })
    .min(1, "Por favor digite uma idade válida"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone não pode ser vazio"),
  endereco: z.string().min(1, "Endereço não pode ser vazio"),
  genero: z.string().min(1, "Por favor Selecione um gênero"),
  cidade: z.string().min(1, "Por favor Selecione uma cidade"),
  interesses: z.array(z.string()),
  alertas: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
