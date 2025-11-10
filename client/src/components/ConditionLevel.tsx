import { cn } from "@/lib/utils";

interface ConditionLevelProps {
  level: "level_1" | "level_2" | "level_3" | "level_4";
  selected: boolean;
  onClick: () => void;
}

const levelConfig = {
  level_1: {
    label: "Level 1 - Light",
    description: "Well-maintained, minimal cleaning needed"
  },
  level_2: {
    label: "Level 2 - Moderate",
    description: "Normal wear, standard cleaning required"
  },
  level_3: {
    label: "Level 3 - Heavy",
    description: "Significant buildup, extensive cleaning needed"
  },
  level_4: {
    label: "Level 4 - Very Heavy",
    description: "Deep neglect, intensive restoration required"
  }
};

export function ConditionLevel({ level, selected, onClick }: ConditionLevelProps) {
  const config = levelConfig[level];

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={`condition-${level}`}
      className={cn(
        "w-full p-4 rounded-md border-2 transition-all duration-200 hover-elevate active-elevate-2",
        "flex items-start gap-3 text-left",
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200",
        selected
          ? "border-primary bg-primary"
          : "border-muted-foreground"
      )}>
        {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base text-foreground">{config.label}</h3>
        <p className="text-sm text-muted-foreground">{config.description}</p>
      </div>
    </button>
  );
}
