# 📅 Complete Appointment & Event Management API Functions

## 🎯 Overview

This document outlines the comprehensive appointment and event management functions implemented for the GoHighLevel Calendar system. These functions provide full CRUD operations for appointments, calendar events, blocked slots, and bulk operations.

## 🔐 Authentication Configuration

```javascript
Authorization: Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f
Version: 2021-04-15
Default Location ID: b7vHWUGVUNQGoIlAXabY
Default Calendar ID: sV3BiXrjzbfo1tSUdyHO
```

## 📋 Function Index

### 🏥 Appointment Management
1. `createAppointment(appointmentData)` - Create new appointment
2. `updateAppointmentDetails(appointmentId, appointmentData)` - Update appointment
3. `getAppointmentDetails(appointmentId)` - Get appointment details

### 📅 Event Management
4. `getAllCalendarEvents(filters)` - Get all calendar events
5. `deleteCalendarEvent(eventId)` - Delete any event

### 🚫 Blocked Slots Management
6. `getBlockedSlots(filters)` - Get blocked time slots
7. `createBlockedSlot(blockData)` - Create blocked slot
8. `updateBlockedSlot(blockId, blockData)` - Update blocked slot

### 🔄 Bulk Operations
9. `bulkCreateAppointments(appointmentsData)` - Bulk create appointments
10. `bulkDeleteEvents(eventIds)` - Bulk delete events

## 🏗️ Function Details

### 1. Create Appointment

```javascript
import { createAppointment } from './src/shared/services/api/calendarApi.js';

const appointmentData = {
  title: "Doctor Visit",
  contactId: "contact123",
  startTime: "2024-12-15T10:00:00-05:00",
  endTime: "2024-12-15T11:00:00-05:00",
  address: "Clinic Room 1",
  appointmentStatus: "confirmed", // new, confirmed, cancelled, showed, noshow
  meetingLocationType: "physical", // custom, physical, phone, gmeet, zoom
  assignedUserId: "user123",
  ignoreFreeSlotValidation: false,
  toNotify: true,
  rrule: "RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=4", // Optional recurring rule
};

const result = await createAppointment(appointmentData);
```

**Default Configuration:**
```javascript
{
  title: 'New Appointment',
  meetingLocationType: 'custom',
  meetingLocationId: 'default',
  overrideLocationConfig: true,
  appointmentStatus: 'confirmed',
  assignedUserId: '0007BWpSzSwfiuSl0tR2',
  address: 'Virtual Meeting',
  ignoreDateRange: false,
  toNotify: true,
  ignoreFreeSlotValidation: false,
  calendarId: 'sV3BiXrjzbfo1tSUdyHO',
  locationId: 'b7vHWUGVUNQGoIlAXabY',
  contactId: null,
}
```

### 2. Update Appointment Details

```javascript
import { updateAppointmentDetails } from './src/shared/services/api/calendarApi.js';

const appointmentId = "appt_123456";
const updateData = {
  title: "Updated Appointment Title",
  startTime: "2024-12-15T14:00:00-05:00",
  endTime: "2024-12-15T15:00:00-05:00",
  appointmentStatus: "confirmed",
  address: "Updated Location",
};

const result = await updateAppointmentDetails(appointmentId, updateData);
```

### 3. Get Appointment Details

```javascript
import { getAppointmentDetails } from './src/shared/services/api/calendarApi.js';

const appointmentId = "appt_123456";
const result = await getAppointmentDetails(appointmentId);

console.log(result.data); // Complete appointment information
```

### 4. Get All Calendar Events

```javascript
import { getAllCalendarEvents } from './src/shared/services/api/calendarApi.js';

const filters = {
  locationId: 'b7vHWUGVUNQGoIlAXabY', // Optional
  calendarId: 'sV3BiXrjzbfo1tSUdyHO', // Optional
  startTime: '2024-12-01T00:00:00-05:00', // Optional
  endTime: '2024-12-31T23:59:59-05:00', // Optional
  contactId: 'contact123', // Optional
  userId: 'user123', // Optional
};

const result = await getAllCalendarEvents(filters);
console.log(`Found ${result.data.length} events`);
```

### 5. Get Blocked Slots

```javascript
import { getBlockedSlots } from './src/shared/services/api/calendarApi.js';

const filters = {
  locationId: 'b7vHWUGVUNQGoIlAXabY', // Optional
  calendarId: 'sV3BiXrjzbfo1tSUdyHO', // Optional
  startTime: '2024-12-01T00:00:00-05:00', // Optional
  endTime: '2024-12-31T23:59:59-05:00', // Optional
};

const result = await getBlockedSlots(filters);
console.log(`Found ${result.data.length} blocked slots`);
```

### 6. Create Blocked Slot

```javascript
import { createBlockedSlot } from './src/shared/services/api/calendarApi.js';

const blockData = {
  title: "Lunch Break",
  startTime: "2024-12-15T12:00:00-05:00",
  endTime: "2024-12-15T13:00:00-05:00",
  calendarId: "sV3BiXrjzbfo1tSUdyHO",
  assignedUserId: "user123",
  locationId: "b7vHWUGVUNQGoIlAXabY",
};

const result = await createBlockedSlot(blockData);
```

