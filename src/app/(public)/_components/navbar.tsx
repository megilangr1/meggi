"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg">
          <Avatar className="size-12 rounded-none">
            <AvatarImage
              src={"/images/meggi-clear.png"}
              className="scale-125"
            />
            <AvatarFallback>
              {process.env.NEXT_PUBLIC_APP_SHORT || "NextJS 16"}
            </AvatarFallback>
          </Avatar>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet
            open={openSheet}
            onOpenChange={(v) => {
              setOpenSheet(v);
            }}
          >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">menu</SheetTitle>

              <div className="mt-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setOpenSheet(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
