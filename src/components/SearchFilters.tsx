import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortBy = "distance" | "price" | "availability";

interface SearchFiltersProps {
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  showAvailableOnly: boolean;
  onFilterChange: (val: boolean) => void;
}

const SearchFilters = ({ sortBy, onSortChange, showAvailableOnly, onFilterChange }: SearchFiltersProps) => {
  const sortOptions: { value: SortBy; label: string }[] = [
    { value: "distance", label: "Distance" },
    { value: "price", label: "Price" },
    { value: "availability", label: "Availability" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        {sortOptions.map((opt) => (
          <Button
            key={opt.value}
            size="sm"
            variant={sortBy === opt.value ? "default" : "outline"}
            className="h-7 text-xs"
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
      <Button
        size="sm"
        variant={showAvailableOnly ? "default" : "outline"}
        className={cn("h-7 text-xs")}
        onClick={() => onFilterChange(!showAvailableOnly)}
      >
        <Filter className="mr-1 h-3 w-3" />
        Available only
      </Button>
    </div>
  );
};

export default SearchFilters;
