import { Prisma } from "@/generated/prisma/client";
import { db } from "../seeder";

const roles: Prisma.RoleCreateInput[] = [
  {
    name: "MEGGI",
    label: "MeGGi",
  },
  {
    name: "ADMIN",
    label: "Administrator",
  },
  {
    name: "OP",
    label: "Operator",
  },
];

export async function seedRole() {
  for (const role of roles) {
    await db.role.upsert({
      where: { name: role.name },
      create: role,
      update: {},
    });
  }

  console.log("ROLES SEEDER COMPLETE !");
}
