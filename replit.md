# Cleaning Service Inquiry Form

## Overview
A fully responsive multi-step cleaning service inquiry form with a modern purple and white theme. The application collects detailed information about residential and commercial cleaning requests and sends formatted emails via SMTP.

## Features
- **7-Step Residential Form**: Progressive multi-step form with validation
  1. Property Type Selection (Single Family, Townhouse/Condo, Apartment, Commercial)
  2. Property Address Entry (Street, City, State, ZIP)
  3. Cleaning Type Selection (Standard, Deep, Move-In/Move-Out)
  4. Home Condition Assessment (4 levels + clutter slider 1-10)
  5. Add-On Services Selection (8 options + custom requests)
  6. Scheduling Preferences (Date, Time, Pets, Recurring options)
  7. Contact Information (Name, Phone, Email, Referral, Privacy consent)

- **Commercial Form**: Simplified contact form for commercial inquiries
- **Email Notifications**: Formatted HTML emails sent via SMTP
- **Success/Error Pages**: User-friendly feedback pages
- **Form Validation**: Client-side and server-side validation with clear error messages
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop

## Tech Stack
### Frontend
- React with TypeScript
- Wouter for routing
- React Hook Form with Zod validation
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling

### Backend
- Express.js
- Nodemailer for SMTP email delivery
- Zod for schema validation

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ProgressIndicator.tsx    # Step progress bar
│   │   ├── FormStep.tsx              # Step wrapper component
│   │   ├── PropertyTypeCard.tsx      # Property type selection cards
│   │   ├── CleaningTypeOption.tsx    # Cleaning type radio options
│   │   └── ConditionLevel.tsx        # Condition level selector
│   ├── pages/
│   │   ├── CleaningInquiryForm.tsx   # Main 7-step form
│   │   ├── CommercialForm.tsx        # Commercial inquiry form
│   │   ├── SuccessPage.tsx           # Success confirmation
│   │   └── ErrorPage.tsx             # Error feedback
│   └── App.tsx                        # Router setup
server/
├── routes.ts                          # API endpoints
└── email.ts                           # Email formatting & sending
shared/
└── schema.ts                          # Zod schemas & TypeScript types
```

## Environment Variables
Required SMTP credentials:
- `SMTP_HOST`: Email server hostname
- `SMTP_PORT`: Email server port (587 or 465)
- `SMTP_USER`: Email username
- `SMTP_PASS`: Email password or app-specific password
- `RECIPIENT_EMAIL`: Where to send inquiry emails

## API Endpoints
- `POST /api/cleaning-inquiry`: Submit residential cleaning inquiry
- `POST /api/commercial-inquiry`: Submit commercial cleaning inquiry

## Design System
### Colors
- Primary: Purple (#8b5cf6) - Used for buttons, progress, accents
- Background: White/Light gray for clean look
- Text: Dark gray with proper hierarchy (foreground, muted, tertiary)

### Typography
- Font: Inter (clean, modern sans-serif)
- Hierarchy: Bold headings, medium labels, regular body text

### Components
- Cards with subtle borders and hover effects
- Purple accent buttons with elevation interactions
- Smooth transitions between form steps
- Clear validation error messages in red

## Form Validation Rules
- All fields marked with * are required
- Email must be valid format
- Phone number required
- Privacy policy agreement required to submit
- Referral name required if "referred by someone" is Yes
- Date must be in the future
- Conditional validation based on user selections

## Recent Changes (November 10, 2025)
- Implemented complete 7-step cleaning inquiry form
- Added commercial inquiry redirect and form
- Integrated SMTP email delivery with formatted HTML templates
- Added conditional validation for referral name
- Disabled navigation buttons during form submission
- Created success and error feedback pages
- Configured purple/white design theme with Inter font
