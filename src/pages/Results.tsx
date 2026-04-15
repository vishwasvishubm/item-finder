import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin, List, Map as MapIcon, PackageX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import ShopCard from "@/components/ShopCard";
import MapView from "@/components/MapView";
import SearchFilters, { SortBy } from "@/components/SearchFilters";
import ShopDetailDrawer from "@/components/ShopDetailDrawer";
import { mockShops, Shop } from "@/data/mockData";

const statusOrder = { Available: 0, "Low Stock": 1, "Out of Stock": 2 };

const Results = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const itemQuery = params.get("item") || "";
  const locationQuery = params.get("location") || "";

  const [item, setItem] = useState(itemQuery);
  const [location, setLocation] = useState(locationQuery);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("distance");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [drawerShop, setDrawerShop] = useState<Shop | null>(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [itemQuery]);

  const filteredShops = useMemo(() => {
    let shops = mockShops.filter((s) =>
      s.items.some((i) => i.toLowerCase().includes(itemQuery.toLowerCase()))
    );
    if (availableOnly) shops = shops.filter((s) => s.status === "Available");
    shops.sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "price")
        return (
          parseFloat(a.price.replace("₹", "")) -
          parseFloat(b.price.replace("₹", ""))
        );
      return statusOrder[a.status] - statusOrder[b.status];
    });
    return shops;
  }, [itemQuery, sortBy, availableOnly]);

  const handleSearch = () => {
    if (!item.trim()) return;
    const p = new URLSearchParams({ item: item.trim() });
    if (location.trim()) p.set("location", location.trim());
    navigate(`/results?${p.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto flex-1 px-4 py-4"
      >
        {/* Search bar */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9"
              placeholder="Search item..."
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-9"
              placeholder="Location..."
            />
          </div>
          <Button onClick={handleSearch} disabled={!item.trim()}>
            Search
          </Button>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <SearchFilters
            sortBy={sortBy}
            onSortChange={setSortBy}
            showAvailableOnly={availableOnly}
            onFilterChange={setAvailableOnly}
          />
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={!showMap ? "default" : "outline"}
              className="h-7"
              onClick={() => setShowMap(false)}
            >
              <List className="mr-1 h-3 w-3" /> List
            </Button>
            <Button
              size="sm"
              variant={showMap ? "default" : "outline"}
              className="h-7"
              onClick={() => setShowMap(true)}
            >
              <MapIcon className="mr-1 h-3 w-3" /> Map
            </Button>
          </div>
        </div>

        <p className="mb-3 text-sm text-muted-foreground">
          {loading
            ? "Searching..."
            : `${filteredShops.length} shops found for "${itemQuery}"`}
        </p>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-3 md:grid-cols-2"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </motion.div>
          ) : filteredShops.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <PackageX className="mb-4 h-16 w-16 text-muted-foreground/40" />
              <h2 className="text-xl font-semibold text-foreground">
                No items found nearby
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different item or expand your location.
              </p>
            </motion.div>
          ) : showMap ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[calc(100vh-280px)]"
            >
              <MapView
                shops={filteredShops}
                selectedShop={selectedShop}
                onSelectShop={setSelectedShop}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-3 md:grid-cols-2"
            >
              {filteredShops.map((shop, i) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <ShopCard
                    shop={shop}
                    isSelected={selectedShop?.id === shop.id}
                    onSelect={(s) => {
                      setSelectedShop(s);
                      setDrawerShop(s);
                    }}
                    onViewMap={(s) => {
                      setSelectedShop(s);
                      setShowMap(true);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ShopDetailDrawer
        shop={drawerShop}
        open={!!drawerShop}
        onClose={() => setDrawerShop(null)}
        onViewMap={(s) => {
          setDrawerShop(null);
          setSelectedShop(s);
          setShowMap(true);
        }}
      />
    </div>
  );
};

export default Results;
