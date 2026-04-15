import { Shop } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, PredictionBadge } from "@/components/AvailabilityBadge";
import { MapPin, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShopCardProps {
  shop: Shop;
  isSelected?: boolean;
  onSelect?: (shop: Shop) => void;
  onViewMap?: (shop: Shop) => void;
}

const ShopCard = ({ shop, isSelected, onSelect, onViewMap }: ShopCardProps) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        isSelected && "ring-2 ring-primary shadow-md"
      )}
      onClick={() => onSelect?.(shop)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold text-foreground">{shop.name}</h3>
              <div className="flex items-center gap-0.5 text-warning">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs font-medium">{shop.rating}</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{shop.address}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg font-bold text-foreground">{shop.price}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Navigation className="h-3 w-3" />
              {shop.distanceLabel}
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={shop.status} />
            <PredictionBadge prediction={shop.prediction} />
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onViewMap?.(shop);
            }}
          >
            <MapPin className="mr-1 h-3 w-3" />
            Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
