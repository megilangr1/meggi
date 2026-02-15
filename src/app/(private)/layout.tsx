import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import NavHeader from "./_components/nav-header";
import AuthClientGuard from "./_components/auth/auth-client-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthClientGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <NavHeader />

          <main className="flex flex-1 flex-col gap-2 px-4 py-3">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthClientGuard>
  );
}
