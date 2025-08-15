// ========================================
// 🎯 COMPREHENSIVE CALENDAR MANAGEMENT EXAMPLE
// ========================================
// This example demonstrates how to use all the enhanced calendar functions
// based on the provided cURL commands for full CRUD operations

import {
  fetchCalendarFreeSlots,
  fetchCalendarDetails,
  updateCalendarConfiguration,
  deleteCalendar,
  createCalendar,
  fetchAllCalendarsWithDetails,
  getGhlCalendarList,
} from '../src/shared/services/api/calendarApi.js';

/**
 * 🎯 Example 1: Fetch Calendar Free Slots
 * Demonstrates how to get available time slots for a calendar
 */
async function exampleFetchFreeSlots() {
  console.log('\n📅 Example 1: Fetch Calendar Free Slots');
  console.log('=' .repeat(50));

  const calendarId = 'sV3BiXrjzbfo1tSUdyHO'; // Your calendar ID

  // Set date range for next 7 days
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const filters = {
    startDate: today.toISOString().split('T')[0], // YYYY-MM-DD format
    endDate: nextWeek.toISOString().split('T')[0],
    timezone: 'America/New_York',
  };

  try {
    const result = await fetchCalendarFreeSlots(calendarId, filters);

    if (result.success) {
      console.log(`✅ Found ${result.data.length} available slots`);
      console.log('🔍 Sample slots:');
      result.data.slice(0, 3).forEach((slot, index) => {
        console.log(`   ${index + 1}. ${slot.startTime || slot.date} - ${slot.duration || '30'} mins`);
      });
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Example 2: Fetch Calendar Details
 * Demonstrates how to get detailed information about a specific calendar
 */
async function exampleFetchCalendarDetails() {
  console.log('\n📋 Example 2: Fetch Calendar Details');
  console.log('=' .repeat(50));

  const calendarId = 'sV3BiXrjzbfo1tSUdyHO';

  try {
    const result = await fetchCalendarDetails(calendarId);

    if (result.success) {
      const calendar = result.data;
      console.log('✅ Calendar Details Retrieved:');
      console.log(`   📝 Name: ${calendar.name}`);
      console.log(`   📄 Description: ${calendar.description || 'N/A'}`);
      console.log(`   🎨 Color: ${calendar.eventColor}`);
      console.log(`   ⏱️ Slot Duration: ${calendar.slotDuration} ${calendar.slotDurationUnit}`);
      console.log(`   📧 Auto Confirm: ${calendar.autoConfirm ? 'Yes' : 'No'}`);
      console.log(`   🔄 Allow Reschedule: ${calendar.allowReschedule ? 'Yes' : 'No'}`);
      console.log(`   ❌ Allow Cancellation: ${calendar.allowCancellation ? 'Yes' : 'No'}`);
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Example 3: Create a New Calendar
 * Demonstrates how to create a new calendar with custom configuration
 */
async function exampleCreateCalendar() {
  console.log('\n➕ Example 3: Create New Calendar');
  console.log('=' .repeat(50));

  const calendarData = {
    name: 'Test Calendar - Auto Generated',
    description: 'This is a test calendar created via API',
    eventColor: '#ff6b35', // Orange color
    slotDuration: 45, // 45 minute slots
    autoConfirm: false, // Require manual confirmation
    allowReschedule: true,
    allowCancellation: true,
    openHours: [
      {
        daysOfTheWeek: [1, 2, 3, 4, 5], // Monday to Friday
        hours: [
          {
            openHour: 10,
            openMinute: 0,
            closeHour: 16,
            closeMinute: 0,
          },
        ],
      },
    ],
  };

  try {
    const result = await createCalendar(calendarData);

    if (result.success) {
      const calendar = result.data;
      console.log('✅ Calendar Created Successfully:');
      console.log(`   🆔 ID: ${calendar.id}`);
      console.log(`   📝 Name: ${calendar.name}`);
      console.log(`   🔗 Slug: ${calendar.slug}`);
      console.log(`   🎨 Color: ${calendar.eventColor}`);
      console.log('📊 You can now use this calendar ID for bookings!');

      // Store the ID for potential cleanup
      global.testCalendarId = calendar.id;
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Example 4: Update Calendar Configuration
 * Demonstrates how to update an existing calendar
 */
async function exampleUpdateCalendar() {
  console.log('\n📝 Example 4: Update Calendar Configuration');
  console.log('=' .repeat(50));

  // Use the test calendar if created, otherwise use default
  const calendarId = global.testCalendarId || 'sV3BiXrjzbfo1tSUdyHO';

  const updates = {
    name: 'Updated Test Calendar',
    description: 'This calendar has been updated via API',
    eventColor: '#4caf50', // Green color
    slotDuration: 60, // Change to 1 hour slots
    autoConfirm: true, // Enable auto confirmation
    allowBookingFor: 14, // Allow booking up to 14 days in advance
    allowBookingForUnit: 'days',
  };

  try {
    const result = await updateCalendarConfiguration(calendarId, updates);

    if (result.success) {
      const calendar = result.data;
      console.log('✅ Calendar Updated Successfully:');
      console.log(`   📝 New Name: ${calendar.name}`);
      console.log(`   🎨 New Color: ${calendar.eventColor}`);
      console.log(`   ⏱️ New Slot Duration: ${calendar.slotDuration} ${calendar.slotDurationUnit}`);
      console.log(`   ✅ Auto Confirm: ${calendar.autoConfirm ? 'Enabled' : 'Disabled'}`);
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Example 5: Fetch All Calendars with Details
 * Demonstrates how to get all calendars with optional detailed information
 */
async function exampleFetchAllCalendars() {
  console.log('\n📚 Example 5: Fetch All Calendars');
  console.log('=' .repeat(50));

  try {
    // First, fetch basic calendar list
    console.log('📝 Fetching basic calendar list...');
    const basicResult = await getGhlCalendarList();

    if (basicResult.success) {
      const calendars = basicResult.data.calendars || basicResult.data;
      console.log(`✅ Found ${calendars.length} calendars (basic info)`);

      calendars.forEach((calendar, index) => {
        console.log(`   ${index + 1}. ${calendar.name} (${calendar.id})`);
      });
    }

    // Then, fetch with detailed information
    console.log('\n📖 Fetching calendars with detailed information...');
    const detailedResult = await fetchAllCalendarsWithDetails({
      includeDetails: true,
    });

    if (detailedResult.success) {
      console.log(`✅ Retrieved detailed info for ${detailedResult.data.length} calendars`);

      detailedResult.data.slice(0, 2).forEach((calendar, index) => {
        console.log(`\n📋 Calendar ${index + 1} Details:`);
        console.log(`   📝 Name: ${calendar.name}`);
        console.log(`   🎨 Color: ${calendar.eventColor}`);
        console.log(`   ⏱️ Duration: ${calendar.slotDuration} ${calendar.slotDurationUnit}`);
        console.log(`   📧 Auto Confirm: ${calendar.autoConfirm ? 'Yes' : 'No'}`);
      });
    } else {
      console.log(`❌ Detailed fetch error: ${detailedResult.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Example 6: Delete Calendar (Optional - Use with Caution!)
 * Demonstrates how to delete a calendar
 * NOTE: This will permanently delete the calendar!
 */
async function exampleDeleteCalendar() {
  console.log('\n🗑️ Example 6: Delete Calendar (DESTRUCTIVE!)');
  console.log('=' .repeat(50));

  // Only delete the test calendar we created
  if (!global.testCalendarId) {
    console.log('⚠️ No test calendar to delete. Skipping this example.');
    return;
  }

  const calendarId = global.testCalendarId;

  console.log(`🚨 WARNING: About to delete calendar ${calendarId}`);
  console.log('⏳ In a real application, you should ask for user confirmation');

  try {
    const result = await deleteCalendar(calendarId);

    if (result.success) {
      console.log('✅ Calendar deleted successfully');
      console.log(`   🆔 Deleted Calendar ID: ${result.data.calendarId}`);
      console.log('🧹 Test calendar cleanup completed');
      global.testCalendarId = null;
    } else {
      console.log(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('💥 Exception:', error.message);
  }
}

/**
 * 🎯 Main Execution Function
 * Runs all calendar management examples in sequence
 */
async function runCalendarManagementExamples() {
  console.log('🚀 Starting Comprehensive Calendar Management Examples');
  console.log('=' .repeat(70));
  console.log('🔗 Using GHL API with Bearer token authentication');
  console.log('📍 Location ID: b7vHWUGVUNQGoIlAXabY');
  console.log('📅 Calendar ID: sV3BiXrjzbfo1tSUdyHO');

  try {
    await exampleFetchFreeSlots();
    await exampleFetchCalendarDetails();
    await exampleCreateCalendar();
    await exampleUpdateCalendar();
    await exampleFetchAllCalendars();

    // Ask user if they want to run the destructive delete example
    console.log('\n⚠️ Delete Example Available');
    console.log('The delete example will remove the test calendar created above.');
    console.log('Uncomment the line below to run it:');
    console.log('// await exampleDeleteCalendar();');

    // Uncomment to run delete example:
    // await exampleDeleteCalendar();

    console.log('\n🎉 All Calendar Management Examples Completed!');
    console.log('=' .repeat(70));
    console.log('📚 Available Functions:');
    console.log('   - fetchCalendarFreeSlots(calendarId, filters)');
    console.log('   - fetchCalendarDetails(calendarId)');
    console.log('   - createCalendar(calendarData)');
    console.log('   - updateCalendarConfiguration(calendarId, updates)');
    console.log('   - deleteCalendar(calendarId)');
    console.log('   - fetchAllCalendarsWithDetails(options)');
    console.log('   - getGhlCalendarList()');

  } catch (error) {
    console.error('💥 Fatal error in examples:', error);
  }
}

// Function exports for individual testing
export {
  exampleFetchFreeSlots,
  exampleFetchCalendarDetails,
  exampleCreateCalendar,
  exampleUpdateCalendar,
  exampleFetchAllCalendars,
  exampleDeleteCalendar,
  runCalendarManagementExamples,
};

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCalendarManagementExamples();
}
