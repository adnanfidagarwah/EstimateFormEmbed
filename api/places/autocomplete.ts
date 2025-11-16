import type { VercelRequest, VercelResponse } from "@vercel/node";
import { methodNotAllowedResponse } from "../../backend/http.js";
import { getAutocompleteSuggestions } from "../../backend/places.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "GET") {
    const { status, body } = methodNotAllowedResponse(req.method, ["GET"]);
    res.setHeader("Allow", "GET");
    return res.status(status).json(body);
  }

  const { input } = req.query;
  if (typeof input !== "string" || !input.trim()) {
    return res.status(400).json({ error: "Input parameter is required" });
  }

  try {
    const payload = await getAutocompleteSuggestions(input);
    return res.status(200).json(payload);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch suggestions";
    return res.status(500).json({ error: message });
  }
}
