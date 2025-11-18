import { Sparkles, Hammer, TruckIcon, HardHat, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CleaningTypeOptionProps {
  type: "standard" | "deep" | "move_in_out" | "post_construction" | "specialized_rough_final";
  selected: boolean;
  onClick: () => void;
}

const cleaningConfig = {
  standard: {
    icon: Sparkles,
    label: "Standard Cleaning",
    description: "Regular maintenance cleaning"
  },
  deep: {
    icon: Hammer,
    label: "Deep Cleaning",
    description: "Thorough intensive clean"
  },
  move_in_out: {
    icon: TruckIcon,
    label: "Move-In / Move-Out",
    description: "Complete property preparation"
  },
  post_construction: {
    icon: HardHat,
    label: "Post Construction",
    description: "Detailed cleaning after renovation or build"
  },
  specialized_rough_final: {
    icon: ClipboardCheck,
    label: "Specialized Rough or Final Clean",
    description: "Rough or final clean tailored to contractor needs"
  }
};

export function CleaningTypeOption({ type, selected, onClick }: CleaningTypeOptionProps) {
  const config = cleaningConfig[type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`cleaning-type-${type}`}
      className={cn(
        "w-full p-5 rounded-md border-2 transition-all duration-200 hover-elevate active-elevate-2",
        "flex items-center gap-4 text-left",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200",
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base text-foreground">{config.label}</h3>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
        selected
          ? "border-primary bg-primary"
          : "border-muted-foreground"
      )}>
        {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
      </div>
    </button>
  );
}
