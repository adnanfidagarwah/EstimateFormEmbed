import { ReactNode } from "react";

interface FormStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  stepNumber: number;
}

export function FormStep({ title, subtitle, children, stepNumber }: FormStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
            {stepNumber}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-muted-foreground ml-11">{subtitle}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}
