import type { Express } from "express";
import { createServer, type Server } from "http";
import { cleaningInquirySchema, commercialInquirySchema } from "@shared/schema";
import { sendCleaningInquiryEmail, sendCommercialInquiryEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cleaning Inquiry Endpoint
  app.post("/api/cleaning-inquiry", async (req, res) => {
    try {
      // Validate request body
      const validatedData = cleaningInquirySchema.parse(req.body);

      // Send email
      await sendCleaningInquiryEmail(validatedData);

      res.status(200).json({
        success: true,
        message: "Cleaning inquiry submitted successfully",
      });
    } catch (error) {
      console.error("Error processing cleaning inquiry:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to process inquiry. Please try again.",
        });
      }
    }
  });

  // Commercial Inquiry Endpoint
  app.post("/api/commercial-inquiry", async (req, res) => {
    try {
      // Validate request body
      const validatedData = commercialInquirySchema.parse(req.body);

      // Send email
      await sendCommercialInquiryEmail(validatedData);

      res.status(200).json({
        success: true,
        message: "Commercial inquiry submitted successfully",
      });
    } catch (error) {
      console.error("Error processing commercial inquiry:", error);
      
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to process inquiry. Please try again.",
        });
      }
    }
  });

  // Google Places Autocomplete Endpoint
  app.get("/api/places/autocomplete", async (req, res) => {
    try {
      const { input } = req.query;
      
      if (!input || typeof input !== "string") {
        return res.status(400).json({ error: "Input parameter is required" });
      }

      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Google Places API key not configured" });
      }

      const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json");
      url.searchParams.append("input", input);
      url.searchParams.append("types", "address");
      url.searchParams.append("components", "country:us");
      url.searchParams.append("key", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });

  // Google Places Details Endpoint
  app.get("/api/places/details", async (req, res) => {
    try {
      const { place_id } = req.query;
      
      if (!place_id || typeof place_id !== "string") {
        return res.status(400).json({ error: "Place ID parameter is required" });
      }

      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Google Places API key not configured" });
      }

      const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
      url.searchParams.append("place_id", place_id);
      url.searchParams.append("fields", "address_components");
      url.searchParams.append("key", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error("Error fetching place details:", error);
      res.status(500).json({ error: "Failed to fetch place details" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
