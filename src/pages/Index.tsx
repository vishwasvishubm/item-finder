import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Crosshair, Sparkles, Clock, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { popularSearches } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { useRecentSearches } from "@/hooks/useRecentSearches";

const Index = () => {
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();
  const { searches: recentSearches, addSearch, clearSearches } = useRecentSearches();

  const handleSearch = () => {
    if (!item.trim()) return;
    addSearch(item.trim());
    const params = new URLSearchParams({ item: item.trim() });
    if (location.trim()) params.set("location", location.trim());
    navigate(`/results?${params.toString()}`);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation("Bengaluru (Current Location)");
        setLocating(false);
      },
      () => {
        setLocation("Bengaluru");
        setLocating(false);
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl space-y-8 text-center"
        >
          {/* Hero */}
          <div className="space-y-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Find anything,{" "}
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                nearby
              </span>
            </h1>
            <p className="mx-auto max-w-md text-muted-foreground">
              Search for any item and instantly discover which shops near you have it in stock — powered by smart predictions.
            </p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mx-auto w-full max-w-xl space-y-3"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for milk, medicine, rice..."
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="City or pincode"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={handleSearch} className="flex-1" disabled={!item.trim()}>
                <Search className="mr-2 h-4 w-4" />
                Find Nearby
              </Button>
              <Button
                variant="outline"
                onClick={handleCurrentLocation}
                disabled={locating}
                className="shrink-0"
              >
                <Crosshair className="mr-2 h-4 w-4" />
                {locating ? "Detecting..." : "Use Current Location"}
              </Button>
            </div>
          </motion.div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Recent searches
                </p>
                <button onClick={clearSearches} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setItem(s)}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium capitalize text-primary transition-colors hover:bg-primary/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Popular */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-2"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Popular searches</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setItem(s)}
                  className="rounded-full border bg-card px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        Built with ❤️ for Smart India Hackathon · NearbyIQ © 2026
      </footer>
    </div>
  );
};

export default Index;
