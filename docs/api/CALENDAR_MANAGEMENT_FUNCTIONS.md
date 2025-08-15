# 🎯 Calendar Management Functions - Complete Implementation

## 📋 Overview

Based on the provided cURL commands, I've implemented a comprehensive set of calendar management functions that provide full CRUD operations for GoHighLevel calendars. These functions handle all aspects of calendar management including creation, reading, updating, and deletion.

## 🚀 Available Functions

### 1. **📅 fetchCalendarFreeSlots**
Gets available time slots for a specific calendar.

```javascript
import { fetchCalendarFreeSlots } from '@shared/services/api/calendarApi';

const result = await fetchCalendarFreeSlots('sV3BiXrjzbfo1tSUdyHO', {
  startDate: '2025-08-12',
  endDate: '2025-08-19',
  timezone: 'America/New_York'
});
```

**cURL Equivalent:**
```bash
curl --request GET \
  --url https://services.leadconnectorhq.com/calendars/sV3BiXrjzbfo1tSUdyHO/free-slots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Version: 2021-04-15'
```

---

### 2. **📋 fetchCalendarDetails**
Gets detailed information about a specific calendar.

```javascript
import { fetchCalendarDetails } from '@shared/services/api/calendarApi';

const result = await fetchCalendarDetails('sV3BiXrjzbfo1tSUdyHO');

if (result.success) {
  console.log(`Calendar Name: ${result.data.name}`);
  console.log(`Slot Duration: ${result.data.slotDuration} ${result.data.slotDurationUnit}`);
  console.log(`Auto Confirm: ${result.data.autoConfirm}`);
}
```

**cURL Equivalent:**
```bash
curl --request GET \
  --url https://services.leadconnectorhq.com/calendars/sV3BiXrjzbfo1tSUdyHO \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Version: 2021-04-15'
```

---

### 3. **➕ createCalendar**
Creates a new calendar with specified configuration.

```javascript
import { createCalendar } from '@shared/services/api/calendarApi';

const calendarData = {
  name: 'New Meeting Calendar',
  description: 'Calendar for client meetings',
  eventColor: '#4caf50',
  slotDuration: 60,
  slotDurationUnit: 'mins',
  autoConfirm: true,
  allowReschedule: true,
  allowCancellation: true,
  openHours: [
    {
      daysOfTheWeek: [1, 2, 3, 4, 5], // Monday to Friday
      hours: [{
        openHour: 9,
        openMinute: 0,
        closeHour: 17,
        closeMinute: 0
      }]
    }
  ]
};

const result = await createCalendar(calendarData);
```

**cURL Equivalent:**
```bash
curl --request POST \
  --url https://services.leadconnectorhq.com/calendars/ \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Content-Type: application/json' \
  --header 'Version: 2021-04-15' \
  --data '{ ... calendar configuration ... }'
```

---

### 4. **📝 updateCalendarConfiguration**
Updates an existing calendar's configuration.

```javascript
import { updateCalendarConfiguration } from '@shared/services/api/calendarApi';

const updates = {
  name: 'Updated Calendar Name',
  eventColor: '#ff6b35',
  slotDuration: 45,
  autoConfirm: false,
  allowBookingFor: 30,
  allowBookingForUnit: 'days'
};

const result = await updateCalendarConfiguration('sV3BiXrjzbfo1tSUdyHO', updates);
```

**cURL Equivalent:**
```bash
curl --request PUT \
  --url https://services.leadconnectorhq.com/calendars/sV3BiXrjzbfo1tSUdyHO \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Content-Type: application/json' \
  --header 'Version: 2021-04-15' \
  --data '{ ... update data ... }'
```

---

### 5. **🗑️ deleteCalendar**
Permanently removes a calendar from the system.

```javascript
import { deleteCalendar } from '@shared/services/api/calendarApi';

const result = await deleteCalendar('calendar-id-to-delete');

if (result.success) {
  console.log('Calendar deleted successfully');
}
```

**⚠️ WARNING:** This operation is irreversible!

**cURL Equivalent:**
```bash
curl --request DELETE \
  --url https://services.leadconnectorhq.com/calendars/sV3BiXrjzbfo1tSUdyHO \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Version: 2021-04-15'
```

---

### 6. **📚 fetchAllCalendarsWithDetails**
Gets all calendars with optional detailed information.

```javascript
import { fetchAllCalendarsWithDetails } from '@shared/services/api/calendarApi';

// Basic list
const basicResult = await fetchAllCalendarsWithDetails({ includeDetails: false });

// With detailed information for each calendar
const detailedResult = await fetchAllCalendarsWithDetails({ includeDetails: true });
```

**cURL Equivalent:**
```bash
curl --request GET \
  --url 'https://services.leadconnectorhq.com/calendars/?locationId=b7vHWUGVUNQGoIlAXabY' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f' \
  --header 'Version: 2021-04-15'
```

---

## 🔧 Configuration Parameters

