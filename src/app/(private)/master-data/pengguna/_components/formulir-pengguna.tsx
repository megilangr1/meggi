"use client";

import { doAlert } from "@/components/helpers/alert";
import ReqMark from "@/components/helpers/forms/req-mark";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Role } from "@/generated/prisma/client";
import { CreatePengguna, UpdatePengguna } from "@/lib/actions/action-pengguna";
import { UserWithRoles } from "@/lib/types/user-type";
import { penggunaSchema } from "@/lib/validations/pengguna-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Edit, PenLine, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, Path, useForm } from "react-hook-form";
import * as z from "zod";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  roles: [],
};

type FormulirPenggunaProps = {
  dataRoles: Role[];
  id?: string;
  editData?: UserWithRoles;
};

const FormulirPengguna = ({
  dataRoles,
  id,
  editData,
}: FormulirPenggunaProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const schema = penggunaSchema(!!id);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: editData
      ? {
          name: editData.name,
          email: editData.email,
          password: "",
          password_confirmation: "",
          roles: editData.userRoles.map((r) => r.role.name),
        }
      : defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);

      const action = id
        ? await UpdatePengguna({ id, data })
        : await CreatePengguna({
            data,
          });

      if (!action.success) {
        if (action.error) {
          action.error.map((inputErr) =>
            form.setError(inputErr.field as Path<z.infer<typeof schema>>, {
              message: inputErr.message,
            }),
          );
          return;
        } else {
          doAlert(0, action.message);
          return;
        }
      }

      doAlert(1, action.message);
      router.push("/master-data/pengguna");
      return;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Card className="p-0 gap-0">
        <CardHeader className="py-3 px-4 gap-0 border-b-2">
          <div className="flex items-center justify-start gap-5">
            <Edit className="shrink-0 size-6" />
            <div className="flex flex-col gap-2">
              <CardTitle>Formulir Tambah Data</CardTitle>
              <CardDescription className="text-xs">
                Silahkan Lengkapi Formulir Untuk Menambah Data Pengguna
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <form
            id="formulir-pengguna"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 px-4 py-3"
          >
            <FieldSet>
              <FieldGroup className="grid grid-cols-6 gap-4 ">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-6 md:col-span-6 lg:col-span-6 flex flex-col items-start justify-start"
                    >
                      <FieldLabel htmlFor="name">
                        Nama Pengguna :
                        <ReqMark />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukan Nama Pengguna..."
                        autoComplete="off"
                        disabled={isLoading}
                        // required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-6 md:col-span-6 lg:col-span-6 flex flex-col items-start justify-start"
                    >
                      <FieldLabel htmlFor="email">
                        Email Pengguna : <ReqMark />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukan Email Pengguna..."
                        autoComplete="off"
                        disabled={isLoading}
                        // required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-6 md:col-span-3 lg:col-span-3"
                    >
                      <FieldLabel htmlFor="password">
                        Password : <ReqMark />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukan Password..."
                        autoComplete="off"
                        disabled={isLoading}
                        required={!id}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password_confirmation"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-6 md:col-span-3 lg:col-span-3"
                    >
                      <FieldLabel htmlFor="password_confirmation">
                        Konfirmasi Password : <ReqMark />
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        id="password_confirmation"
                        aria-invalid={fieldState.invalid}
                        placeholder="Masukan Ulang Password..."
                        autoComplete="off"
                        disabled={isLoading}
                        required={!id}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="roles"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldSet
                      data-invalid={fieldState.invalid}
                      className="col-span-6"
                    >
                      <FieldLegend variant="label" className="flex gap-2">
                        Hak Akses :
                        <ReqMark />
                      </FieldLegend>
                      <FieldGroup
                        data-slot="checkbox-group"
                        className="grid grid-cols-3"
                      >
                        {dataRoles.map((role) => (
                          <Field
                            key={role.id}
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                            className="col-span-3 md:col-span-1 border px-3 py-2 rounded"
                          >
                            <Checkbox
                              id={`role-${role.id}`}
                              name={field.name}
                              aria-invalid={fieldState.invalid}
                              checked={field.value!.includes(role.name)}
                              onCheckedChange={(checked) => {
                                const newValue = checked
                                  ? [...field.value!, role.name]
                                  : field.value!.filter(
                                      (value) => value !== role.name,
                                    );
                                field.onChange(newValue);
                              }}
                            />
                            <FieldLabel
                              htmlFor={`role-${role.id}`}
                              className="font-normal"
                            >
                              {role.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </FieldGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldSet>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <hr className="w-full border-t-2 my-0.5" />

            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <Button
                  type="submit"
                  className="w-full bg-emerald-500"
                  disabled={isLoading}
                >
                  {!!id ? (
                    <PenLine className="shrink-0 size-4" />
                  ) : (
                    <Check className="shrink-0 size-4" />
                  )}
                  {!!id ? "Ubah Data" : "Buat Data"}
                </Button>
              </div>

              <div className="col-span-6 md:col-span-3 lg:col-span-2">
                <Button
                  type="button"
                  className="w-full"
                  variant={"destructive"}
                  disabled={isLoading}
                  onClick={() => {
                    form.reset();
                  }}
                >
                  <Undo className="shrink-0 size-4" />
                  Reset Input
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="py-2 px-4 border-t-2 text-xs rounded-b-md flex items-center">
          Formulir Tambah Data
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormulirPengguna;
