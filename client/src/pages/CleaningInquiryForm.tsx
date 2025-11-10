import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cleaningInquirySchema, type CleaningInquiry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { FormStep } from "@/components/FormStep";
import { PropertyTypeCard } from "@/components/PropertyTypeCard";
import { CleaningTypeOption } from "@/components/CleaningTypeOption";
import { ConditionLevel } from "@/components/ConditionLevel";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const TOTAL_STEPS = 7;

export default function CleaningInquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<CleaningInquiry>({
    resolver: zodResolver(cleaningInquirySchema),
    defaultValues: {
      propertyType: "single_family",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      cleaningType: "standard",
      homeCondition: "level_2",
      clutterLevel: 5,
      addOns: {
        interiorOven: false,
        interiorFridge: false,
        dishes: false,
        interiorWindows: false,
        baseboards: false,
        wallSpotCleaning: false,
        patioBalcony: false,
        petHairRemoval: false,
      },
      specificRequests: "",
      preferredDate: "",
      preferredTime: "morning",
      hasPets: false,
      recurringBasis: "one_time",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hasReferral: false,
      referralName: "",
      preferredContact: "no_preference",
      newsletterOptIn: false,
      privacyPolicyAgreed: false,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: CleaningInquiry) => {
      return await apiRequest("POST", "/api/cleaning-inquiry", data);
    },
    onSuccess: () => {
      setLocation("/success");
    },
    onError: () => {
      setLocation("/error");
    },
  });

  const propertyType = form.watch("propertyType");
  const hasReferral = form.watch("hasReferral");
  const clutterLevel = form.watch("clutterLevel");

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate: Record<number, (keyof CleaningInquiry)[]> = {
      1: ["propertyType"],
      2: ["streetAddress", "city", "state", "zipCode"],
      3: ["cleaningType"],
      4: ["homeCondition", "clutterLevel"],
      5: [],
      6: ["preferredDate", "preferredTime", "recurringBasis"],
      7: ["firstName", "lastName", "phone", "email", "privacyPolicyAgreed", "referralName"],
    };

    const fields = fieldsToValidate[step] || [];
    const result = await form.trigger(fields as any);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = (data: CleaningInquiry) => {
    submitMutation.mutate(data);
  };

  // Commercial redirect
  if (propertyType === "commercial") {
    setLocation("/commercial");
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Live Agents — Free Estimates</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            We create tailored cleaning solutions for you
          </h1>
          <p className="text-xl text-muted-foreground">
            The industry's most trusted cleaning expert
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-card border border-card-border rounded-lg p-6 sm:p-8 shadow-sm">
          {/* Step 1: Property Type */}
          {currentStep === 1 && (
            <FormStep title="Choose Your Property Type" stepNumber={1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PropertyTypeCard
                  type="single_family"
                  selected={propertyType === "single_family"}
                  onClick={() => form.setValue("propertyType", "single_family")}
                />
                <PropertyTypeCard
                  type="townhouse_condo"
                  selected={propertyType === "townhouse_condo"}
                  onClick={() => form.setValue("propertyType", "townhouse_condo")}
                />
                <PropertyTypeCard
                  type="apartment"
                  selected={propertyType === "apartment"}
                  onClick={() => form.setValue("propertyType", "apartment")}
                />
                <PropertyTypeCard
                  type="commercial"
                  selected={propertyType === "commercial"}
                  onClick={() => form.setValue("propertyType", "commercial")}
                />
              </div>
            </FormStep>
          )}

          {/* Step 2: Property Address */}
          {currentStep === 2 && (
            <FormStep title="Property Address" subtitle="Enter your property location" stepNumber={2}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    data-testid="input-street-address"
                    {...form.register("streetAddress")}
                    placeholder="123 Main Street"
                    className="mt-1"
                  />
                  {form.formState.errors.streetAddress && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.streetAddress.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      data-testid="input-city"
                      {...form.register("city")}
                      placeholder="Austin"
                      className="mt-1"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      data-testid="input-state"
                      {...form.register("state")}
                      placeholder="TX"
                      className="mt-1"
                    />
                    {form.formState.errors.state && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      data-testid="input-zip-code"
                      {...form.register("zipCode")}
                      placeholder="78701"
                      className="mt-1"
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm text-destructive mt-1">{form.formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </FormStep>
          )}

          {/* Step 3: Type of Cleaning */}
          {currentStep === 3 && (
            <FormStep title="Type of Cleaning" subtitle="Select the cleaning service you need" stepNumber={3}>
              <div className="space-y-3">
                <CleaningTypeOption
                  type="standard"
                  selected={form.watch("cleaningType") === "standard"}
                  onClick={() => form.setValue("cleaningType", "standard")}
                />
                <CleaningTypeOption
                  type="deep"
                  selected={form.watch("cleaningType") === "deep"}
                  onClick={() => form.setValue("cleaningType", "deep")}
                />
                <CleaningTypeOption
                  type="move_in_out"
                  selected={form.watch("cleaningType") === "move_in_out"}
                  onClick={() => form.setValue("cleaningType", "move_in_out")}
                />
              </div>
            </FormStep>
          )}

          {/* Step 4: Home Condition */}
          {currentStep === 4 && (
            <FormStep title="Home Condition" subtitle="This helps us estimate time and price. No judgment." stepNumber={4}>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Current Condition *</Label>
                  <div className="space-y-2">
                    <ConditionLevel
                      level="level_1"
                      selected={form.watch("homeCondition") === "level_1"}
                      onClick={() => form.setValue("homeCondition", "level_1")}
                    />
                    <ConditionLevel
                      level="level_2"
                      selected={form.watch("homeCondition") === "level_2"}
                      onClick={() => form.setValue("homeCondition", "level_2")}
                    />
                    <ConditionLevel
                      level="level_3"
                      selected={form.watch("homeCondition") === "level_3"}
                      onClick={() => form.setValue("homeCondition", "level_3")}
                    />
                    <ConditionLevel
                      level="level_4"
                      selected={form.watch("homeCondition") === "level_4"}
                      onClick={() => form.setValue("homeCondition", "level_4")}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Clutter Level</Label>
                    <span className="text-2xl font-bold text-primary" data-testid="clutter-level-value">{clutterLevel}</span>
                  </div>
                  <Slider
                    value={[clutterLevel]}
                    onValueChange={(value) => form.setValue("clutterLevel", value[0])}
                    min={1}
                    max={10}
                    step={1}
                    className="mt-2"
                    data-testid="slider-clutter-level"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Minimal</span>
                    <span>Maximum</span>
                  </div>
                </div>
              </div>
            </FormStep>
          )}

          {/* Step 5: Add-On Services */}
          {currentStep === 5 && (
            <FormStep title="Add-On Services" subtitle="Select any additional services you'd like" stepNumber={5}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "interiorOven", label: "Interior Oven" },
                    { key: "interiorFridge", label: "Interior Fridge" },
                    { key: "dishes", label: "Dishes" },
                    { key: "interiorWindows", label: "Interior Windows" },
                    { key: "baseboards", label: "Baseboards" },
                    { key: "wallSpotCleaning", label: "Wall Spot Cleaning" },
                    { key: "patioBalcony", label: "Patio / Balcony" },
                    { key: "petHairRemoval", label: "Pet Hair Removal" },
                  ].map(({ key, label }) => (
                    <div
                      key={key}
                      className="flex items-center space-x-3 p-3 rounded-md border border-border bg-card hover-elevate"
                    >
                      <Checkbox
                        id={key}
                        data-testid={`checkbox-${key}`}
                        checked={form.watch(`addOns.${key as keyof CleaningInquiry["addOns"]}`)}
                        onCheckedChange={(checked) =>
                          form.setValue(`addOns.${key as keyof CleaningInquiry["addOns"]}`, checked as boolean)
                        }
                      />
                      <Label htmlFor={key} className="cursor-pointer flex-1 text-sm font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div>
                  <Label htmlFor="specificRequests" className="mb-2 block">Specific Requests</Label>
                  <Textarea
                    id="specificRequests"
                    data-testid="textarea-specific-requests"
                    {...form.register("specificRequests")}
                    placeholder="Let us know if you have any specific requests..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </FormStep>
          )}

          {/* Step 6: Scheduling */}
          {currentStep === 6 && (
            <FormStep title="Scheduling" subtitle="When would you like us to clean?" stepNumber={6}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="preferredDate">Preferred Cleaning Date *</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    data-testid="input-preferred-date"
                    {...form.register("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1"
                  />
                  {form.formState.errors.preferredDate && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.preferredDate.message}</p>
                  )}
                </div>
                <div>
                  <Label className="mb-3 block font-semibold">Preferred Time *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => form.setValue("preferredTime", "morning")}
                      data-testid="time-morning"
                      className={`p-4 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        form.watch("preferredTime") === "morning"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="font-semibold">Morning</div>
                      <div className="text-sm text-muted-foreground">8am - 12pm</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => form.setValue("preferredTime", "afternoon")}
                      data-testid="time-afternoon"
                      className={`p-4 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        form.watch("preferredTime") === "afternoon"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="font-semibold">Afternoon</div>
                      <div className="text-sm text-muted-foreground">12pm - 4pm</div>
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block font-semibold">Any Pets?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => form.setValue("hasPets", true)}
                      data-testid="pets-yes"
                      className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        form.watch("hasPets") === true
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => form.setValue("hasPets", false)}
                      data-testid="pets-no"
                      className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        form.watch("hasPets") === false
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block font-semibold">Recurring Basis</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "one_time", label: "One-Time" },
                      { value: "weekly", label: "Weekly" },
                      { value: "bi_weekly", label: "Bi-Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => form.setValue("recurringBasis", value as any)}
                        data-testid={`recurring-${value}`}
                        className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 text-sm ${
                          form.watch("recurringBasis") === value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FormStep>
          )}

          {/* Step 7: Contact Information */}
          {currentStep === 7 && (
            <FormStep title="Contact Information" subtitle="How can we reach you?" stepNumber={7}>
              <div className="space-y-4">
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
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label className="mb-3 block font-semibold">Were you referred by someone?</Label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => form.setValue("hasReferral", true)}
                      data-testid="referral-yes"
                      className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        hasReferral === true
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue("hasReferral", false);
                        form.setValue("referralName", "");
                      }}
                      data-testid="referral-no"
                      className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 ${
                        hasReferral === false
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card"
                      }`}
                    >
                      No
                    </button>
                  </div>
                  {hasReferral && (
                    <div>
                      <Label htmlFor="referralName">Referral Name *</Label>
                      <Input
                        id="referralName"
                        data-testid="input-referral-name"
                        {...form.register("referralName")}
                        placeholder="Who referred you?"
                        className="mt-1"
                      />
                      {form.formState.errors.referralName && (
                        <p className="text-sm text-destructive mt-1">{form.formState.errors.referralName.message}</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="mb-3 block font-semibold">Preferred Method of Contact</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "text", label: "Text" },
                      { value: "call", label: "Call" },
                      { value: "email", label: "Email" },
                      { value: "no_preference", label: "No Preference" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => form.setValue("preferredContact", value as any)}
                        data-testid={`contact-${value}`}
                        className={`p-3 rounded-md border-2 transition-all hover-elevate active-elevate-2 text-sm ${
                          form.watch("preferredContact") === value
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletterOptIn"
                      data-testid="checkbox-newsletter"
                      checked={form.watch("newsletterOptIn")}
                      onCheckedChange={(checked) => form.setValue("newsletterOptIn", checked as boolean)}
                    />
                    <Label htmlFor="newsletterOptIn" className="cursor-pointer text-sm leading-relaxed">
                      I'd like to receive newsletters and updates about cleaning tips and special offers
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacyPolicyAgreed"
                      data-testid="checkbox-privacy-policy"
                      checked={form.watch("privacyPolicyAgreed")}
                      onCheckedChange={(checked) => form.setValue("privacyPolicyAgreed", checked as boolean)}
                    />
                    <Label htmlFor="privacyPolicyAgreed" className="cursor-pointer text-sm leading-relaxed">
                      I agree to the Privacy Policy *
                    </Label>
                  </div>
                  {form.formState.errors.privacyPolicyAgreed && (
                    <p className="text-sm text-destructive">{form.formState.errors.privacyPolicyAgreed.message}</p>
                  )}
                </div>
              </div>
            </FormStep>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                data-testid="button-back"
                className="flex items-center gap-2"
                disabled={submitMutation.isPending}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                onClick={nextStep}
                data-testid="button-next"
                className="flex items-center gap-2 ml-auto"
                disabled={submitMutation.isPending}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                data-testid="button-submit"
                disabled={submitMutation.isPending}
                className="ml-auto"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
