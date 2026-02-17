import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak di-Temukan",
  description: "404 - Halaman Tidak di-Temukan.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[80vh]">
      <p className="text-4xl">404</p>
      <h2 className="text-xs">Halaman Tidak di-Temukan !</h2>
      <Link href="/dashboard">
        <Button size={"sm"} className="text-xs">
          Kembali ke-Halaman Utama
        </Button>
      </Link>
    </div>
  );
}
