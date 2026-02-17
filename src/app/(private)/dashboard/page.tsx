import { AuthGuard } from "@/lib/core/auth/auth-guard";

export default async function Page() {
  await AuthGuard.pageGuard();

  return (
    <div className="flex flex-col gap-2">
      <p>Dashboard</p>
    </div>
  );
}
