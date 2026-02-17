import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Captions, Hash, Home, LucideIcon, PanelsTopLeft } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import UserRoleCheck from "@/components/helpers/auth/user-role-check";

export interface NavList {
  title: string;
  url: string;
  icon: LucideIcon;
  className?: string;
  items?: NavChild[];
}

export interface NavChild {
  title: string;
  url: string;
  className?: string;
}

const navMain: NavList[] = [
  {
    title: "Halaman Utama",
    url: "/dashboard",
    icon: Home,
  },
];

const navAdmin: NavList[] = [
  {
    title: "Data Master",
    url: "#",
    icon: Captions,
    items: [
      {
        title: "Akun Pengguna",
        url: "/master-data/pengguna",
      },
    ],
  },
];

const navOp: NavList[] = [
  {
    title: "Belum Ada",
    url: "#",
    icon: Hash,
  },
];

const navOther: NavList[] = [
  {
    title: "Landing Page",
    url: "/",
    icon: PanelsTopLeft,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-1.5">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-4"
              >
                <Avatar className="size-14 md:size-14 rounded-lg border">
                  <AvatarImage src="/images/logo.png" />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0 flex-auto">
                  <span className="text-lg font-semibold tracking-wider font-quantico">
                    {process.env.NEXT_PUBLIC_APP_SHORT || "NextJS 16"}
                  </span>
                  <div className="flex gap-1 text-[8px] font-semibold">
                    by
                    <span className="text-[10px] text-slate-400 underline underline-offset-4">
                      MeGilangR
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr className="w-full border-t-2" />
      <SidebarContent className="gap-0">
        <UserRoleCheck allowedRoles={[]}>
          <NavMain items={navMain} title="Navigasi Utama" />
        </UserRoleCheck>
        <UserRoleCheck allowedRoles={["ADMIN"]}>
          <NavMain items={navAdmin} title="Navigasi Admin" />
        </UserRoleCheck>
        <UserRoleCheck allowedRoles={["ADMIN", "OP"]}>
          <NavMain items={navOp} title="Navigasi Operator" />
        </UserRoleCheck>
        <UserRoleCheck allowedRoles={[]}>
          <NavMain items={navOther} title="Navigasi Lainnya" />
        </UserRoleCheck>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
