import * as z from "zod";

export const validationMessages = {
  required: (field: string) => `${field} wajib diisi.`,
  email: (field: string) => `${field} harus berupa alamat email yang valid.`,
  min: (field: string, min: number) => `${field} minimal ${min} karakter.`,
  max: (field: string, max: number) => `${field} maksimal ${max} karakter.`,

  min_number: (field: string, min: number) =>
    `${field} harus setidaknya ${min}.`,
  max_number: (field: string, max: number) =>
    `${field} tidak boleh lebih besar dari ${max}.`,
  numeric: (field: string) => `${field} harus berupa angka.`,

  min_select: (field: string) => `Silahkan pilih salah satu data ${field}.`,

  min_upload: (field: string, min: number) => `${field} minimal ${min} file.`,
  max_upload: (field: string, max: number) => `${field} maksimal ${max} file.`,

  boolean: (field: string) => `${field} harus berupa Ya atau Tidak.`,
};

export const fileInfo = z.object({
  filename: z.string().nullable(),
  disk: z.string().nullable(),
  folder: z.string().nullable(),
  path: z.string().nullable(),
});

export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD");
