import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  LogOut,
  CheckCheck,
  FileText,
  Receipt,
  Calendar,
  CreditCard,
  AlertTriangle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  type AppNotification,
} from "@/hooks/use-notifications";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { GlobalSearch } from "@/components/GlobalSearch";

interface TopBarProps {
  onMobileMenuOpen: () => void;
}

function notifIcon(type: AppNotification["type"], metadata: Record<string, unknown>) {
  const entity = metadata?.entity as string | undefined;
  if (entity === "devis") return <FileText className="h-4 w-4" />;
  if (entity === "facture") return <Receipt className="h-4 w-4" />;
  if (entity === "mission") return <Calendar className="h-4 w-4" />;
  if (entity === "paiement") return <CreditCard className="h-4 w-4" />;
  if (type === "warning" || type === "error") return <AlertTriangle className="h-4 w-4" />;
  return <Info className="h-4 w-4" />;
}

function notifColorDot(type: AppNotification["type"]) {
  if (type === "success") return "bg-success";
  if (type === "warning") return "bg-warning";
  if (type === "error") return "bg-destructive";
  return "bg-info";
}

export function TopBar({ onMobileMenuOpen }: TopBarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("avatar_url, first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle();

      const { data: memberData } = await supabase
        .from("team_members")
        .select("team_id, teams(plan)")
        .eq("user_id", user.id)
        .maybeSingle();

      return {
        avatar_url: profileData?.avatar_url,
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        team: memberData?.teams ? { plan: (memberData.teams as any).plan as string } : null,
      };
    },
    enabled: !!user,
  });

  const { data: notifications = [] } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const unreadCount = notifications.filter((n) => !n.read_at).length;
  const unreadIds = notifications.filter((n) => !n.read_at).map((n) => n.id);
  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    user?.email?.split("@")[0] ||
    "Utilisateur";
  const iconButtonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card/90 text-muted-foreground shadow-sm transition-colors hover:border-primary/20 hover:bg-card hover:text-foreground";

  const handleNotifClick = (n: AppNotification) => {
    if (!n.read_at) markRead.mutate(n.id);
    const href = (n.metadata?.href as string) ?? "/notifications";
    navigate(href);
    setNotifOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/72 backdrop-blur-2xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 md:h-[72px] md:px-6 xl:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button onClick={onMobileMenuOpen} className={cn(iconButtonClass, "md:hidden")}>
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="group flex h-11 min-w-0 flex-1 items-center gap-3 rounded-full border border-border/80 bg-card/92 px-4 text-left text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/20 hover:text-foreground md:max-w-xl"
          >
            <Search className="h-4 w-4" />
            <span className="min-w-0 flex-1 truncate">
              Rechercher clients, missions, devis, factures...
            </span>
            <kbd className="hidden h-6 items-center gap-1 rounded-full border border-border bg-muted/80 px-2 text-[10px] font-medium text-muted-foreground md:inline-flex">
              ⌘K
            </kbd>
          </button>

          <div className="hidden xl:flex xl:flex-1">
            <div className="ml-4 rounded-full border border-border/80 bg-card/85 px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
              Command bar unifiée
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={iconButtonClass}
            title={theme === "light" ? "Mode sombre" : "Mode clair"}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Sun className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className={cn(iconButtonClass, "relative")}>
              <Bell className={cn("h-5 w-5 text-muted-foreground", unreadCount > 0 && "text-foreground")} />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in-50">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-[30px] border border-border/80 bg-card/98 shadow-card backdrop-blur-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-semibold">Notifications</p>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
                          {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={() => markAllRead.mutate(unreadIds)}
                          className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                          title="Tout marquer comme lu"
                        >
                          <CheckCheck className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setNotifOpen(false);
                          navigate("/notifications");
                        }}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Tout voir
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Bell className="mb-2 h-8 w-8 opacity-30" />
                        <p className="text-sm">Aucune notification</p>
                      </div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => handleNotifClick(n)}
                          className={cn(
                            "flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50 last:border-0",
                            !n.read_at && "bg-primary/5",
                          )}
                        >
                          <div
                            className={cn("mt-0.5 shrink-0 rounded-[14px] p-1.5", {
                              "bg-success/10 text-success": n.type === "success",
                              "bg-warning/10 text-warning": n.type === "warning",
                              "bg-destructive/10 text-destructive": n.type === "error",
                              "bg-info/10 text-info": n.type === "info",
                            })}
                          >
                            {notifIcon(n.type, n.metadata)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={cn("truncate font-medium", !n.read_at && "text-foreground")}>
                                {n.title}
                              </p>
                              {!n.read_at && (
                                <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", notifColorDot(n.type))} />
                              )}
                            </div>
                            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.message}</p>
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: fr })}
                            </p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={async () => {
              await signOut();
              navigate("/login");
            }}
            className={iconButtonClass}
            title="Déconnexion"
          >
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-border/80 bg-card/92 py-1 pl-2 pr-3 shadow-sm">
            <div className="hidden min-w-0 md:flex flex-col">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">{displayName}</p>
                {profile?.team?.plan && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      profile.team.plan === "enterprise" &&
                        "border border-accent-foreground/10 bg-accent text-accent-foreground",
                      profile.team.plan === "pro" && "border border-primary/20 bg-primary/10 text-primary",
                      profile.team.plan === "solo" && "border border-info/20 bg-info/10 text-info",
                      profile.team.plan === "free" && "bg-muted text-muted-foreground",
                    )}
                  >
                    {profile.team.plan}
                  </span>
                )}
              </div>
              <p className="max-w-[180px] truncate text-xs text-muted-foreground">{user?.email ?? ""}</p>
            </div>
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-8 w-8 rounded-full object-cover md:h-9 md:w-9"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-xs font-bold text-white md:h-9 md:w-9">
                {(user?.email?.[0] ?? "U").toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  );
}
