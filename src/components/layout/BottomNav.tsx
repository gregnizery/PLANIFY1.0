import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, FileText, Package } from "lucide-react";
import { useUserRole, canAccess } from "@/hooks/use-user-role";

const allBottomNavItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard, section: "dashboard" },
  { title: "Clients", path: "/clients", icon: Users, section: "clients" },
  { title: "Missions", path: "/missions", icon: Calendar, section: "missions" },
  { title: "Calendrier", path: "/calendrier", icon: Calendar, section: "missions" },
  { title: "Finance", path: "/finance/devis", icon: FileText, section: "finance" },
  { title: "Matériel", path: "/materiel", icon: Package, section: "materiel" },
];

export function BottomNav() {
  const location = useLocation();
  const { data: roleData } = useUserRole();
  const role = roleData?.role;

  const bottomNavItems = allBottomNavItems.filter((item) => canAccess(role, item.section));

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 safe-area-bottom md:hidden">
      <div className="flex h-16 items-center justify-around rounded-[26px] border border-border/80 bg-card/95 px-1 shadow-card backdrop-blur-xl">
        {bottomNavItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/finance/devis" && location.pathname.startsWith("/finance"));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex min-w-[56px] flex-col items-center gap-1 rounded-[18px] px-2 py-1.5 transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
              <span className="text-[10px] font-medium leading-none">{item.title}</span>
              {isActive && (
                <div className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-b-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