### Calendar Creation/Update Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `name` | string | Calendar display name | `"Client Meetings"` |
| `description` | string | Calendar description | `"For scheduling client meetings"` |
| `eventColor` | string | Event color (hex) | `"#4caf50"` |
| `slotDuration` | number | Slot duration | `30` |
| `slotDurationUnit` | string | Duration unit | `"mins"` |
| `autoConfirm` | boolean | Auto-confirm bookings | `true` |
| `allowReschedule` | boolean | Allow rescheduling | `true` |
| `allowCancellation` | boolean | Allow cancellation | `true` |
| `openHours` | array | Available hours | See example above |

### Open Hours Configuration

```javascript
openHours: [
  {
    daysOfTheWeek: [1, 2, 3, 4, 5], // 0=Sunday, 1=Monday, ..., 6=Saturday
    hours: [
      {
        openHour: 9,    // 9 AM
        openMinute: 0,  // :00
        closeHour: 17,  // 5 PM  
        closeMinute: 0  // :00
      }
    ]
  }
]
```

## 📊 Response Format

All functions return a standardized response:

```javascript
{
  success: boolean,
  data: object|array|null,
  error?: string,
  meta?: {
    calendarId?: string,
    requestTimestamp: string,
    // ... additional metadata
  }
}
```

### Success Response Example:
```javascript
{
  success: true,
  data: {
    id: "sV3BiXrjzbfo1tSUdyHO",
    name: "My Calendar",
    eventColor: "#4caf50",
    slotDuration: 30,
    // ... more calendar properties
  },
  meta: {
    calendarId: "sV3BiXrjzbfo1tSUdyHO",
    requestTimestamp: "2025-08-12T00:00:00.000Z"
  }
}
```

### Error Response Example:
```javascript
{
  success: false,
  error: "HTTP error! Status: 404 - Calendar not found",
  data: null
}
```

## 🛠️ Usage Examples

### Example 1: Complete Calendar Management Workflow

```javascript
import {
  createCalendar,
  fetchCalendarDetails,
  updateCalendarConfiguration,
  fetchCalendarFreeSlots,
  deleteCalendar
} from '@shared/services/api/calendarApi';

async function manageCalendar() {
  // 1. Create a new calendar
  const newCalendar = await createCalendar({
    name: 'Product Demo Calendar',
    slotDuration: 30,
    eventColor: '#2196f3',
    autoConfirm: true
  });

  if (!newCalendar.success) {
    console.error('Failed to create calendar:', newCalendar.error);
    return;
  }

  const calendarId = newCalendar.data.id;
  console.log(`Created calendar: ${calendarId}`);

  // 2. Fetch calendar details
  const details = await fetchCalendarDetails(calendarId);
  console.log(`Calendar name: ${details.data.name}`);

  // 3. Update calendar configuration
  const updated = await updateCalendarConfiguration(calendarId, {
    name: 'Updated Product Demo Calendar',
    eventColor: '#4caf50'
  });

  // 4. Get available slots
  const slots = await fetchCalendarFreeSlots(calendarId, {
    startDate: '2025-08-12',
    endDate: '2025-08-19'
  });
  
  console.log(`Available slots: ${slots.data.length}`);

  // 5. Delete calendar (optional)
  // const deleted = await deleteCalendar(calendarId);
}
```

### Example 2: Bulk Calendar Operations

```javascript
import { fetchAllCalendarsWithDetails, updateCalendarConfiguration } from '@shared/services/api/calendarApi';

async function updateAllCalendarColors() {
  // Get all calendars
  const allCalendars = await fetchAllCalendarsWithDetails({ includeDetails: true });
  
  if (!allCalendars.success) {
    console.error('Failed to fetch calendars');
    return;
  }

  // Update each calendar's color
  for (const calendar of allCalendars.data) {
    await updateCalendarConfiguration(calendar.id, {
      eventColor: '#ff9800' // Orange color for all calendars
    });
    console.log(`Updated calendar: ${calendar.name}`);
  }
}
```

## 🔐 Authentication

All functions use the provided Bearer token:
- **Token:** `pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f`
- **Version:** `2021-04-15`
- **Location ID:** `b7vHWUGVUNQGoIlAXabY`

## 🚨 Important Notes

1. **Calendar Deletion:** The `deleteCalendar` function permanently removes calendars. Use with caution!
2. **Rate Limits:** Be mindful of API rate limits when making bulk operations
3. **Error Handling:** Always check the `success` field before using `data`
4. **Location ID:** All operations are scoped to the configured location ID
5. **Team Members:** Calendar configurations require valid user IDs for team members

## 📝 Integration with Existing System

These functions integrate seamlessly with your existing calendar system:

```javascript
// Import in your components
import { 
  fetchCalendarFreeSlots, 
  createCalendar 
} from '@shared/services/api/calendarApi';

// Use in React components
const CalendarManager = () => {
  const [calendars, setCalendars] = useState([]);
  
  const handleCreateCalendar = async (calendarData) => {
    const result = await createCalendar(calendarData);
    if (result.success) {
      setCalendars([...calendars, result.data]);
    }
  };

  // ... rest of component
};
```

---

## ✅ Status: **COMPLETE**

All 6 cURL commands have been successfully implemented as JavaScript functions with:
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Proper error handling and logging
- ✅ Standardized response format
- ✅ Comprehensive documentation
- ✅ Usage examples and integration guides
- ✅ TypeScript-friendly parameter definitions
