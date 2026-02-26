"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../core/auth/auth";
import prisma from "../core/prisma/prisma";
import {
  badReq,
  cIssue,
  err,
  isBetterAuthError,
  res,
} from "../helpers/action-response";
import {
  penggunaFormCreate,
  penggunaFormEdit,
} from "../validations/pengguna-schema";
import { hashPassword } from "../core/auth/password";
import { Prisma } from "@/generated/prisma/client";

interface FormInput {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  roles: string[];
}

interface CreatePenggunaProps {
  data: FormInput;
}

export async function CreatePengguna({ data }: CreatePenggunaProps) {
  try {
    const parsed = penggunaFormCreate.safeParse(data);
    if (!parsed.success) return badReq(parsed.error.issues);

    const { name, email, password, roles } = parsed.data;

    let roleConnect: { roleId: number }[] = [];

    const checkRoles = await prisma.role.findMany({
      where: {
        name: {
          in: roles,
        },
      },
    });
    if (checkRoles.length !== roles.length)
      return badReq([cIssue("roles", "Salah satu role tidak valid")]);

    roleConnect = checkRoles.map((v) => ({
      roleId: v.id,
    }));

    const created = await prisma.$transaction(async (tx) => {
      const create = await auth.api.signUpEmail({
        body: {
          email,
          name,
          password,
        },
      });

      await tx.userRole.createMany({
        data: roleConnect.map((r) => ({
          roleId: r.roleId,
          userId: create.user.id,
        })),
      });

      return create;
    });

    revalidatePath("/master-data/pengguna");
    return res(created.user, "USER201");
  } catch (error: unknown) {
    if (isBetterAuthError(error))
      if (error.statusCode === 422)
        return badReq([cIssue("email", "Email sudah digunakan!")]);

    return err(error);
  }
}

interface UpdatePenggunaProps {
  id: string;
  data: FormInput;
}

export async function UpdatePengguna({ id, data }: UpdatePenggunaProps) {
  try {
    const parsed = penggunaFormEdit.safeParse(data);
    if (!parsed.success) return badReq(parsed.error.issues);

    const { name, email, password, roles } = parsed.data;

    const editData = await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
    if (!editData) return err(new Error("Tidak dapat mengubah pengguna !"));

    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
        id: {
          not: id,
        },
      },
    });
    if (checkEmail) return badReq([cIssue("email", "Email sudah digunakan !")]);

    let roleConnect: { roleId: number }[] = [];

    const checkRoles = await prisma.role.findMany({
      where: {
        name: {
          in: roles,
        },
      },
    });
    if (checkRoles.length !== roles.length)
      return badReq([cIssue("roles", "Salah satu role tidak valid")]);

    roleConnect = checkRoles.map((v) => ({
      roleId: v.id,
    }));

    // Update

    const updated = await prisma.$transaction(async (tx) => {
      const update = await tx.user.update({
        where: { id },
        data: {
          email: email,
          name: name,
        },
      });

      if (password) {
        const hashedPassword = await hashPassword(password);

        await tx.account.updateMany({
          where: {
            id: {
              in: editData.accounts.map((ac) => ac.id),
            },
          },
          data: {
            password: hashedPassword,
          },
        });
      }

      await tx.userRole.deleteMany({
        where: {
          userId: id,
        },
      });

      await tx.userRole.createMany({
        data: roleConnect.map((r) => ({
          roleId: r.roleId,
          userId: id,
        })),
      });

      return update;
    });

    revalidatePath("/master-data/pengguna");
    return res(updated, "USER203");
  } catch (error: unknown) {
    if (isBetterAuthError(error))
      if (error.statusCode === 422)
        return badReq([cIssue("email", "Email sudah digunakan!")]);

    return err(error);
  }
}

interface DeletePenggunaProps {
  id: string;
}

export async function DeletePengguna({ id }: DeletePenggunaProps) {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
    if (!data) return err(new Error("Tidak dapat menghapus pengguna !"));

    await prisma.$transaction(async (tx) => {
      // Delete User
      await tx.user.delete({
        where: {
          id,
        },
      });
    });

    revalidatePath("/master-data/pengguna");
    return res(null, "USER204");
  } catch (error) {
    return err(error);
  }
}

// Index
interface IndexPenggunaProps {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: "asc" | "desc";
}

export async function IndexPengguna({
  page,
  limit,
  search,
  sortBy,
  sortType,
}: IndexPenggunaProps) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {
    AND: {
      userRoles: {
        none: {
          role: {
            name: "MEGGI",
          },
        },
      },
    },
  };

  if (search) {
    where.OR = [
      {
        name: { contains: search },
        email: { contains: search },
      },
    ];
  }

  const [users, total] = await Promise.all([
    await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortType,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    }),
    await prisma.user.count({ where }),
  ]);

  return { users, total, skip, limit, page };
}
