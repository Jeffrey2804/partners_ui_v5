import { fetchFreeSlots } from '../../apps/dashboard/src/shared/services/api/freeSlotsApi.js';

// Test function to verify our date parameter fixes
async function testFreeSlotsAPI() {
  console.log('🧪 Testing GHL Free Slots API with enhanced date handling...\n');

  try {
    // Test with a sample calendar ID and today's date
    const calendarId = 'U9qdnx6IVYmZTS1ccbiY'; // Sample calendar ID from the curl examples
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = Math.floor(today.getTime() / 1000);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    const endDate = Math.floor(endOfDay.getTime() / 1000);

    console.log('📊 Test Parameters:');
    console.log('  Calendar ID:', calendarId);
    console.log('  Start Date (epoch):', startDate);
    console.log('  End Date (epoch):', endDate);
    console.log('  Start Date (readable):', new Date(startDate * 1000).toISOString());
    console.log('  End Date (readable):', new Date(endDate * 1000).toISOString());
    console.log('  Timezone: America/Los_Angeles\n');

    const result = await fetchFreeSlots({
      calendarId,
      startDate: startDate * 1000, // Convert to milliseconds  
      endDate: endDate * 1000, // Convert to milliseconds
      timeZone: 'America/Los_Angeles',
    });

    console.log('✅ API Test Results:');
    console.log('  Success:', result.success);
    console.log('  Total Slots:', result.slots.length);
    console.log('  Calendar ID:', result.meta?.calendarId);
    console.log('  Time Zone:', result.meta?.timeZone);

    if (result.slots.length > 0) {
      console.log('\n📋 Sample Slots:');
      result.slots.slice(0, 3).forEach((slot, index) => {
        console.log(`  ${index + 1}. ${slot.startTime} - ${slot.endTime}`);
      });
    }

    if (Object.keys(result.dates).length > 0) {
      console.log('\n📅 Dates Object Keys:', Object.keys(result.dates));
    }

    console.log('\n🎉 Date parameter test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);

    if (error.message.includes('GHL API token is not configured')) {
      console.log('\n💡 Note: This test requires a valid GHL API token in your ghlConfig.js file.');
    }
  }
}

// Run the test
testFreeSlotsAPI();
