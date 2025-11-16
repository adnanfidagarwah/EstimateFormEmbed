import nodemailer from "nodemailer";
import type {
  CleaningInquiry,
  CommercialInquiry,
} from "../shared/schema.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatCleaningInquiryEmail(data: CleaningInquiry): string {
  const propertyTypeLabels = {
    single_family: "Single Family",
    townhouse_condo: "Townhouse / Condo",
    apartment: "Apartment",
    commercial: "Commercial",
  };

  const cleaningTypeLabels = {
    standard: "Standard Cleaning",
    deep: "Deep Cleaning",
    move_in_out: "Move-In / Move-Out",
  };

  const conditionLabels = {
    level_1: "Level 1 - Light",
    level_2: "Level 2 - Moderate",
    level_3: "Level 3 - Heavy",
    level_4: "Level 4 - Very Heavy",
  };

  const timeLabels = {
    morning: "Morning (8am-12pm)",
    afternoon: "Afternoon (12pm-4pm)",
  };

  const recurringLabels = {
    one_time: "One-Time",
    weekly: "Weekly",
    bi_weekly: "Bi-Weekly",
    monthly: "Monthly",
  };

  const contactLabels = {
    text: "Text",
    call: "Call",
    email: "Email",
    no_preference: "No Preference",
  };

  const addOnsSelected = Object.entries(data.addOns)
    .filter(([, value]) => value)
    .map(([key]) => {
      const labels: Record<string, string> = {
        interiorOven: "Interior Oven",
        interiorFridge: "Interior Fridge",
        dishes: "Dishes",
        interiorWindows: "Interior Windows",
        baseboards: "Baseboards",
        wallSpotCleaning: "Wall Spot Cleaning",
        patioBalcony: "Patio / Balcony",
        petHairRemoval: "Pet Hair Removal",
      };
      return labels[key] || key;
    });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section h2 {
      color: #8b5cf6;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 18px;
      border-bottom: 2px solid #8b5cf6;
      padding-bottom: 8px;
    }
    .field {
      margin-bottom: 12px;
    }
    .field strong {
      color: #374151;
      display: inline-block;
      min-width: 180px;
    }
    .add-ons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }
    .add-on-tag {
      background: #8b5cf6;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">NEW Cleaning Quote Request</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">${propertyTypeLabels[data.propertyType]} — ${data.city}</p>
  </div>

  <div class="section">
    <h2>I. CUSTOMER INFO</h2>
    <div class="field"><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
    <div class="field"><strong>Phone:</strong> ${data.phone}</div>
    <div class="field"><strong>Email:</strong> ${data.email}</div>
    <div class="field"><strong>Preferred Contact:</strong> ${contactLabels[data.preferredContact]}</div>
    ${data.hasReferral && data.referralName ? `<div class="field"><strong>Referred By:</strong> ${data.referralName}</div>` : ''}
    <div class="field"><strong>Newsletter:</strong> ${data.newsletterOptIn ? 'Yes' : 'No'}</div>
  </div>

  <div class="section">
    <h2>II. PROPERTY DETAILS</h2>
    <div class="field"><strong>Type:</strong> ${propertyTypeLabels[data.propertyType]}</div>
    <div class="field"><strong>Address:</strong> ${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}</div>
    <div class="field"><strong>Cleaning Type:</strong> ${cleaningTypeLabels[data.cleaningType]}</div>
  </div>

  <div class="section">
    <h2>III. CONDITION & ADD-ONS</h2>
    <div class="field"><strong>Home Condition:</strong> ${conditionLabels[data.homeCondition]}</div>
    <div class="field"><strong>Clutter Level:</strong> ${data.clutterLevel}/10</div>
    ${addOnsSelected.length > 0 ? `
      <div class="field">
        <strong>Selected Add-Ons:</strong>
        <div class="add-ons">
          ${addOnsSelected.map(addon => `<span class="add-on-tag">${addon}</span>`).join('')}
        </div>
      </div>
    ` : '<div class="field"><strong>Selected Add-Ons:</strong> None</div>'}
    ${data.specificRequests ? `<div class="field"><strong>Specific Requests:</strong><br>${data.specificRequests}</div>` : ''}
  </div>

  <div class="section">
    <h2>IV. SCHEDULING</h2>
    <div class="field"><strong>Preferred Date:</strong> ${data.preferredDate}</div>
    <div class="field"><strong>Preferred Time:</strong> ${timeLabels[data.preferredTime]}</div>
    <div class="field"><strong>Pets:</strong> ${data.hasPets ? 'Yes' : 'No'}</div>
    <div class="field"><strong>Recurring:</strong> ${recurringLabels[data.recurringBasis]}</div>
  </div>
</body>
</html>
  `;
}

function formatCommercialInquiryEmail(data: CommercialInquiry): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
      color: white;
      padding: 30px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .section {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section h2 {
      color: #8b5cf6;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 18px;
      border-bottom: 2px solid #8b5cf6;
      padding-bottom: 8px;
    }
    .field {
      margin-bottom: 12px;
    }
    .field strong {
      color: #374151;
      display: inline-block;
      min-width: 150px;
    }
    .message {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      padding: 15px;
      margin-top: 10px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">NEW Commercial Cleaning Inquiry</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">${data.companyName}</p>
  </div>

  <div class="section">
    <h2>CONTACT INFORMATION</h2>
    <div class="field"><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
    <div class="field"><strong>Company:</strong> ${data.companyName}</div>
    <div class="field"><strong>Phone:</strong> ${data.phone}</div>
    <div class="field"><strong>Email:</strong> ${data.email}</div>
  </div>

  <div class="section">
    <h2>MESSAGE</h2>
    <div class="message">${data.message}</div>
  </div>
</body>
</html>
  `;
}

export async function sendCleaningInquiryEmail(data: CleaningInquiry) {
  const htmlContent = formatCleaningInquiryEmail(data);
  
  await transporter.sendMail({
    from: `"Cleaning Service" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `NEW Cleaning Quote Request: ${data.propertyType.replace(/_/g, ' ')} — ${data.city}`,
    html: htmlContent,
  });
}

export async function sendCommercialInquiryEmail(data: CommercialInquiry) {
  const htmlContent = formatCommercialInquiryEmail(data);
  
  await transporter.sendMail({
    from: `"Cleaning Service" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `NEW Commercial Cleaning Inquiry: ${data.companyName}`,
    html: htmlContent,
  });
}
