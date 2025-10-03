import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  onFilterChange?: (category: string | null) => void;
}

export default function CategoryFilter({ categories, onFilterChange }: CategoryFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (category: string) => {
    const newSelected = selected === category ? null : category;
    setSelected(newSelected);
    onFilterChange?.(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selected === category ? "default" : "secondary"}
          className="cursor-pointer hover-elevate active-elevate-2"
          onClick={() => handleSelect(category)}
          data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
