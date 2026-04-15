import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Shop } from "@/data/mockData";
import { StatusBadge } from "@/components/AvailabilityBadge";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const userIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "hue-rotate-[200deg] saturate-200 brightness-110",
});

const FlyToShop = ({ shop }: { shop: Shop | null }) => {
  const map = useMap();
  useEffect(() => {
    if (shop) {
      map.flyTo([shop.lat, shop.lng], 15, { duration: 0.8 });
    }
  }, [shop, map]);
  return null;
};

interface MapViewProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onSelectShop: (shop: Shop) => void;
  userLocation?: { lat: number; lng: number };
}

const MapView = ({ shops, selectedShop, onSelectShop, userLocation }: MapViewProps) => {
  const center = userLocation || { lat: 12.9716, lng: 77.5946 };
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (selectedShop && markersRef.current[selectedShop.id]) {
      markersRef.current[selectedShop.id].openPopup();
    }
  }, [selectedShop]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        className="h-full w-full"
        style={{ minHeight: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToShop shop={selectedShop} />
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
        )}
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.lat, shop.lng]}
            ref={(ref) => {
              if (ref) markersRef.current[shop.id] = ref;
            }}
            eventHandlers={{ click: () => onSelectShop(shop) }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <strong className="text-sm">{shop.name}</strong>
                <p className="text-xs text-gray-500">{shop.distanceLabel} away</p>
                <p className="mt-1 text-sm font-semibold">{shop.price}</p>
                <p className="text-xs">{shop.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
