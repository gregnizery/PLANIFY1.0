import { ReactNode, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="forced-light flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onMobileMenuOpen={() => setMobileMenuOpen(true)} />
        <main className="animate-fade-in relative flex-1 overflow-x-hidden px-4 pb-20 pt-4 md:px-6 md:pb-8 md:pt-6 xl:px-8 xl:pt-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.08),transparent_30rem),radial-gradient(circle_at_top_right,rgba(138,124,255,0.08),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0),rgba(244,245,252,0.65))]" />
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
