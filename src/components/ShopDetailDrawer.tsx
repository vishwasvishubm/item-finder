import { Shop } from "@/data/mockData";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge, PredictionBadge } from "@/components/AvailabilityBadge";
import { MapPin, Star, Navigation, Clock, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ShopDetailDrawerProps {
  shop: Shop | null;
  open: boolean;
  onClose: () => void;
  onViewMap?: (shop: Shop) => void;
}

const ShopDetailDrawer = ({ shop, open, onClose, onViewMap }: ShopDetailDrawerProps) => {
  if (!shop) return null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-2">
            <SheetTitle className="text-xl">{shop.name}</SheetTitle>
            <div className="flex items-center gap-0.5 text-warning">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">{shop.rating}</span>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status & Prediction */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={shop.status} />
            <PredictionBadge prediction={shop.prediction} />
          </div>

          {/* Price */}
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-3xl font-bold text-foreground">{shop.price}</p>
          </div>

          <Separator />

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{shop.address}</p>
                <p className="text-xs text-muted-foreground">{shop.distanceLabel} away</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-foreground">Open · Closes at 10:00 PM</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-foreground">+91 98765 43210</p>
            </div>
          </div>

          <Separator />

          {/* Items available */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-semibold text-foreground">Items Available</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {shop.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-secondary px-2.5 py-1 text-xs font-medium capitalize text-secondary-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => shop && onViewMap?.(shop)}>
              <MapPin className="mr-2 h-4 w-4" />
              View on Map
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`,
                  "_blank"
                )
              }
            >
              <Navigation className="mr-2 h-4 w-4" />
              Directions
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShopDetailDrawer;
