import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, ...authClient } =
  createAuthClient();

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      id: string;
      en: string;
    }
  >
>;

const errorCodes = {
  USER_ALREADY_EXISTS: {
    en: "user already registered",
    id: "user sudah terdaftar",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "en" | "id" = "id") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};
