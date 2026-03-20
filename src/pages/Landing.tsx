import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Calendar,
  FileText,
  Package,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";

const features = [
  { icon: Calendar, title: "Planning intelligent", desc: "Planifiez vos missions, évitez les conflits et optimisez vos équipes." },
  { icon: FileText, title: "Devis & factures", desc: "Créez des documents professionnels, envoyez-les et suivez leur cycle de vie." },
  { icon: BarChart3, title: "Suivi financier", desc: "Pilotez le cash, les retards et les signatures depuis un command center unique." },
  { icon: Package, title: "Gestion matériel", desc: "Inventaire, disponibilités, scan QR et suivi détaillé de chaque équipement." },
  { icon: Shield, title: "Sécurité & rôles", desc: "Permissions granulaires, journalisation et gouvernance intégrée." },
  { icon: Zap, title: "Automatisations", desc: "Notifications, relances et raccourcis réduisent les frictions du quotidien." },
];

const productSignals = [
  { icon: Search, label: "Recherche globale", text: "Retrouvez clients, missions et factures instantanément." },
  { icon: Bell, label: "Alertes unifiées", text: "Suivez les urgences finance et terrain au même endroit." },
  { icon: Sparkles, label: "Interface Halo", text: "Surfaces claires, densité utile, hiérarchie d’actions nette." },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.1),transparent_24rem),radial-gradient(circle_at_top_right,rgba(138,124,255,0.1),transparent_24rem)]" />

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/78 backdrop-blur-2xl">
        <div className="container mx-auto flex h-18 items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] gradient-primary text-lg font-bold text-white shadow-glow">
              P
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Planify</p>
              <p className="font-display text-lg font-semibold tracking-tight">Halo Workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>Connexion</Button>
            <Button onClick={() => navigate("/register")}>Commencer</Button>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="container mx-auto px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Nouveau langage visuel Halo
              </div>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-display font-semibold leading-[1.02] tracking-tight md:text-7xl">
                  Pilotez vos prestations depuis un vrai centre de contrôle.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  Planify centralise la relation client, les missions, le parc matériel et la finance dans
                  une interface claire, dense et opérable.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2" onClick={() => navigate("/register")}>
                  Démarrer gratuitement <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Ouvrir l’application
                </Button>
              </div>
            </div>

            <div className="rounded-[36px] border border-border/80 bg-card/92 p-6 shadow-card backdrop-blur-xl md:p-8">
              <div className="rounded-[28px] border border-border/80 bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.16),transparent_18rem),linear-gradient(180deg,#ffffff_0%,#f7f7fb_100%)] p-6">
                <div className="flex items-center justify-between rounded-full border border-border/80 bg-card/90 px-4 py-3 shadow-sm">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Command bar</p>
                    <p className="text-sm font-medium">Recherche, alertes et profil au même endroit</p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Ctrl/⌘ K</div>
                </div>
                <div className="mt-4 grid gap-3">
                  {productSignals.map((signal) => (
                    <div key={signal.label} className="rounded-[22px] border border-border/80 bg-card/90 p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-primary/10 text-primary">
                          <signal.icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{signal.label}</p>
                          <p className="text-sm text-muted-foreground">{signal.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-display font-semibold">Tout le cycle métier, sans dispersion</h2>
            <p className="mt-2 text-muted-foreground">
              Une suite cohérente pour les équipes opérationnelles, commerciales et administratives.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[28px] border border-border/80 bg-card/92 p-6 shadow-card transition-all hover:-translate-y-px hover:shadow-card-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-primary/10 bg-primary/5 py-16">
          <div className="container mx-auto flex flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <Shield className="h-4 w-4" />
                Conformité légale
              </div>
              <h2 className="text-3xl font-display font-semibold">Prêt pour la réforme de la facturation 2026</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                E-invoicing, e-reporting et pilotage documentaire sont déjà pensés pour accompagner la transition.
              </p>
            </div>
            <Button className="gap-2" onClick={() => navigate("/reforme-2026")}>
              Découvrir le dossier 2026 <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="rounded-[36px] border border-border/80 bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.14),transparent_18rem),linear-gradient(140deg,#ffffff_0%,#f5f6fd_100%)] p-10 text-center shadow-card md:p-16">
            <h2 className="text-3xl font-display font-semibold md:text-4xl">
              Prêt à transformer votre gestion quotidienne ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Planify rassemble les flux critiques dans une interface unique, claire pour les équipes et crédible pour vos clients.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => navigate("/register")}>
                Commencer maintenant <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Accéder à la plateforme
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[10px] gradient-primary text-[11px] font-bold text-white">
              P
            </div>
            <span>© 2026 Planify. Tous droits réservés.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
