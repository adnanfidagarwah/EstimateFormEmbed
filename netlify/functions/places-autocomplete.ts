import type { Handler } from "@netlify/functions";
import { methodNotAllowedResponse } from "../../backend/http";
import { getAutocompleteSuggestions } from "../../backend/places";

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
  if (event.httpMethod !== "GET") {
    const { status, body } = methodNotAllowedResponse(event.httpMethod, [
      "GET",
    ]);
    return json(status, body, { Allow: "GET" });
  }

  const input = event.queryStringParameters?.input?.trim();
  if (!input) {
    return json(400, { error: "Input parameter is required" });
  }

  try {
    const payload = await getAutocompleteSuggestions(input);
    return json(200, payload);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch suggestions";
    return json(500, { error: message });
  }
};
