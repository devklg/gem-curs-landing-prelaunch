# Talk Fusion Project Workflow

## Frontend Routes & Pages
- [x] Landing Page (`/`)
  - Header with company branding
  - Hero section with main CTA
  - Video showcase
  - Benefits section
  - Features overview
  - Call to action buttons

- [x] Pre-Enrollment Form (`/join`)
  - Personal information fields
  - Package selection
  - Sponsor information
  - Form validation
  - Success/error handling

- [x] Thank You Page (`/thank-you`)
  - Confirmation message
  - Next steps information
  - Support contact details

- [x] Error/404 Page (`*`)
  - Redirect to landing page

## Backend API Endpoints
- [x] Pre-Enrollment (`POST /api/enrollment/pre-enroll`)
  - Accepts:
    ```json
    {
      "name": "string",
      "email": "string",
      "enrollerId": "string" (optional)
    }
    ```
  - Returns:
    ```json
    {
      "success": true,
      "token": "string",
      "message": "string"
    }
    ```

## User Flow
1. User lands on homepage
2. Views company information and videos
3. Clicks "Join the Opportunity" or "Reserve Your Spot"
4. Redirected to pre-enrollment form
5. Fills out personal information
6. Submits form
7. Receives confirmation
8. Redirected to thank you page

## Technical Flow
1. Frontend collects form data
2. Validates input
3. Sends POST request to `/api/enrollment/pre-enroll`
4. Backend processes enrollment:
   - Validates data
   - Generates password
   - Creates user record
   - Returns success/error
5. Frontend handles response:
   - Stores token if successful
   - Shows error if failed
   - Redirects on success

## Authentication Flow
1. Token generated on successful enrollment
2. Token stored in localStorage
3. Token used for subsequent authenticated requests
4. Token validation on protected routes 