### 7. Update Blocked Slot

```javascript
import { updateBlockedSlot } from './src/shared/services/api/calendarApi.js';

const blockId = "block_123456";
const updateData = {
  title: "Extended Break",
  startTime: "2024-12-15T12:00:00-05:00",
  endTime: "2024-12-15T14:00:00-05:00",
};

const result = await updateBlockedSlot(blockId, updateData);
```

### 8. Delete Calendar Event

```javascript
import { deleteCalendarEvent } from './src/shared/services/api/calendarApi.js';

const eventId = "event_123456"; // Works for appointments or blocked slots
const result = await deleteCalendarEvent(eventId);

if (result.success) {
  console.log(`Event ${eventId} deleted successfully`);
}
```

### 9. Bulk Create Appointments

```javascript
import { bulkCreateAppointments } from './src/shared/services/api/calendarApi.js';

const appointmentsData = [
  {
    title: "Appointment 1",
    contactId: "contact1",
    startTime: "2024-12-15T10:00:00-05:00",
    endTime: "2024-12-15T11:00:00-05:00",
  },
  {
    title: "Appointment 2",
    contactId: "contact2",
    startTime: "2024-12-15T11:00:00-05:00",
    endTime: "2024-12-15T12:00:00-05:00",
  },
];

const result = await bulkCreateAppointments(appointmentsData);
console.log(`Created: ${result.data.successful}, Failed: ${result.data.failed}`);
```

### 10. Bulk Delete Events

```javascript
import { bulkDeleteEvents } from './src/shared/services/api/calendarApi.js';

const eventIds = ["event1", "event2", "event3"];
const result = await bulkDeleteEvents(eventIds);

console.log(`Deleted: ${result.data.successful}, Failed: ${result.data.failed}`);
```

## 🔧 Configuration Parameters

### Appointment Status Options
- `new` - New appointment
- `confirmed` - Confirmed appointment
- `cancelled` - Cancelled appointment
- `showed` - Client showed up
- `noshow` - Client no-show

### Meeting Location Types
- `custom` - Custom location
- `physical` - Physical address
- `phone` - Phone call
- `gmeet` - Google Meet
- `zoom` - Zoom meeting

### RRULE (Recurring Rules) Examples
```javascript
// Daily for 5 days
"RRULE:FREQ=DAILY;INTERVAL=1;COUNT=5"

// Weekly for 4 weeks
"RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=4"

// Monthly for 6 months
"RRULE:FREQ=MONTHLY;INTERVAL=1;COUNT=6"

// Every weekday for 2 weeks
"RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=10;BYDAY=MO,TU,WE,TH,FR"
```

## 📊 Response Format

All functions return a standardized response format:

```javascript
{
  success: boolean,
  data: any, // API response data
  error?: string, // Error message if failed
  meta: {
    // Additional metadata like timestamps, counts, etc.
    requestTimestamp: string,
    // Function-specific metadata
  }
}
```

## 🚨 Error Handling

All functions include comprehensive error handling:

```javascript
const result = await createAppointment(appointmentData);

if (!result.success) {
  console.error('Appointment creation failed:', result.error);
  // Handle error appropriately
} else {
  console.log('Appointment created:', result.data);
  // Process success
}
```

## 🔍 Common Use Cases

### Schedule a Recurring Weekly Appointment
```javascript
const weeklyAppointment = await createAppointment({
  title: "Weekly Therapy Session",
  contactId: "patient123",
  startTime: "2024-12-15T15:00:00-05:00",
  endTime: "2024-12-15T16:00:00-05:00",
  rrule: "RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=8",
  appointmentStatus: "confirmed",
});
```

### Block Multiple Time Slots for Vacation
```javascript
const vacationDays = [
  { startTime: "2024-12-20T00:00:00-05:00", endTime: "2024-12-20T23:59:59-05:00" },
  { startTime: "2024-12-21T00:00:00-05:00", endTime: "2024-12-21T23:59:59-05:00" },
  { startTime: "2024-12-22T00:00:00-05:00", endTime: "2024-12-22T23:59:59-05:00" },
];

const blocks = vacationDays.map(day => createBlockedSlot({
  title: "Vacation - Out of Office",
  ...day,
}));

const results = await Promise.all(blocks);
```

### Get Today's Schedule
```javascript
const today = new Date();
const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

const todaysEvents = await getAllCalendarEvents({
  startTime: startOfDay,
  endTime: endOfDay,
});
```

## ⚠️ Important Notes

1. **Time Format**: Always use ISO 8601 format with timezone
2. **Required Fields**: `startTime` and `endTime` are required for appointments and blocks
3. **Authentication**: Bearer token is automatically included
4. **Rate Limiting**: Be mindful of API rate limits for bulk operations
5. **Error Recovery**: Functions include automatic error recovery and logging
6. **Date Validation**: All date inputs are automatically validated and formatted

## 🎉 Success!

You now have a complete appointment and event management system with:
- ✅ Full CRUD operations for appointments
- ✅ Complete blocked slots management  
- ✅ Bulk operations for efficiency
- ✅ Comprehensive error handling
- ✅ Detailed logging and debugging
- ✅ Production-ready configuration
