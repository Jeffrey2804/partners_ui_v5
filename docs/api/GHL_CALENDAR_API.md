# GoHighLevel Calendar Events API

This module provides Node.js functions to fetch calendar events and details from the GoHighLevel API.

## Functions

### `getCalendarDetails`

#### Description
Fetches calendar details from GoHighLevel using the `/calendars/{calendarId}` endpoint.

#### Parameters
- `calendarId` (string) - The ID of the calendar to fetch details for

#### Environment Variables
- `GHL_API_TOKEN` (required) - Your GoHighLevel API token
- `GHL_API_VERSION` (optional) - API version, defaults to '2021-04-15'

#### Returns
Returns a Promise that resolves to the parsed JSON response containing calendar details.

#### Example Usage

```javascript
const { getCalendarDetails } = require('./src/shared/services/api/ghlCalendarService');

async function getMyCalendar() {
  try {
    const calendar = await getCalendarDetails('sV3BiXrjzbfo1tSUdyHO');
    
    console.log('Calendar Name:', calendar.name);
    console.log('Calendar ID:', calendar.id);
    console.log('Timezone:', calendar.timezone);
    console.log('Is Active:', calendar.isActive);
    
    return calendar;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### `getCalendarEvents`

### Description
Fetches booked calendar events from GoHighLevel using the `/calendars/events` endpoint.

### Parameters
- `calendarId` (string) - The ID of the calendar to fetch events from
- `startTime` (string) - Start time in ISO string format (e.g., '2025-08-12T00:00:00Z')
- `endTime` (string) - End time in ISO string format (e.g., '2025-08-13T00:00:00Z')

### Environment Variables
- `GHL_API_TOKEN` (required) - Your GoHighLevel API token
- `GHL_API_VERSION` (optional) - API version, defaults to '2021-04-15'

### Returns
Returns a Promise that resolves to the parsed JSON response from the GoHighLevel API.

### Error Handling
- Throws an error if required parameters are missing or invalid
- Throws an error if `GHL_API_TOKEN` environment variable is not set
- Throws an error for non-200 HTTP responses with detailed error messages
- Handles network errors and JSON parsing errors

### Example Usage

```javascript
const { getCalendarEvents } = require('./src/shared/services/api/ghlCalendarService');

// Basic usage
async function fetchEvents() {
  try {
    const events = await getCalendarEvents(
      'abc123', 
      '2025-08-12T00:00:00Z', 
      '2025-08-13T00:00:00Z'
    );
    
    return events;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Fetch events for current week
async function fetchWeeklyEvents() {
  const now = new Date();
  const startOfWeek = new Date(now);
  const endOfWeek = new Date(now);
  
  // Set to start of week (Monday)
  const dayOfWeek = startOfWeek.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(startOfWeek.getDate() + daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Set to end of week (Sunday)
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  try {
    const events = await getCalendarEvents(
      'your-calendar-id',
      startOfWeek.toISOString(),
      endOfWeek.toISOString()
    );
    
    return events;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### API Request Details

The function makes a GET request to:
```
https://services.leadconnectorhq.com/calendars/events?calendarId={calendarId}&startTime={startTime}&endTime={endTime}
```

With headers:
```
Authorization: Bearer {GHL_API_TOKEN}
Version: {GHL_API_VERSION}
Accept: application/json
```

### Response Format

The API returns a JSON object with the following structure:

```json
{
  "events": [
    {
      "id": "event-id",
      "title": "Event Title",
      "startTime": "2025-08-12T10:00:00Z",
      "endTime": "2025-08-12T11:00:00Z",
      "calendarId": "calendar-id",
      "contactId": "contact-id",
      "contactName": "John Doe",
      "location": "Meeting Room",
      "status": "booked"
    }
  ],
  "total": 1,
  "meta": {
    "currentPage": 1,
    "nextPage": null,
    "prevPage": null,
    "totalPages": 1
  }
}
```

### Error Handling Examples

**Missing API Token:**
```
Error: GHL_API_TOKEN environment variable is required
```

**Invalid Parameters:**
```
Error: calendarId is required and must be a string
Error: startTime is required and must be a string in ISO format
```

**API Errors:**
```
Error: GoHighLevel API request failed: HTTP 401: Unauthorized - Invalid token
Error: GoHighLevel API request failed: HTTP 404: Not Found - Calendar not found
```

**Network Errors:**
```
Error: Network error while calling GoHighLevel API: fetch is not defined
```

### Setup Instructions

1. Set your environment variables:
   ```bash
   export GHL_API_TOKEN="your-api-token-here"
   export GHL_API_VERSION="2021-04-15"  # Optional
   ```

2. Import and use the function:
   ```javascript
   const { getCalendarEvents } = require('./src/shared/services/api/ghlCalendarService');
   ```

3. Call the function with your parameters:
   ```javascript
   const events = await getCalendarEvents(calendarId, startTime, endTime);
   ```
