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

  const httpServer = createServer(app);

  return httpServer;
}
