# GHL Calendar API Error Fixes

## Problem 1: 422 Unprocessable Entity (RESOLVED)

The error was a **422 Unprocessable Entity** with validation messages about incorrect parameters.

**Fix Applied**: Updated parameter names from `startDate`/`endDate` to `startTime`/`endTime` and added required `calendarId`.

## Problem 2: 403 Forbidden (RESOLVED)

### Error Details
```json
{
  "statusCode": 403,
  "message": "The token does not have access to this location."
}
```

### Root Cause
The API token requires a specific `locationId` that it has access to. Without the correct location ID, the token cannot access the calendar events.

### Fix Applied

**1. Updated `fetchCalendarEvents` in `calendarApi.js`:**
```javascript
// Added required locationId for token access
params.append('locationId', filters.locationId || 'b7vHWUGVUNQGoIlAXabY');
```

**2. Updated Calendar Component in `CalendarSection.jsx`:**
```javascript
const response = await fetchCalendarEvents({
  calendarId: 'sV3BiXrjzbfo1tSUdyHO',     // Your calendar ID  
  locationId: 'b7vHWUGVUNQGoIlAXabY',      // Required for token access
  startTime: startDate.toISOString(),
  endTime: endDate.toISOString(),
});
```

## Final API Configuration

### Required Parameters
- ✅ `locationId`: `'b7vHWUGVUNQGoIlAXabY'` (for token access)
- ✅ `calendarId`: `'sV3BiXrjzbfo1tSUdyHO'` (your specific calendar)
- ✅ `startTime`: ISO string format
- ✅ `endTime`: ISO string format

### Authentication
- ✅ `Authorization`: `Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f`
- ✅ `Version`: `2021-04-15`

## Expected Result

After both fixes:
1. ✅ No more 422 Unprocessable Entity errors
2. ✅ No more 403 Forbidden errors  
3. ✅ Calendar events should load successfully
4. ✅ Events appear in the calendar interface

## Testing Status

The fixes address both authentication (403) and parameter validation (422) issues. The calendar should now load GHL events without errors.
