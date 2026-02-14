import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-200 h-200 bg-cyan-700 blur-3xl opacity-30 rounded-full animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-140 h-140 bg-neutral-500 blur-3xl opacity-50 rounded-full animate-pulse" />

        <Image
          src={"/images/logo-clear.png"}
          alt={process.env.NEXT_PUBLIC_APP_SHORT || "NextJS 16"}
          height={1000}
          width={1000}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xs opacity-30"
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Building scalable web systems with clean architecture.
        </h1>

        <p className="text-muted-foreground text-lg">
          Fullstack engineer focused on performance, maintainability, and
          production-ready solutions.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg">View Projects</Button>
          <Button size="lg" variant="outline">
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
}
