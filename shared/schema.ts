import { z } from "zod";

// Cleaning Inquiry Schema with conditional validation
export const cleaningInquirySchema = z.object({
  // Step 1: Property Type
  propertyType: z.enum(["single_family", "townhouse_condo", "apartment", "commercial"]),
  
  // Step 2: Address (required for residential only)
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  
  // Step 3: Cleaning Type
  cleaningType: z.enum([
    "standard",
    "deep",
    "move_in_out",
    "post_construction",
    "specialized_rough_final",
  ]),
  
  // Step 4: Home Condition
  homeCondition: z.enum(["level_1", "level_2", "level_3", "level_4"]),
  clutterLevel: z.number().min(1).max(10),
  
  // Step 5: Add-ons
  addOns: z.object({
    interiorOven: z.boolean(),
    interiorFridge: z.boolean(),
    dishes: z.boolean(),
    interiorWindows: z.boolean(),
    baseboards: z.boolean(),
    wallSpotCleaning: z.boolean(),
    patioBalcony: z.boolean(),
    petHairRemoval: z.boolean(),
  }),
  specificRequests: z.string().optional(),
  
  // Step 6: Scheduling
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.enum(["morning", "afternoon"]),
  hasPets: z.boolean(),
  recurringBasis: z.enum(["one_time", "weekly", "bi_weekly", "monthly"]),
  
  // Step 7: Contact Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  hasReferral: z.boolean(),
  referralName: z.string().optional(),
  preferredContact: z.enum(["text", "call", "email", "no_preference"]),
  newsletterOptIn: z.boolean(),
  privacyPolicyAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the Privacy Policy",
  }),
}).refine(
  (data) => {
    // If hasReferral is true, referralName must be provided
    if (data.hasReferral && !data.referralName?.trim()) {
      return false;
    }
    return true;
  },
  {
    message: "Please provide the name of who referred you",
    path: ["referralName"],
  }
);

export type CleaningInquiry = z.infer<typeof cleaningInquirySchema>;

// For commercial inquiries (simplified)
export const commercialInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

export type CommercialInquiry = z.infer<typeof commercialInquirySchema>;
