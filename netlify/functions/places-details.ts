import type { Handler } from "@netlify/functions";
import { methodNotAllowedResponse } from "../../backend/http.js";
import { getPlaceDetails } from "../../backend/places.js";

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

  const placeId = event.queryStringParameters?.place_id?.trim();
  if (!placeId) {
    return json(400, { error: "Place ID parameter is required" });
  }

  try {
    const payload = await getPlaceDetails(placeId);
    return json(200, payload);
  } catch (error) {
    console.error("Error fetching place details", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch place details";
    return json(500, { error: message });
  }
};
