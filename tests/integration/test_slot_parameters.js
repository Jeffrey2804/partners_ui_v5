import { fetchFreeSlots } from '../../apps/dashboard/src/shared/services/api/freeSlotsApi.js';

// Test different time ranges and parameters to find available slots
async function findAvailableSlots() {
  console.warn('🔍 Testing Different Parameters to Find Available Slots...\n');

  const workingCalendars = [
    { name: 'Partner Consultation', id: 'U9qdnx6IVYmZTS1ccbiY' },
    { name: 'Gmail Calendar', id: 'cF0lnbb4A2vCVdKQLrJp' },
    { name: 'Ricky Personal Calendar', id: 'sV3BiXrjzbfo1tSUdyHO' },
  ];

  // Test different date ranges
  const dateRanges = [
    {
      name: 'Today',
      days: 0,
      duration: 1,
    },
    {
      name: 'Tomorrow',
      days: 1,
      duration: 1,
    },
    {
      name: 'Next 3 days',
      days: 0,
      duration: 3,
    },
    {
      name: 'Next week',
      days: 0,
      duration: 7,
    },
    {
      name: 'Next month',
      days: 0,
      duration: 30,
    },
  ];

  for (const calendar of workingCalendars) {
    console.warn(`\n📅 Testing Calendar: ${calendar.name} (${calendar.id})`);

    for (const range of dateRanges) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + range.days);
      startDate.setHours(0, 0, 0, 0);
      const startTimestamp = Math.floor(startDate.getTime() / 1000);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + range.duration);
      endDate.setHours(23, 59, 59, 999);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      console.warn(`\n  🔍 Range: ${range.name}`);
      console.warn(`    From: ${startDate.toISOString()}`);
      console.warn(`    To: ${endDate.toISOString()}`);

      try {
        const result = await fetchGHLCalendarFreeSlots(
          calendar.id,
          startTimestamp,
          endTimestamp,
          'America/Los_Angeles',
        );

        const hasSlotData = result.rawResponse && Object.keys(result.rawResponse).length > 1;
        const responseKeys = result.rawResponse ? Object.keys(result.rawResponse) : [];

        if (hasSlotData) {
          console.warn(`    ✅ FOUND DATA! Keys: ${responseKeys.join(', ')}`);
          console.warn('    Raw Response:', JSON.stringify(result.rawResponse, null, 2));
        } else {
          console.warn(`    ⚠️ Only traceId returned: ${result.rawResponse?.traceId}`);
        }

      } catch (error) {
        console.error(`    ❌ Error: ${error.message}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Also test with different timezone parameters
  console.warn('\n🌍 Testing Different Timezones...');
  const timezones = [
    'America/Los_Angeles',
    'America/New_York',
    'UTC',
    'America/Chicago',
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const tomorrowStart = Math.floor(tomorrow.getTime() / 1000);
  const tomorrowEnd = Math.floor((tomorrow.getTime() + 24 * 60 * 60 * 1000) / 1000);

  for (const timezone of timezones) {
    console.warn(`\n  🌍 Testing timezone: ${timezone}`);

    try {
      const result = await fetchGHLCalendarFreeSlots(
        'U9qdnx6IVYmZTS1ccbiY',
        tomorrowStart,
        tomorrowEnd,
        timezone,
      );

      const hasSlotData = result.rawResponse && Object.keys(result.rawResponse).length > 1;
      console.warn(`    Result: ${hasSlotData ? 'HAS DATA' : 'Only traceId'}`);

      if (hasSlotData) {
        console.warn(`    Keys: ${Object.keys(result.rawResponse).join(', ')}`);
      }

    } catch (error) {
      console.error(`    ❌ Error: ${error.message}`);
    }
  }
}

findAvailableSlots();
