import { Home, Building2, Building, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyTypeCardProps {
  type: "single_family" | "townhouse_condo" | "apartment" | "commercial";
  selected: boolean;
  onClick: () => void;
}

const propertyConfig = {
  single_family: {
    icon: Home,
    label: "Single Family",
    description: "Detached home"
  },
  townhouse_condo: {
    icon: Building2,
    label: "Townhouse / Condo",
    description: "Attached residence"
  },
  apartment: {
    icon: Building,
    label: "Apartment",
    description: "Multi-unit building"
  },
  commercial: {
    icon: Briefcase,
    label: "Commercial",
    description: "Business space"
  }
};

export function PropertyTypeCard({ type, selected, onClick }: PropertyTypeCardProps) {
  const config = propertyConfig[type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`property-type-${type}`}
      className={cn(
        "w-full p-6 rounded-md border-2 transition-all duration-200 hover-elevate active-elevate-2",
        "flex flex-col items-center gap-3 text-center",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-200",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-foreground">{config.label}</h3>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </button>
  );
}
