import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import { BetterAuthOptions } from "better-auth";
import { customSession } from "better-auth/plugins";

const options = {
  //...config options

  plugins: [
    inferAdditionalFields<typeof auth>(),
    customSessionClient<typeof auth>(),
  ],
} satisfies BetterAuthOptions;

export const { signIn, signUp, signOut, useSession, ...authClient } =
  createAuthClient({
    ...options,
    plugins: [
      ...(options.plugins ?? []),
      customSession(async ({ user, session }) => {
        // now both user and session will infer the fields added by plugins and your custom fields
        return {
          user,
          session,
        };
      }, options), // pass options here
    ],
  });

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
