import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CleaningInquiryForm from "@/pages/CleaningInquiryForm";
import CommercialForm from "@/pages/CommercialForm";
import SuccessPage from "@/pages/SuccessPage";
import ErrorPage from "@/pages/ErrorPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CleaningInquiryForm} />
      <Route path="/commercial" component={CommercialForm} />
      <Route path="/success" component={SuccessPage} />
      <Route path="/error" component={ErrorPage} />
      <Route component={CleaningInquiryForm} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
