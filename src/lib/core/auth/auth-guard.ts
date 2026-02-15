import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export class AuthGuard {
  static async pageGuard() {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session) return redirect("/");

    return session;
  }
}
