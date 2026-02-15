import * as z from "zod";

export const AuthLoginSchema = z.object({
  email: z
    .email({ message: "Email tidak valid !" })
    .min(1, { message: "Email tidak boleh kosong !" })
    .max(255, { message: "Email tidak valid !" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong !" }),
});
export type AuthLoginForm = z.infer<typeof AuthLoginSchema>;
