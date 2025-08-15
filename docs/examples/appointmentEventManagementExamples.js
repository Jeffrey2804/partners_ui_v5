/**
 * 📅 Comprehensive Appointment & Event Management Examples
 *
 * This file demonstrates practical usage of all appointment and event management functions
 * including appointments, blocked slots, bulk operations, and real-world scenarios.
 */

import {
  createAppointment,
  updateAppointmentDetails,
  getAppointmentDetails,
  getAllCalendarEvents,
  getBlockedSlots,
  createBlockedSlot,
  updateBlockedSlot,
  deleteCalendarEvent,
  bulkCreateAppointments,
  bulkDeleteEvents,
} from '../src/shared/services/api/calendarApi.js';

// ============================================================================
// 🏥 APPOINTMENT MANAGEMENT EXAMPLES
// ============================================================================

/**
 * Example 1: Create a Standard Appointment
 */
export const createStandardAppointmentExample = async () => {
  console.log('📅 Creating standard appointment...');

  const appointmentData = {
    title: 'Dental Checkup',
    contactId: 'contact_123456',
    startTime: new Date('2024-12-15T10:00:00-05:00'),
    endTime: new Date('2024-12-15T11:00:00-05:00'),
    address: 'Dental Clinic Room 3',
    appointmentStatus: 'confirmed',
    meetingLocationType: 'physical',
    assignedUserId: 'dentist_001',
    toNotify: true,
    ignoreFreeSlotValidation: false,
  };

  try {
    const result = await createAppointment(appointmentData);

    if (result.success) {
      console.log('✅ Appointment created successfully!');
      console.log(`Appointment ID: ${result.data.id}`);
      console.log(`Title: ${result.data.title}`);
      return result.data.id;
    } else {
      console.error('❌ Failed to create appointment:', result.error);
    }
  } catch (error) {
    console.error('❌ Error creating appointment:', error);
  }
};

/**
 * Example 2: Create Recurring Weekly Appointment
 */
export const createRecurringAppointmentExample = async () => {
  console.log('📅 Creating recurring weekly appointment...');

  const recurringData = {
    title: 'Weekly Therapy Session',
    contactId: 'patient_789',
    startTime: '2024-12-15T15:00:00-05:00',
    endTime: '2024-12-15T16:00:00-05:00',
    address: 'Therapy Office 201',
    appointmentStatus: 'confirmed',
    meetingLocationType: 'physical',
    assignedUserId: 'therapist_002',
    rrule: 'RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=8', // 8 weeks
    toNotify: true,
  };

  try {
    const result = await createAppointment(recurringData);

    if (result.success) {
      console.log('✅ Recurring appointment series created!');
      console.log(`Series starts: ${result.data.startTime}`);
      console.log('Recurrence: Weekly for 8 sessions');
      return result.data.id;
    }
  } catch (error) {
    console.error('❌ Error creating recurring appointment:', error);
  }
};

/**
 * Example 3: Update Appointment Details
 */
