import * as z from "zod";
import { validationMessages } from "./validation-message";

export const basePenggunaSchema = z.object({
  name: z
    .string()
    .min(1, { error: validationMessages.min("Nama Pengguna", 1) }),
  email: z
    .email({ error: validationMessages.email("Email") })
    .min(1, { error: validationMessages.min("Email", 1) })
    .max(255, { error: validationMessages.max("Email", 255) }),

  roles: z
    .array(z.string())
    .min(1, { error: validationMessages.min_select("Hak Akses") }),
});

export const penggunaFormCreate = basePenggunaSchema
  .extend({
    password: z
      .string()
      .min(8, { error: validationMessages.min("Password", 8) }),
    password_confirmation: z
      .string()
      .min(1, { error: validationMessages.min("Konfirmasi Password", 1) }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password tidak cocok",
    path: ["password_confirmation"],
  });

export type PenggunaCreateForm = z.infer<typeof penggunaFormCreate>;

export const penggunaFormEdit = basePenggunaSchema
  .extend({
    password: z
      .union([
        z.string().min(8, { error: validationMessages.min("Password", 8) }),
        z.literal(""),
      ])
      .optional(),
    password_confirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.password && !data.password_confirmation) return;

    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Konfirmasi password tidak cocok",
        path: ["password_confirmation"],
      });
    }
  });
export type PenggunaEditForm = z.infer<typeof penggunaFormEdit>;

export const penggunaSchema = (edit: boolean) => {
  return edit ? penggunaFormEdit : penggunaFormCreate;
};
