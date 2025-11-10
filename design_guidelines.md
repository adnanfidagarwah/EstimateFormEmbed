# Design Guidelines: Multi-Step Cleaning Service Inquiry Form

## Design Approach
**User-Specified Design**: Follow the provided mockups and detailed specifications exactly. This is a purple-themed, clean residential cleaning service form with specific branding requirements.

## Core Design Elements

### Typography
- **Headers**: Large, bold sans-serif for main headlines ("We create tailored cleaning solutions for you")
- **Subheaders**: Medium weight for supporting text ("The industry's most trusted cleaning expert", "Live Agents — Free Estimates")
- **Form Labels**: Clear, readable sans-serif in medium-dark gray
- **Body Text**: Regular weight for descriptions and help text
- **Note Text**: Smaller, lighter for helper text like "This helps us estimate time and price. No judgment."

### Color Palette
- **Primary Purple**: Use for buttons, active states, progress indicators, and key accents
- **White/Off-white**: Primary background
- **Light Gray**: Form field backgrounds, borders
- **Dark Gray/Black**: Text content
- **Minimal shadows**: Subtle elevation only where necessary

### Layout System
- **Spacing**: Use Tailwind units of 2, 4, 6, and 8 for consistent spacing (p-4, m-6, gap-8)
- **Form Container**: Centered, max-width container (max-w-2xl to max-w-3xl)
- **Step Container**: Each step should feel spacious with generous padding
- **Mobile-First**: Stack all elements vertically on mobile, expand to optimal layouts on desktop

### Component Library

#### Progress Indicator
- Linear progress bar or numbered step circles across the top
- Show current step highlighted in purple, completed steps indicated, upcoming steps muted
- Always visible and sticky

#### Form Fields
- **Text Inputs**: Bordered rectangles with clear labels above, rounded corners (rounded-md)
- **Radio Buttons**: Large, easy-to-tap options with descriptive labels, custom purple styling when selected
- **Checkboxes**: Standard size with purple accent when checked
- **Range Slider**: Modern slider for clutter level (1-10) with numeric display
- **Date Picker**: Calendar interface, restrict to future dates only
- **Textarea**: Multi-line input for custom requests, adequate height (min h-32)

#### Buttons
- **Primary CTA**: Purple background, white text, rounded corners, full-width or prominent positioning
- **Navigation**: "Next" and "Back" buttons clearly visible, "Next" in purple, "Back" as ghost/outline
- **Submit Button**: Prominent purple button labeled "Submit Application"

#### Address Autocomplete (Step 2)
- Google Places integration with dropdown suggestions
- Auto-populate City, State, Zip when address selected
- Clear visual feedback during search

#### Selections
- **Property Type Cards**: Large, tappable cards/buttons with icons for each residential type
- **Commercial Redirect**: Clearly distinguished option that leads to simplified form
- **Cleaning Type**: Radio selection with clear visual differentiation
- **Condition Levels**: 4-level radio selection (Level 1-4) with descriptive text
- **Time Slots**: Radio buttons for Morning/Afternoon with time ranges displayed

#### Add-Ons Section (Step 5)
- Checkbox grid or list layout with:
  - Interior Oven
  - Interior Fridge
  - Dishes
  - Interior Windows
  - Baseboards
  - Wall Spot Cleaning
  - Patio/Balcony
  - Pet Hair Removal
- Each with clear label and optional icon
- Followed by textarea for specific requests

#### Contact Form (Step 7)
- Two-column layout for First/Last Name on desktop
- Full-width fields for Phone, Email
- Conditional field for referral name (shows when "Yes" selected)
- Checkbox group for contact preferences (Text/Call/Email/No Preference)
- Newsletter opt-in checkbox
- Required Privacy Policy agreement checkbox

### Validation & Feedback
- Inline validation messages in red below fields
- Disable "Next" button until current step is valid
- Smooth transitions between steps (fade or slide)
- Loading state during submission
- Success message: "Thank you! Your tailored cleaning solution request has been submitted. A live agent will contact you shortly."
- Error state with friendly message

### Responsive Behavior
- **Mobile (base)**: Single column, full-width elements, larger tap targets
- **Tablet (md)**: Optimized two-column layouts where appropriate
- **Desktop (lg)**: Max-width centered form, optimal reading and interaction width

### Images
No hero images required. This is a functional multi-step form focused on data collection. Use icons sparingly for property types and add-on services if they enhance clarity.

### Animations
- Minimal: Smooth step transitions (300ms ease)
- Progress bar fill animation
- Button hover/active states (subtle)
- No distracting or decorative animations

### Key UX Principles
1. **One thing per step**: Each step should feel focused and unintimidating
2. **Clear progress**: User always knows where they are in the process
3. **No dead ends**: Always provide clear next action
4. **Reassuring messaging**: Help text like "No judgment" reduces anxiety
5. **Smart defaults**: Auto-fill where possible (address fields)
6. **Flexible inputs**: Allow "Any" or "No Preference" options where appropriate