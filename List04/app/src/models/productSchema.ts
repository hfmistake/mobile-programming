import { z } from "zod";

export const productSchema = z.object({
  id: z.number().positive().optional().readonly(),
  name: z.string().min(1, "Digite o nome do produto"),
  price: z.coerce.number().min(0.01, "Digite um preço válido"),
  description: z.string().min(1, "Digite a descrição do produto"),
});

export type Product = z.infer<typeof productSchema>;
