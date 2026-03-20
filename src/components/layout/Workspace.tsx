import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WorkspacePageProps {
  children: ReactNode;
  className?: string;
}

export function WorkspacePage({ children, className }: WorkspacePageProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-7xl space-y-6 pb-4", className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(138,124,255,0.1),transparent_34%)]" />
      {children}
    </div>
  );
}

interface WorkspaceBackLinkProps {
  to: string;
  label: string;
  className?: string;
}

export function WorkspaceBackLink({ to, label, className }: WorkspaceBackLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:border-primary/20 hover:bg-card hover:text-foreground",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}

interface WorkspaceHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function WorkspaceHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: WorkspaceHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[36px] border border-border/75 bg-card/92 shadow-card backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(87,73,244,0.14),transparent_48%)] lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between lg:p-9">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
              {eyebrow}
            </p>
          )}
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-semibold tracking-tight text-foreground sm:text-[2.2rem]">
              {title}
            </h1>
            {description && (
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2 pt-1">{actions}</div>}
        </div>
        {aside && <div className="min-w-0 lg:max-w-sm">{aside}</div>}
      </div>
    </section>
  );
}

interface WorkspaceKpiGridProps {
  children: ReactNode;
  className?: string;
}

export function WorkspaceKpiGrid({ children, className }: WorkspaceKpiGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {children}
    </div>
  );
}

interface WorkspaceKpiCardProps {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  icon?: LucideIcon;
  toneClassName?: string;
  className?: string;
}

export function WorkspaceKpiCard({
  label,
  value,
  detail,
  icon: Icon,
  toneClassName,
  className,
}: WorkspaceKpiCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/70 bg-card/92 shadow-card", className)}>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-display font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
        </div>
        {Icon && (
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-[18px] bg-primary/10 text-primary", toneClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface WorkspacePanelProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function WorkspacePanel({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: WorkspacePanelProps) {
  return (
    <Card className={cn("border-border/70 bg-card/92 shadow-card backdrop-blur-sm", className)}>
      <CardContent className={cn("p-5", contentClassName)}>
        {(title || description || action) && (
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              {title && <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
