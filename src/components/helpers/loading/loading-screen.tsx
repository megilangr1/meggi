import { cn } from "@/lib/utils";
import { Nut } from "lucide-react";
import Image from "next/image";

const LoadingScreen = ({
  absolute = true,
  topIndex = false,
  logo = false,
  className,
}: {
  absolute?: boolean;
  topIndex?: boolean;
  logo?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-white",
        !!absolute && `absolute top-0 right-0`,
        !!topIndex && "z-10",
        className,
      )}
    >
      {!logo && <Nut className="animate-pulse" />}

      {logo && (
        <Image
          src="/images/logo.png"
          alt={process.env.NEXT_PUBLIC_APP_SHORT || "NextJS 16"}
          width={40}
          height={40}
          priority
          className="size-10 animate-pulse"
        />
      )}

      <h1 className="animate-bounce font-nunito">Memuat Halaman</h1>
    </div>
  );
};

export default LoadingScreen;
