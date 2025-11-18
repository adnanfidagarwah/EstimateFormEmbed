import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-card-border rounded-lg p-8 shadow-sm">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Thank You!
          </h1>
          
          <p className="text-lg text-foreground mb-2">
            Your tailored cleaning solution request - provide you with a free estimate.
          </p>
          
          <p className="text-muted-foreground mb-8">
            A live agent will review your details and contact you within 24 hours to discuss your needs and provide a free estimate.

          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-8">
            <p className="text-sm text-foreground">
              <strong>What's Next?</strong>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 text-left">
              <li>• We review your request</li>
              <li>• We contact you via your preferred method</li>
              <li>• You receive a quote and scheduling options</li>
            </ul>
          </div>

          <Button
            onClick={() => setLocation("/")}
            data-testid="button-back-home"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
