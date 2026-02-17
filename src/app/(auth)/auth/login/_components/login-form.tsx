"use client";

import { doAlert } from "@/components/helpers/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/core/auth/auth-client";
import { AuthLoginForm, AuthLoginSchema } from "@/lib/validations/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const defaultValues: AuthLoginForm = {
  email: "admin@mail.com",
  password: "admin123",
};

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AuthLoginForm>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues,
  });

  async function onSubmit(values: AuthLoginForm) {
    try {
      setIsLoading(true);

      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        switch (error.code) {
          case "VALIDATION_ERROR":
            form.reset();
            doAlert(
              0,
              "Input tidak valid, Silahkan input ulang formulir untuk login !",
            );
            break;
          case "INVALID_EMAIL_OR_PASSWORD":
            form.setError("email", {
              message: "Email / Password Salah !",
            });
            break;
          default:
            doAlert(0, error.message);
            break;
        }
        return;
      }

      doAlert(2, "Login Berhasil !");
      router.push("/dashboard");
      return;
    } catch {
      doAlert(0, "Terjadi Kesalahan ! Silahkan Hubungi Administrator !");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Avatar className="size-36 sm:size-40 mx-auto border-2 border-slate-400 mb-2 md:mb-4">
            <AvatarImage src="/images/logo.png" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight font-quantico">
            {process.env.NEXT_PUBLIC_APP_SHORT || "NextJS 16"}
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm text-balance">
            Silahkan masukan <b>Email</b> dan <b>Password</b> untuk mengakses
            aplikasi
          </p>
          <hr className="w-full border-t-2 mt-4" />
        </div>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email : </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="m@example.com"
                autoComplete="off"
                disabled={isLoading}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password : </FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="*******"
                disabled={isLoading}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <RotateCcw className="shrink-0 size-4 animate-spin" />
            )}
            Login
          </Button>
        </Field>
        <Link href={"/"}>
          <FieldSeparator className="font-semibold">
            Kembali ke Halaman Utama
          </FieldSeparator>
        </Link>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
