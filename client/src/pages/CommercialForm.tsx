import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commercialInquirySchema, type CommercialInquiry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function CommercialForm() {
  const [, setLocation] = useLocation();

  const form = useForm<CommercialInquiry>({
    resolver: zodResolver(commercialInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: CommercialInquiry) => {
      return await apiRequest("POST", "/api/commercial-inquiry", data);
    },
    onSuccess: () => {
      setLocation("/success");
    },
    onError: () => {
      setLocation("/error");
    },
  });

  const onSubmit = (data: CommercialInquiry) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-testid="button-back-to-form"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to property selection
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Commercial Cleaning Inquiry
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about your commercial cleaning needs
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card border border-card-border rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  data-testid="input-first-name"
                  {...form.register("firstName")}
                  className="mt-1"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  data-testid="input-last-name"
                  {...form.register("lastName")}
                  className="mt-1"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                data-testid="input-company-name"
                {...form.register("companyName")}
                placeholder="Your Company Inc."
                className="mt-1"
              />
              {form.formState.errors.companyName && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                data-testid="input-phone"
                {...form.register("phone")}
                placeholder="(555) 123-4567"
                className="mt-1"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                data-testid="input-email"
                {...form.register("email")}
                placeholder="you@company.com"
                className="mt-1"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                data-testid="textarea-message"
                {...form.register("message")}
                placeholder="Tell us about your commercial cleaning needs, property size, cleaning frequency, and any specific requirements..."
                rows={6}
                className="mt-1 resize-none"
              />
              {form.formState.errors.message && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              data-testid="button-submit"
              disabled={submitMutation.isPending}
              className="w-full"
              size="lg"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Commercial Inquiry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
