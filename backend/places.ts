const GOOGLE_PLACES_BASE_URL =
  "https://maps.googleapis.com/maps/api/place";

function getApiKey(): string {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error("Google Places API key not configured");
  }

  return apiKey;
}

async function requestPlacesApi(
  endpoint: string,
  params: Record<string, string>,
) {
  const url = new URL(`${GOOGLE_PLACES_BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  url.searchParams.set("key", getApiKey());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Google Places API request failed with status ${response.status}`,
    );
  }

  return response.json();
}

export async function getAutocompleteSuggestions(input: string) {
  if (!input.trim()) {
    throw new Error("Input parameter is required");
  }

  return requestPlacesApi("autocomplete/json", {
    input,
    types: "address",
    components: "country:us",
  });
}

export async function getPlaceDetails(placeId: string) {
  if (!placeId.trim()) {
    throw new Error("Place ID parameter is required");
  }

  return requestPlacesApi("details/json", {
    place_id: placeId,
    fields: "address_components",
  });
}
