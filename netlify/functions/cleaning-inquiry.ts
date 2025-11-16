import type { Handler } from "@netlify/functions";
import { submitCleaningInquiry } from "../../backend/actions.js";
import {
  formErrorResponse,
  methodNotAllowedResponse,
  parseJsonBody,
} from "../../backend/http.js";

const json = (
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
) => ({
  statusCode,
  headers: { "Content-Type": "application/json", ...extraHeaders },
  body: JSON.stringify(body),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    const { status, body } = methodNotAllowedResponse(event.httpMethod, [
      "POST",
    ]);
    return json(status, body, { Allow: "POST" });
  }

  try {
    const payload = parseJsonBody(event.body);
    const response = await submitCleaningInquiry(payload);
    return json(200, response);
  } catch (error) {
    const { status, body } = formErrorResponse(
      error,
      "Failed to process inquiry. Please try again.",
    );
    return json(status, body);
  }
};
