import { fetchGHLCalendarFreeSlots } from './src/shared/services/api/ghlCalendarService.js';

// Test with today's date
async function testTodaysSlots() {
  console.log('🧪 Testing GHL Free Slots API with today\'s date...\n');

  try {
    const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
    const today = new Date();

    // Set to beginning of today (local time)
    today.setHours(0, 0, 0, 0);
    const startDate = Math.floor(today.getTime() / 1000);

    // Set to end of today
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    const endDate = Math.floor(endOfDay.getTime() / 1000);

    console.log('📊 Today\'s Test Parameters:');
    console.log('  Calendar ID:', calendarId);
    console.log('  Today (local):', today.toLocaleDateString());
    console.log('  Start Date (epoch):', startDate);
    console.log('  End Date (epoch):', endDate);
    console.log('  Start Date (ISO):', new Date(startDate * 1000).toISOString());
    console.log('  End Date (ISO):', new Date(endDate * 1000).toISOString());

    const result = await fetchGHLCalendarFreeSlots(
      calendarId,
      startDate,
      endDate,
      'America/Los_Angeles',
    );

    console.log('\n✅ Results for Today:');
    console.log('  Success:', result.success);
    console.log('  Total Slots:', result.totalSlots);
    console.log('  Slots Found:', result.slots.length);

    if (result.rawResponse.traceId) {
      console.log('  GHL Trace ID:', result.rawResponse.traceId);
    }

    // Test with a different calendar ID if available
    console.log('\n📋 Raw API Response Structure:');
    console.log('  Has dates property:', 'dates' in result.rawResponse);
    console.log('  Has slots property:', 'slots' in result.rawResponse);
    console.log('  Response keys:', Object.keys(result.rawResponse));

  } catch (error) {
    console.error('❌ Today\'s test failed:', error.message);
  }
}

testTodaysSlots();
