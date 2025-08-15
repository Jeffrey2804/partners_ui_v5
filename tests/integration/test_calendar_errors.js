import { fetchGHLCalendarFreeSlots } from './src/shared/services/api/ghlCalendarService.js';
import { getGhlCalendarList } from './src/shared/services/api/calendarApi.js';

// Test calendar validation and error handling
async function testCalendarErrorHandling() {
  console.log('🧪 Testing Calendar Error Handling...\n');

  try {
    // First, get the list of calendars to see which ones exist
    console.log('📋 Fetching calendar list...');
    const calendarsResponse = await getGhlCalendarList();

    if (calendarsResponse.success) {
      console.log('✅ Available calendars:');
      (calendarsResponse.data.calendars || []).forEach((cal, index) => {
        console.log(`  ${index + 1}. ${cal.name || cal.title} (ID: ${cal.id || cal.calendarId})`);
      });
    } else {
      console.warn('⚠️ Could not fetch calendar list:', calendarsResponse.error);
    }

    console.log('\n🔧 Testing with known problematic calendar IDs...\n');

    // Test cases for different calendar IDs
    const testCases = [
      {
        name: 'Known Inactive Calendar',
        calendarId: 'Fit5F2PbZVrK846aJeJF', // This one was causing errors
        expected: 'Should return Calendar is inactive error',
      },
      {
        name: 'Known Working Calendar',
        calendarId: 'U9qdnx6IVYmZTS1ccbiY', // Partner Consultation
        expected: 'Should return success or empty slots',
      },
      {
        name: 'Invalid Calendar ID Format',
        calendarId: 'Book Now With Test',
        expected: 'Should be caught by validation',
      },
      {
        name: 'Too Short Calendar ID',
        calendarId: 'test123',
        expected: 'Should be caught by validation',
      },
    ];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = Math.floor(today.getTime() / 1000);
    const endDate = Math.floor((today.getTime() + 24 * 60 * 60 * 1000) / 1000);

    for (const testCase of testCases) {
      console.log(`\n🔍 Testing: ${testCase.name}`);
      console.log(`   Calendar ID: ${testCase.calendarId}`);
      console.log(`   Expected: ${testCase.expected}`);

      try {
        const result = await fetchGHLCalendarFreeSlots(
          testCase.calendarId,
          startDate,
          endDate,
          'America/Los_Angeles',
        );

        console.log(`   ✅ Result: Success with ${result.slots?.length || 0} slots`);

      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);

        // Check if it's the expected error type
        if (testCase.calendarId === 'Fit5F2PbZVrK846aJeJF' && error.message.includes('inactive')) {
          console.log('   ✨ This is the expected "Calendar is inactive" error - our fix is working!');
        }
      }
    }

    console.log('\n🎉 Calendar error handling test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCalendarErrorHandling();
