import { Card, CardContent } from "@/components/ui/card";
import { Package, AlertTriangle } from "lucide-react";

interface MaterielStatusProps {
    totalEquipment: number;
    availableEquipment: number;
    inMission: number;
    totalValue: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lowStock: any[];
    inMaintenance: number;
}

export function MaterielStatus({
    totalEquipment,
    availableEquipment,
    inMission,
    totalValue,
    lowStock,
    inMaintenance
}: MaterielStatusProps) {
    if (totalEquipment === 0) return null;

    return (
        <Card className="border-border/70 shadow-card">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold flex items-center gap-2"><Package className="h-4 w-4 text-warning" /> Matériel</h3>
                    <a href="/materiel" className="text-sm text-primary font-medium hover:underline">Voir tout</a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="rounded-[22px] border border-border/80 bg-card/90 p-4 text-center shadow-sm">
                        <p className="text-2xl font-display font-semibold">{totalEquipment}</p>
                        <p className="text-xs text-muted-foreground mt-1">Équipements</p>
                    </div>
                    <div className="rounded-[22px] border border-border/80 bg-card/90 p-4 text-center shadow-sm">
                        <p className="text-2xl font-display font-semibold text-success">{availableEquipment}</p>
                        <p className="text-xs text-muted-foreground mt-1">Disponibles</p>
                    </div>
                    <div className="rounded-[22px] border border-border/80 bg-card/90 p-4 text-center shadow-sm">
                        <p className="text-2xl font-display font-semibold text-info">{inMission}</p>
                        <p className="text-xs text-muted-foreground mt-1">En mission</p>
                    </div>
                    <div className="rounded-[22px] border border-border/80 bg-card/90 p-4 text-center shadow-sm">
                        <p className="text-2xl font-display font-semibold">{totalValue > 0 ? `${(totalValue / 1000).toFixed(1)}K€` : "—"}</p>
                        <p className="text-xs text-muted-foreground mt-1">Valeur totale</p>
                    </div>
                </div>

                {(lowStock.length > 0 || inMaintenance > 0) && (
                    <div className="mt-4 space-y-2">
                        {lowStock.length > 0 && (
                            <div className="flex items-center gap-2 rounded-[18px] border border-warning/20 bg-warning/10 p-3">
                                <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
                                <p className="text-sm text-warning">
                                    <span className="font-semibold">{lowStock.length} équipement{lowStock.length > 1 ? "s" : ""}</span> en stock bas (≤ 1) : {lowStock.slice(0, 3).map(m => m.name).join(", ")}{lowStock.length > 3 ? "…" : ""}
                                </p>
                            </div>
                        )}
                        {inMaintenance > 0 && (
                            <div className="flex items-center gap-2 rounded-[18px] border border-border bg-muted p-3">
                                <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                                <p className="text-sm text-muted-foreground"><span className="font-semibold">{inMaintenance}</span> en maintenance</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
