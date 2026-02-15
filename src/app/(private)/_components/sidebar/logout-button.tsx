"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/core/auth/auth-client";
import { cn } from "@/lib/utils";
import { LogOut, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      className={cn("w-full items-center justify-start gap-x-4", className)}
      size={"sm"}
      onClick={async () => {
        setIsLoading(true);
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
        window.location.href = "/auth/login";
        setIsLoading(false);
      }}
    >
      {isLoading ? (
        <RotateCcw className="shrink-0 size-4 animate-spin" />
      ) : (
        <LogOut className="shrink-0 size-4" />
      )}
      Logout
    </Button>
  );
};

export default LogoutButton;
