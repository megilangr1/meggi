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
    const check = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!check) {
      await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });
    }
  }

  console.log("USER SEEDER COMPLETE !");
}
