import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(5, "Senha deve ter pelo menos 5 caracteres"),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export const registerSchema = userSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
export type User = z.infer<typeof userSchema>;
