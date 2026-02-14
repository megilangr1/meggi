import { AppWindowMac, Instagram, X, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto max-w-5xl px-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
        <div className="w-full flex-auto">
          © {new Date().getFullYear()} -{" "}
          {process.env.NEXT_PUBLIC_APP_NAME || "NextJS 16"}
        </div>

        <div className="w-full sm:w-auto flex items-center justify-end gap-2 text-slate-500">
          <Instagram className="size-4" />
          <Youtube className="size-4" />
          <X className="size-4" />
          <Link href={"/login"}>
            <AppWindowMac className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
