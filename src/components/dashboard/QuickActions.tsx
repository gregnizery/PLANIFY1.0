import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ClipboardCheck, LucideIcon } from "lucide-react";

interface Action {
    label: string;
    href: string;
    icon: LucideIcon;
}

export function QuickActions({ actions }: { actions: Action[] }) {
    return (
        <Card className="border-border/70 shadow-card">
            <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" /> Actions rapides
                </h3>
                <div className="space-y-2">
                    {actions.map((action) => (
                        <Link
                            key={action.label}
                            to={action.href}
                            className="flex items-center justify-between rounded-[20px] border border-border/80 bg-card/90 px-3.5 py-3 text-sm transition-colors hover:border-primary/20 hover:bg-muted/60"
                        >
                            <span className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                                  <action.icon className="h-4 w-4" />
                                </span>
                                {action.label}
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
