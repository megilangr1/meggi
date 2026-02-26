import { auth } from "@/lib/core/auth/auth";
import { db } from "../seeder";

type SeedUser = {
  email: string;
  name: string;
  password: string;
  roles: string[]; // role.name
};

const users: SeedUser[] = [
  {
    email: "meggi@mail.com",
    name: "MeGGi",
    password: "admin123",
    roles: ["MEGGI"],
  },
  {
    email: "admin@mail.com",
    name: "Administrator",
    password: "admin123",
    roles: ["ADMIN"],
  },
  {
    email: "op@mail.com",
    name: "Operator",
    password: "test1234",
    roles: ["OP"],
  },
];

export async function seedUser() {
  for (const user of users) {
    const roles = await db.role.findMany({
      where: {
        name: { in: user.roles },
      },
    });

    if (roles.length !== user.roles.length) {
      throw new Error(`Terdapat Roles User Yang Tidak Ada !`);
    }

    let userId;

    const check = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!check) {
      const created = await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

      userId = created.user.id;
    } else {
      userId = check.id;
    }

    await db.userRole.deleteMany({
      where: { userId: userId },
    });

    await db.userRole.createMany({
      data: roles.map((r) => ({
        roleId: r.id,
        userId: userId,
      })),
    });
  }

  for (let index = 0; index < 200; index++) {
    const dummy = {
      name: `Dummy - ${index}`,
      email: `dummy${index}@mail.com`,
      password: `test1234`,
    };

    const check = await db.user.findUnique({
      where: { email: dummy.email },
    });

    if (!check) {
      await auth.api.signUpEmail({
        body: {
          name: dummy.name,
          email: dummy.email,
          password: dummy.password,
        },
      });
    }
  }

  console.log("USER SEEDER COMPLETE !");
}
