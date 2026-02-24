import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const result = await bcrypt.hash(password, 10);
  return result;
}
export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;
  const result = await bcrypt.compare(password, hash);

  return result;
}
