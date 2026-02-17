import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "./auth";

export class AuthGuard {
  static async pageGuard(allowedRoles: string[] = []) {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session) return redirect("/");

    if (
      allowedRoles.length < 1 ||
      session.user.roles.includes("MEGGI") ||
      session.user.roles.some((role) => allowedRoles.includes(role))
    ) {
      return session;
    }

    return notFound();
  }
}
