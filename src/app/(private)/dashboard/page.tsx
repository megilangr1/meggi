import { AuthGuard } from "@/lib/core/auth/auth-guard";

export default async function Page() {
  const { user, session } = await AuthGuard.pageGuard();

  return (
    <div className="flex flex-col gap-2">
      <p>Dashboard</p>
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
