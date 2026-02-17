import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma/prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const roles = await prisma.userRole.findMany({
        where: { userId: user.id },
        include: { role: true },
      });

      return {
        user: {
          ...user,
          roles: roles.map((r) => r.role.name),
        },
        session,
      };
    }),

    nextCookies(),
  ],
  trustedOrigins: ["http://localhost:3000", "http://192.168.1.6:3000"],
});
