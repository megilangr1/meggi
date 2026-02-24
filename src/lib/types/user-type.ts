import { Prisma } from "@/generated/prisma/client";

export const userWithRolesArgs = {
  include: {
    userRoles: {
      include: {
        role: true,
      },
    },
  },
} satisfies Prisma.UserDefaultArgs;

export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRolesArgs>;
