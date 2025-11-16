import type { VercelRequest, VercelResponse } from "@vercel/node";
import { methodNotAllowedResponse } from "../../backend/http.js";
import { getPlaceDetails } from "../../backend/places.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "GET") {
    const { status, body } = methodNotAllowedResponse(req.method, ["GET"]);
    res.setHeader("Allow", "GET");
    return res.status(status).json(body);
  }

  const { place_id: placeId } = req.query;
  if (typeof placeId !== "string" || !placeId.trim()) {
    return res.status(400).json({ error: "Place ID parameter is required" });
  }

  try {
    const payload = await getPlaceDetails(placeId);
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error fetching place details", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch place details";
    return res.status(500).json({ error: message });
  }
}
