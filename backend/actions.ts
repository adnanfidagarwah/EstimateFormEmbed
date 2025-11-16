import {
  cleaningInquirySchema,
  commercialInquirySchema,
} from "../shared/schema.js";
import {
  sendCleaningInquiryEmail,
  sendCommercialInquiryEmail,
} from "./email.js";

type FormSuccessResponse = {
  success: true;
  message: string;
};

export async function submitCleaningInquiry(
  payload: unknown,
): Promise<FormSuccessResponse> {
  const data = cleaningInquirySchema.parse(payload);
  await sendCleaningInquiryEmail(data);

  return {
    success: true,
    message: "Cleaning inquiry submitted successfully",
  };
}

export async function submitCommercialInquiry(
  payload: unknown,
): Promise<FormSuccessResponse> {
  const data = commercialInquirySchema.parse(payload);
  await sendCommercialInquiryEmail(data);

  return {
    success: true,
    message: "Commercial inquiry submitted successfully",
  };
}
