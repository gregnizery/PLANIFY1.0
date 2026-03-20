import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  Receipt,
  CreditCard,
  X,
  MapPin,
  ShieldAlert,
  QrCode,
} from "lucide-react";
import { useUserRole, canAccess } from "@/hooks/use-user-role";
import { useCurrentProvider } from "@/hooks/use-data";

const navGroups = [
  {
    label: "Pilotage",
    section: null,
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard, section: "dashboard" },
      { title: "Calendrier", path: "/calendrier", icon: Calendar, section: "missions" },
    ],
  },
  {
    label: "Relation",
    section: null,
    items: [
      { title: "Clients", path: "/clients", icon: Users, section: "clients" },
      { title: "Prestataires", path: "/prestataires", icon: Users, section: "parametres" },
    ],
  },
  {
    label: "Opérations",
    section: null,
    items: [
      { title: "Missions", path: "/missions", icon: Calendar, section: "missions" },
    ],
  },
  {
    label: "Finance",
    section: "finance",
    items: [
      { title: "Devis", path: "/finance/devis", icon: FileText, section: "finance" },
      { title: "Factures", path: "/finance/factures", icon: Receipt, section: "finance" },
      { title: "Paiements", path: "/finance/paiements", icon: CreditCard, section: "finance" },
    ],
  },
  {
    label: "Parc",
    section: null,
    items: [
      { title: "Matériel", path: "/materiel", icon: Package, section: "materiel" },
      { title: "Scanner QR", path: "/materiel/scan", icon: QrCode, section: "materiel" },
      { title: "Lieux de stockage", path: "/materiel/stockage", icon: MapPin, section: "materiel" },
      { title: "Réseau B2B", path: "/suppliers", icon: Users, section: "materiel" },
    ],
  },
  {
    label: "Administration",
    section: "parametres",
    items: [
      { title: "Paramètres", path: "/parametres", icon: Settings, section: "parametres" },
      { title: "SuperAdmin", path: "/superadmin", icon: ShieldAlert, section: "superadmin" },
    ],
  },
];

const roleLabels: Record<string, string> = {
  admin: "Admin",
  manager: "Manager",
  technicien: "Technicien",
  prestataire: "Prestataire",
};

interface AppSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AppSidebar({ mobileOpen, onMobileClose }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { data: roleData } = useUserRole();
  const { data: currentProvider } = useCurrentProvider();
  const role = roleData?.role;
  const roleLabel = role ? roleLabels[role] ?? role : "Workspace";
  const contextLabel = currentProvider?.name || (role === "prestataire" ? "Profil prestataire" : "Organisation active");

  const filteredGroups = navGroups
    .map((group) => {
      let items = group.items.filter((item) => canAccess(role, item.section));

      if (group.label === "Relation" && role === "prestataire" && currentProvider) {
        items = [
          ...items,
          { title: "Mon Profil", path: `/prestataires/${currentProvider.id}`, icon: Users, section: null },
        ];
      }

      return { ...group, items };
    })
    .filter((group) => group.items.length > 0);

  const isItemActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(`${path}/`) ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  const navContent = (onNavClick?: () => void) => (
    <>
      <div className="flex h-20 items-center border-b border-sidebar-border/80 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] gradient-primary text-lg font-bold text-white shadow-glow">
            P
          </div>
          {!collapsed && (
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sidebar-foreground/55">
                Halo workspace
              </p>
              <span className="font-display text-xl font-semibold tracking-tight text-sidebar-accent-foreground">
                Planify
              </span>
            </div>
          )}
        </div>
        {onNavClick && (
          <button
            onClick={onNavClick}
            className="ml-auto rounded-full border border-sidebar-border bg-sidebar-accent p-2 text-sidebar-foreground/70 transition-colors hover:text-sidebar-accent-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {filteredGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sidebar-foreground/45">
                {group.label}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = isItemActive(item.path);
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onNavClick}
                      className={cn(
                        "flex items-center gap-3 rounded-[20px] px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "border border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                          : "border border-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-primary")} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-3">
        <div
          className={cn(
            "rounded-[24px] border border-sidebar-border bg-sidebar-primary/70 p-3 shadow-sm",
            collapsed && "flex justify-center px-2",
          )}
        >
          {collapsed ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {roleLabel.slice(0, 1)}
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/55">
                {roleLabel}
              </p>
              <p className="text-sm font-medium text-sidebar-accent-foreground">{contextLabel}</p>
              <p className="text-xs text-sidebar-foreground">
                Recherche, alertes et actions rapides restent accessibles partout.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar/90 text-sidebar-foreground shadow-[12px_0_30px_-28px_rgba(21,19,50,0.2)] backdrop-blur-2xl transition-all duration-300 md:flex",
          collapsed ? "w-[78px]" : "w-[272px]",
        )}
      >
        {navContent()}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-3 flex h-11 items-center justify-center rounded-full border border-sidebar-border bg-sidebar-accent text-sidebar-foreground/70 transition-colors hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in bg-slate-950/35 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[288px] flex-col border-r border-sidebar-border bg-sidebar/95 text-sidebar-foreground shadow-xl transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {navContent(onMobileClose)}
      </aside>
    </>
  );
}
