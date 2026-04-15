import { AvailabilityStatus, AIPrediction } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, RefreshCw, Minus } from "lucide-react";

export const StatusBadge = ({ status }: { status: AvailabilityStatus }) => {
  const styles: Record<AvailabilityStatus, string> = {
    "Available": "bg-success/15 text-success border-success/30",
    "Low Stock": "bg-warning/15 text-warning border-warning/30",
    "Out of Stock": "bg-destructive/15 text-destructive border-destructive/30",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", styles[status])}>
      {status}
    </span>
  );
};

export const PredictionBadge = ({ prediction }: { prediction: AIPrediction }) => {
  const config: Record<AIPrediction, { icon: React.ElementType; className: string }> = {
    "High availability": { icon: TrendingUp, className: "text-success" },
    "Likely to run out soon": { icon: TrendingDown, className: "text-destructive" },
    "Restocking expected": { icon: RefreshCw, className: "text-primary" },
    "Stable supply": { icon: Minus, className: "text-muted-foreground" },
  };

  const { icon: Icon, className } = config[prediction];

  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", className)}>
      <Icon className="h-3 w-3" />
      {prediction}
    </span>
  );
};
