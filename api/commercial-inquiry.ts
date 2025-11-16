import type { VercelRequest, VercelResponse } from "@vercel/node";
import { submitCommercialInquiry } from "../backend/actions.js";
import {
  formErrorResponse,
  methodNotAllowedResponse,
  parseJsonBody,
} from "../backend/http.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    const { status, body } = methodNotAllowedResponse(req.method, ["POST"]);
    res.setHeader("Allow", "POST");
    return res.status(status).json(body);
  }

  try {
    const payload = parseJsonBody(req.body);
    const response = await submitCommercialInquiry(payload);
    return res.status(200).json(response);
  } catch (error) {
    const { status, body } = formErrorResponse(
      error,
      "Failed to process inquiry. Please try again.",
    );
    return res.status(status).json(body);
  }
}