export const updateAppointmentExample = async (appointmentId) => {
  console.log('📝 Updating appointment details...');

  const updateData = {
    title: 'Updated: Comprehensive Dental Exam',
    startTime: '2024-12-15T10:30:00-05:00',
    endTime: '2024-12-15T12:00:00-05:00', // Extended time
    address: 'Main Dental Suite',
    appointmentStatus: 'confirmed',
    toNotify: true,
  };

  try {
    const result = await updateAppointmentDetails(appointmentId, updateData);

    if (result.success) {
      console.log('✅ Appointment updated successfully!');
      console.log(`New title: ${result.data.title}`);
      console.log(`Updated fields: ${result.meta.updatedFields.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Error updating appointment:', error);
  }
};

/**
 * Example 4: Get Appointment Details
 */
export const getAppointmentExample = async (appointmentId) => {
  console.log('🔍 Fetching appointment details...');

  try {
    const result = await getAppointmentDetails(appointmentId);

    if (result.success) {
      console.log('✅ Appointment details retrieved!');
      console.log(`Title: ${result.data.title}`);
      console.log(`Status: ${result.data.appointmentStatus}`);
      console.log(`Start: ${result.data.startTime}`);
      console.log(`End: ${result.data.endTime}`);
      console.log(`Location: ${result.data.address}`);
      return result.data;
    }
  } catch (error) {
    console.error('❌ Error fetching appointment:', error);
  }
};

// ============================================================================
// 📅 CALENDAR EVENTS EXAMPLES
// ============================================================================

/**
 * Example 5: Get All Calendar Events
 */
export const getAllEventsExample = async () => {
  console.log('📅 Fetching all calendar events...');

  // Get events for the current month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const filters = {
    startTime: startOfMonth.toISOString(),
    endTime: endOfMonth.toISOString(),
  };

  try {
    const result = await getAllCalendarEvents(filters);

    if (result.success) {
      console.log(`✅ Found ${result.data.length} events this month`);

      // Group events by type
      const appointments = result.data.filter(event => event.eventType === 'appointment');
      const blocks = result.data.filter(event => event.eventType === 'block');

      console.log(`📋 Appointments: ${appointments.length}`);
      console.log(`🚫 Blocked slots: ${blocks.length}`);

      return result.data;
    }
  } catch (error) {
    console.error('❌ Error fetching events:', error);
  }
};

/**
 * Example 6: Get Today's Schedule
 */
export const getTodaysScheduleExample = async () => {
  console.log('📅 Getting today\'s schedule...');

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const filters = {
    startTime: startOfDay.toISOString(),
    endTime: endOfDay.toISOString(),
  };

  try {
    const result = await getAllCalendarEvents(filters);

    if (result.success) {
      console.log(`✅ Today's schedule: ${result.data.length} events`);

      // Sort by start time
      const sortedEvents = result.data.sort((a, b) =>
        new Date(a.startTime) - new Date(b.startTime),
      );

      sortedEvents.forEach((event, index) => {
        const startTime = new Date(event.startTime).toLocaleTimeString();
        const endTime = new Date(event.endTime).toLocaleTimeString();
        console.log(`${index + 1}. ${startTime} - ${endTime}: ${event.title}`);
      });

      return sortedEvents;
    }
  } catch (error) {
    console.error('❌ Error getting today\'s schedule:', error);
  }
};

// ============================================================================
// 🚫 BLOCKED SLOTS EXAMPLES
// ============================================================================

/**
 * Example 7: Create Lunch Break Block
 */
export const createLunchBreakExample = async () => {
  console.log('🚫 Creating lunch break blocked slot...');

  const lunchBlock = {
    title: 'Lunch Break',
    startTime: '2024-12-15T12:00:00-05:00',
    endTime: '2024-12-15T13:00:00-05:00',
    calendarId: 'sV3BiXrjzbfo1tSUdyHO',
    assignedUserId: 'user_123',
  };

  try {
    const result = await createBlockedSlot(lunchBlock);

    if (result.success) {
      console.log('✅ Lunch break blocked successfully!');
      console.log(`Block ID: ${result.data.id}`);
      return result.data.id;
    }
  } catch (error) {
    console.error('❌ Error creating lunch block:', error);
  }
};

/**
 * Example 8: Block Multiple Days for Vacation
 */
export const blockVacationDaysExample = async () => {
  console.log('🚫 Blocking vacation days...');

  const vacationDays = [
    {
      title: 'Vacation - Day 1',
      startTime: '2024-12-20T00:00:00-05:00',
      endTime: '2024-12-20T23:59:59-05:00',
    },
    {
      title: 'Vacation - Day 2',
      startTime: '2024-12-21T00:00:00-05:00',
      endTime: '2024-12-21T23:59:59-05:00',
    },
    {
      title: 'Vacation - Day 3',
      startTime: '2024-12-22T00:00:00-05:00',
      endTime: '2024-12-22T23:59:59-05:00',
    },
  ];

  try {
    const blocks = await Promise.all(
      vacationDays.map(day => createBlockedSlot(day)),
    );

    const successful = blocks.filter(block => block.success);
    console.log(`✅ Blocked ${successful.length} vacation days`);

    return successful.map(block => block.data.id);
  } catch (error) {
    console.error('❌ Error blocking vacation days:', error);
  }
};

/**
 * Example 9: Get All Blocked Slots
 */
export const getBlockedSlotsExample = async () => {
  console.log('🚫 Fetching blocked slots...');

  const filters = {
    startTime: '2024-12-01T00:00:00-05:00',
    endTime: '2024-12-31T23:59:59-05:00',
  };

  try {
    const result = await getBlockedSlots(filters);

    if (result.success) {
      console.log(`✅ Found ${result.data.length} blocked slots in December`);

      result.data.forEach((slot, index) => {
        const start = new Date(slot.startTime).toLocaleDateString();
        const startTime = new Date(slot.startTime).toLocaleTimeString();
        const endTime = new Date(slot.endTime).toLocaleTimeString();
        console.log(`${index + 1}. ${start} ${startTime}-${endTime}: ${slot.title}`);
      });

      return result.data;
    }
  } catch (error) {
    console.error('❌ Error fetching blocked slots:', error);
  }
};

/**
 * Example 10: Update Blocked Slot
 */
export const updateBlockedSlotExample = async (blockId) => {
  console.log('📝 Updating blocked slot...');

  const updateData = {
    title: 'Extended Lunch Break',
    startTime: '2024-12-15T12:00:00-05:00',
    endTime: '2024-12-15T14:00:00-05:00', // Extended by 1 hour
  };

  try {
    const result = await updateBlockedSlot(blockId, updateData);

    if (result.success) {
      console.log('✅ Blocked slot updated successfully!');
      console.log(`New title: ${result.data.title}`);
    }
  } catch (error) {
    console.error('❌ Error updating blocked slot:', error);
  }
};

// ============================================================================
// 🗑️ DELETE OPERATIONS EXAMPLES
// ============================================================================

/**
 * Example 11: Delete Single Event
 */
export const deleteEventExample = async (eventId) => {
  console.log('🗑️ Deleting calendar event...');

  try {
    const result = await deleteCalendarEvent(eventId);

    if (result.success) {
      console.log(`✅ Event ${eventId} deleted successfully!`);
    }
  } catch (error) {
    console.error('❌ Error deleting event:', error);
  }
};

// ============================================================================
// 🔄 BULK OPERATIONS EXAMPLES
// ============================================================================

/**
 * Example 12: Bulk Create Multiple Appointments
 */
export const bulkCreateAppointmentsExample = async () => {
  console.log('🔄 Bulk creating appointments...');

  const appointmentsData = [
    {
      title: 'Morning Consultation',
      contactId: 'contact_001',
      startTime: '2024-12-16T09:00:00-05:00',
      endTime: '2024-12-16T10:00:00-05:00',
      appointmentStatus: 'confirmed',
    },
    {
      title: 'Afternoon Follow-up',
      contactId: 'contact_002',
      startTime: '2024-12-16T14:00:00-05:00',
      endTime: '2024-12-16T15:00:00-05:00',
      appointmentStatus: 'confirmed',
    },
    {
      title: 'Evening Session',
      contactId: 'contact_003',
      startTime: '2024-12-16T17:00:00-05:00',
      endTime: '2024-12-16T18:00:00-05:00',
      appointmentStatus: 'confirmed',
    },
  ];

  try {
    const result = await bulkCreateAppointments(appointmentsData);

    if (result.success) {
      console.log('✅ Bulk creation completed!');
      console.log(`Successful: ${result.data.successful}`);
      console.log(`Failed: ${result.data.failed}`);
    }
  } catch (error) {
    console.error('❌ Error in bulk appointment creation:', error);
  }
};

/**
 * Example 13: Bulk Delete Old Events
 */
export const bulkDeleteOldEventsExample = async () => {
  console.log('🔄 Bulk deleting old events...');

  // First, get old events (example: last month)
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const filters = {
    startTime: new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString(),
    endTime: new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString(),
  };

  try {
    const eventsResult = await getAllCalendarEvents(filters);

    if (eventsResult.success && eventsResult.data.length > 0) {
      const eventIds = eventsResult.data.map(event => event.id);
      console.log(`Found ${eventIds.length} old events to delete`);

      const deleteResult = await bulkDeleteEvents(eventIds);

      if (deleteResult.success) {
        console.log('✅ Bulk deletion completed!');
        console.log(`Deleted: ${deleteResult.data.successful}`);
        console.log(`Failed: ${deleteResult.data.failed}`);
      }
    } else {
      console.log('No old events found to delete');
    }
  } catch (error) {
    console.error('❌ Error in bulk deletion:', error);
  }
};

// ============================================================================
// 🎯 COMPREHENSIVE WORKFLOW EXAMPLES
// ============================================================================

/**
 * Example 14: Complete Appointment Workflow
 * Demonstrates a full lifecycle: create → get → update → delete
 */
export const completeAppointmentWorkflowExample = async () => {
  console.log('🎯 Starting complete appointment workflow...');

  try {
    // Step 1: Create appointment
    console.log('\n1️⃣ Creating appointment...');
    const createResult = await createAppointment({
      title: 'Workflow Test Appointment',
      contactId: 'workflow_contact',
      startTime: '2024-12-20T10:00:00-05:00',
      endTime: '2024-12-20T11:00:00-05:00',
      appointmentStatus: 'confirmed',
    });

    if (!createResult.success) {
      throw new Error('Failed to create appointment');
    }

    const appointmentId = createResult.data.id;
    console.log(`✅ Created appointment: ${appointmentId}`);

    // Step 2: Get appointment details
    console.log('\n2️⃣ Getting appointment details...');
    const getResult = await getAppointmentDetails(appointmentId);

    if (getResult.success) {
      console.log(`✅ Retrieved: ${getResult.data.title}`);
    }

    // Step 3: Update appointment
    console.log('\n3️⃣ Updating appointment...');
    const updateResult = await updateAppointmentDetails(appointmentId, {
      title: 'Updated Workflow Test',
      appointmentStatus: 'confirmed',
    });

    if (updateResult.success) {
      console.log(`✅ Updated: ${updateResult.data.title}`);
    }

    // Step 4: Delete appointment
    console.log('\n4️⃣ Deleting appointment...');
    const deleteResult = await deleteCalendarEvent(appointmentId);

    if (deleteResult.success) {
      console.log(`✅ Deleted appointment: ${appointmentId}`);
    }

    console.log('\n🎉 Complete workflow finished successfully!');

  } catch (error) {
    console.error('❌ Workflow error:', error);
  }
};

/**
 * Example 15: Daily Schedule Management
 * Block time, create appointments, and manage the day
 */
export const dailyScheduleManagementExample = async () => {
  console.log('📅 Managing daily schedule...');

  const scheduleDate = '2024-12-17';

  try {
    // 1. Block lunch time
    console.log('\n🚫 Blocking lunch time...');
    const lunchBlock = await createBlockedSlot({
      title: 'Lunch Break',
      startTime: `${scheduleDate}T12:00:00-05:00`,
      endTime: `${scheduleDate}T13:00:00-05:00`,
    });

    // 2. Create morning appointments
    console.log('\n📋 Creating morning appointments...');
    const morningAppointments = [
      {
        title: '9 AM Consultation',
        contactId: 'morning_client_1',
        startTime: `${scheduleDate}T09:00:00-05:00`,
        endTime: `${scheduleDate}T10:00:00-05:00`,
      },
      {
        title: '10 AM Follow-up',
        contactId: 'morning_client_2',
        startTime: `${scheduleDate}T10:00:00-05:00`,
        endTime: `${scheduleDate}T11:00:00-05:00`,
      },
    ];

    const morningResults = await bulkCreateAppointments(morningAppointments);
    console.log(`✅ Morning appointments: ${morningResults.data.successful} created`);

    // 3. Get full day schedule
    console.log('\n📅 Getting full day schedule...');
    const daySchedule = await getAllCalendarEvents({
      startTime: `${scheduleDate}T00:00:00-05:00`,
      endTime: `${scheduleDate}T23:59:59-05:00`,
    });

    if (daySchedule.success) {
      console.log(`✅ Day schedule: ${daySchedule.data.length} events`);

      // Display organized schedule
      const sortedEvents = daySchedule.data.sort((a, b) =>
        new Date(a.startTime) - new Date(b.startTime),
      );

      console.log('\n📋 Daily Schedule:');
      sortedEvents.forEach((event, index) => {
        const start = new Date(event.startTime).toLocaleTimeString();
        const end = new Date(event.endTime).toLocaleTimeString();
        const type = event.eventType || (event.appointmentStatus ? 'appointment' : 'block');
        console.log(`${index + 1}. ${start}-${end}: ${event.title} [${type}]`);
      });
    }

    console.log('\n🎉 Daily schedule management completed!');

  } catch (error) {
    console.error('❌ Daily schedule management error:', error);
  }
};

// ============================================================================
// 🚀 RUN ALL EXAMPLES
// ============================================================================

/**
 * Demonstration runner - executes all examples
 */
export const runAllExamples = async () => {
  console.log('🚀 Starting comprehensive appointment management demonstration...\n');

  try {
    // Basic appointment operations
    const appointmentId = await createStandardAppointmentExample();
    if (appointmentId) {
      await getAppointmentExample(appointmentId);
      await updateAppointmentExample(appointmentId);
    }

    // Recurring appointment
    await createRecurringAppointmentExample();

    // Calendar events
    await getAllEventsExample();
    await getTodaysScheduleExample();

    // Blocked slots
    const blockId = await createLunchBreakExample();
    if (blockId) {
      await updateBlockedSlotExample(blockId);
    }

    await blockVacationDaysExample();
    await getBlockedSlotsExample();

    // Bulk operations
    await bulkCreateAppointmentsExample();

    // Complete workflows
    await completeAppointmentWorkflowExample();
    await dailyScheduleManagementExample();

    console.log('\n🎉 All examples completed successfully!');
    console.log('\n📚 Check the console output above for detailed results.');

  } catch (error) {
    console.error('❌ Error running examples:', error);
  }
};

// All examples are already exported above with individual export statements
