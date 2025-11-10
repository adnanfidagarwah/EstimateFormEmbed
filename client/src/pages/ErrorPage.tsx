import { XCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ErrorPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-card-border rounded-lg p-8 shadow-sm">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Submission Failed
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            We're sorry, but there was an error processing your request. Please try again or contact us directly.
          </p>

          <div className="bg-muted/50 border border-border rounded-md p-4 mb-8">
            <p className="text-sm text-foreground mb-2">
              <strong>Need immediate assistance?</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Call us at: <a href="tel:+15551234567" className="text-primary hover:underline">(555) 123-4567</a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setLocation("/")}
              data-testid="button-try-again"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              onClick={() => setLocation("/")}
              data-testid="button-back-home"
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
