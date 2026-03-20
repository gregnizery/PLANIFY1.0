import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useFailsafeRedirect } from "@/hooks/use-failsafe-redirect";

const highlights = [
  {
    icon: Workflow,
    title: "Opérations unifiées",
    text: "Clients, missions, parc et finance restent synchronisés dans un seul shell.",
  },
  {
    icon: Sparkles,
    title: "Pilotage dense",
    text: "Recherche, alertes et commandes rapides sont accessibles sans changer d’écran.",
  },
  {
    icon: ShieldCheck,
    title: "Contrôle maîtrisé",
    text: "Rôles, historique et validations sont intégrés dans les flux métier.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, user } = useAuth();
  const { toast } = useToast();

  const invitationToken = searchParams.get("token");
  const urlEmail = searchParams.get("email");

  const [email, setEmail] = useState(urlEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { shouldBlock, clearFailsafe } = useFailsafeRedirect();

  useEffect(() => {
    async function checkToken() {
      if (invitationToken) {
        try {
          const { data, error } = await supabase.functions.invoke("view-invitation", {
            body: { token: invitationToken },
          });
          if (!error && data?.success) {
            setEmail(data.email);
          }
        } catch (err) {
          console.error("Error verifying login token:", err);
        }
      }
    }
    checkToken();
  }, [invitationToken]);

  useEffect(() => {
    if (user && !searchParams.get("error") && !shouldBlock) {
      if (invitationToken) {
        navigate(`/invitation?token=${invitationToken}`, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [user, navigate, invitationToken, searchParams, shouldBlock]);

  if (shouldBlock) {
    return (
      <div className="forced-light flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <div className="max-w-sm space-y-6 rounded-[32px] border border-border/80 bg-card/95 p-8 shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-warning/10 text-warning">
            <EyeOff className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-display font-semibold">Sécurité : boucle bloquée</h2>
          <p className="text-sm text-muted-foreground">
            Trop de tentatives de redirection ont été détectées. Les données locales ont été nettoyées.
          </p>
          <Button
            onClick={() => {
              clearFailsafe();
              window.location.href = "/login";
            }}
            className="w-full"
          >
            Retenter une connexion propre
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        navigate(`/verify-email?email=${encodeURIComponent(email)}`, { replace: true });
        toast({
          title: "Email non confirmé",
          description: "Veuillez vérifier votre boîte de réception.",
        });
      } else {
        toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
      }
    }
  };

  return (
    <div className="forced-light min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
        <div className="relative hidden overflow-hidden border-r border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(87,73,244,0.18),transparent_26rem),linear-gradient(160deg,#eef0ff_0%,#ffffff_60%,#f7f7fb_100%)] lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(138,124,255,0.16),transparent_18rem)]" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[18px] gradient-primary text-xl font-bold text-white shadow-glow">
              P
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Halo interface
              </p>
              <p className="font-display text-2xl font-semibold tracking-tight">Planify</p>
            </div>
          </div>

          <div className="relative max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Command center métier
            </div>
            <div className="space-y-4">
              <h1 className="max-w-lg text-5xl font-display font-semibold leading-[1.02] tracking-tight text-foreground">
                Une interface unifiée pour piloter toute l’activité.
              </h1>
              <p className="max-w-lg text-base leading-7 text-muted-foreground">
                De la relation client au recouvrement, l’application adopte désormais le langage Halo:
                surfaces claires, commandes rapides et densité maîtrisée.
              </p>
            </div>
            <div className="grid gap-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-border/80 bg-card/85 p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[24px] border border-border/80 bg-card/85 p-4 shadow-card">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Accès rapide
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Recherche globale, notifications et profil restent au même endroit sur tous les écrans.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-[440px] animate-slide-up">
            <div className="rounded-[34px] border border-border/80 bg-card/96 p-8 shadow-card md:p-10">
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] gradient-primary text-xl font-bold text-white shadow-glow">
                    P
                  </div>
                  <span className="font-display text-2xl font-semibold tracking-tight">Planify</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                    Connexion
                  </p>
                  <h2 className="mt-2 text-3xl font-display font-semibold tracking-tight">
                    Accédez à votre workspace
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Retrouvez votre shell, vos alertes et vos commandes métier dès l’ouverture.
                  </p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vous@entreprise.fr"
                    value={email}
                    onChange={(e) => !invitationToken && setEmail(e.target.value)}
                    className={invitationToken ? "cursor-not-allowed border-border/60 bg-secondary/70 text-muted-foreground" : ""}
                    required
                    disabled={!!invitationToken}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link
                  to={`/register${invitationToken ? `?token=${invitationToken}` : ""}`}
                  className="font-medium text-primary hover:underline"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
