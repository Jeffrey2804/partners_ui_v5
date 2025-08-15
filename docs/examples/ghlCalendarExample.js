/**
 * Example usage of the GHL Calendar Events API
 *
 * This file demonstrates how to use the getCalendarEvents function
 * to fetch calendar events from GoHighLevel.
 */

const { getCalendarEvents } = require('./ghlCalendarService');

/**
 * Example function demonstrating how to use getCalendarEvents
 */
async function exampleUsage() {
  try {
    // Example parameters
    const calendarId = 'abc123'; // Replace with actual calendar ID
    const startTime = '2025-08-12T00:00:00Z'; // Start of day
    const endTime = '2025-08-13T00:00:00Z';   // End of day

    console.log('Fetching calendar events...');
    console.log(`Calendar ID: ${calendarId}`);
    console.log(`Time range: ${startTime} to ${endTime}`);

    // Call the API
    const result = await getCalendarEvents(calendarId, startTime, endTime);

    console.log('✅ Success! Retrieved calendar events:');
    console.log(`Total events: ${result.events?.length || 0}`);

    // Display event details
    if (result.events && result.events.length > 0) {
      console.log('\n📅 Event Details:');
      result.events.forEach((event, index) => {
        console.log(`\n${index + 1}. ${event.title || 'Untitled Event'}`);
        console.log(`   📅 Start: ${event.startTime || 'N/A'}`);
        console.log(`   📅 End: ${event.endTime || 'N/A'}`);
        console.log(`   👤 Contact: ${event.contactName || 'N/A'}`);
        console.log(`   📍 Location: ${event.location || 'N/A'}`);
        console.log(`   📝 Status: ${event.status || 'N/A'}`);
      });
    } else {
      console.log('\n📅 No events found for the specified time range.');
    }

    return result;

  } catch (error) {
    console.error('❌ Error fetching calendar events:', error.message);

    // Handle specific error cases
    if (error.message.includes('GHL_API_TOKEN')) {
      console.log('\n💡 Make sure to set the GHL_API_TOKEN environment variable:');
      console.log('   export GHL_API_TOKEN="your-api-token-here"');
    }

    if (error.message.includes('HTTP 401')) {
      console.log('\n💡 Authentication failed. Check your API token.');
    }

    if (error.message.includes('HTTP 404')) {
      console.log('\n💡 Calendar not found. Check your calendar ID.');
    }

    throw error;
  }
}

/**
 * Example of fetching events for the current week
 */
async function fetchCurrentWeekEvents() {
  try {
    const now = new Date();

    // Get start of current week (Monday)
    const startOfWeek = new Date(now);
    const dayOfWeek = startOfWeek.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + daysToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    // Get end of current week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const calendarId = process.env.GHL_CALENDAR_ID || 'your-calendar-id';

    console.log('📅 Fetching events for current week...');
    const result = await getCalendarEvents(
      calendarId,
      startOfWeek.toISOString(),
      endOfWeek.toISOString(),
    );

    return result;

  } catch (error) {
    console.error('❌ Error fetching weekly events:', error.message);
    throw error;
  }
}

// Export for use in other files
module.exports = {
  exampleUsage,
  fetchCurrentWeekEvents,
};

// Run example if this file is executed directly
if (require.main === module) {
  console.log('🚀 Running GHL Calendar Events Example\n');

  // You can uncomment one of these to test:
  // exampleUsage();
  // fetchCurrentWeekEvents();

  console.log('💡 To run the examples, set your environment variables and uncomment the function calls above.');
  console.log('   Required: GHL_API_TOKEN');
  console.log('   Optional: GHL_API_VERSION (defaults to 2021-04-15)');
  console.log('   Optional: GHL_CALENDAR_ID (for fetchCurrentWeekEvents)');
}
