import { z } from "zod";

export const itemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1,"Por favor digite um nome para o item"),
  quantity: z.coerce.number().min(1, "Digite uma quantidade válido"),
  price: z.coerce.number().min(0.01, "Digite um preço válido"),
  buyed: z.boolean().optional(),
})

export type Item = z.infer<typeof itemSchema>;

