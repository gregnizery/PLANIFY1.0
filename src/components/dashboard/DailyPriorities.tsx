import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Priority {
    title: string;
    value: string | number;
    detail: string;
    tone: string;
}

export function DailyPriorities({ priorities }: { priorities: Priority[] }) {
    return (
        <Card className="border-border/70 shadow-card lg:col-span-2">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">Priorités du jour</h3>
                    <span className="text-xs text-muted-foreground">Mise à jour temps réel</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {priorities.map((item) => (
                        <div key={item.title} className="rounded-[22px] border border-border/80 bg-card/90 p-4 shadow-sm">
                            <p className="mb-1 text-xs text-muted-foreground">{item.title}</p>
                            <p className={cn("text-xl font-display font-semibold", item.tone)}>{item.value}</p>
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
