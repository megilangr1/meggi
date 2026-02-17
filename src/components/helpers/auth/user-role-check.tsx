"use client";

import { useSession } from "@/lib/core/auth/auth-client";
import { Nut } from "lucide-react";

const UserRoleCheck = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  const { data, isPending } = useSession();

  if (isPending || !data?.user) return <Nut className="animate-bounce" />;

  if (
    allowedRoles.length < 1 ||
    data.user.roles.includes("MEGGI") ||
    data.user.roles.some((role) => allowedRoles.includes(role))
  )
    return <>{children}</>;

  return null;
};

export default UserRoleCheck;
