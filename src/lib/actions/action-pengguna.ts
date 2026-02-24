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

type FormInput = {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  roles: string[];
};

type CreatePenggunaProps = {
  data: FormInput;
};

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

    const create = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });

    await prisma.userRole.createMany({
      data: roleConnect.map((r) => ({
        roleId: r.roleId,
        userId: create.user.id,
      })),
    });

    revalidatePath("/master-data/pengguna");
    return res(create.user, "USER201");
  } catch (error: unknown) {
    if (isBetterAuthError(error))
      if (error.statusCode === 422)
        return badReq([cIssue("email", "Email sudah digunakan!")]);

    console.log(JSON.stringify(error));

    return err(error);
  }
}

type UpdatePenggunaProps = {
  id: string;
  data: FormInput;
};

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
    const update = await prisma.user.update({
      where: { id },
      data: {
        email: email,
        name: name,
      },
    });

    if (password) {
      const hashedPassword = await hashPassword(password);

      await prisma.account.update({
        where: {
          id: editData.accounts[0].id,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    await prisma.userRole.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.userRole.createMany({
      data: roleConnect.map((r) => ({
        roleId: r.roleId,
        userId: id,
      })),
    });

    revalidatePath("/master-data/pengguna");
    return res(update, "USER203");
  } catch (error: unknown) {
    if (isBetterAuthError(error))
      if (error.statusCode === 422)
        return badReq([cIssue("email", "Email sudah digunakan!")]);

    console.log(JSON.stringify(error));

    return err(error);
  }
}

type DeletePenggunaProps = {
  id: string;
};

export async function DeletePengguna({ id }: DeletePenggunaProps) {
  try {
    const data = await prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });
    if (!data) return err(new Error("Tidak dapat menghapus pengguna !"));

    await prisma.user.delete({
      where: {
        id,
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.account.deleteMany({
      where: {
        userId: id,
      },
    });

    revalidatePath("/master-data/pengguna");
    return res(null, "USER204");
  } catch (error) {
    return err(error);
  }
}
