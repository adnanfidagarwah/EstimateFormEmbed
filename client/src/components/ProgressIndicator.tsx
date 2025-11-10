import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isUpcoming = step > currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                    ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                    ${isCurrent ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : ""}
                    ${isUpcoming ? "bg-muted text-muted-foreground" : ""}
                  `}
                  data-testid={`progress-step-${step}`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step}
                </div>
                <span
                  className={`
                    text-xs mt-2 font-medium transition-colors duration-300
                    ${isCurrent ? "text-foreground" : "text-muted-foreground"}
                  `}
                >
                  Step {step}
                </span>
              </div>
              {step < totalSteps && (
                <div className="flex-1 h-1 mx-2 mb-6">
                  <div
                    className={`
                      h-full rounded-full transition-all duration-300
                      ${step < currentStep ? "bg-primary" : "bg-muted"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
