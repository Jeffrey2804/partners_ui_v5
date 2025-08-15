// ========================================
// 🧪 FREE SLOTS API TEST
// ========================================

import { fetchFreeSlots, fetchFreeSlotsForDate } from '../src/shared/services/api/freeSlotsApi.js';

/**
 * Test the new free slots API integration
 */
async function testFreeSlotsAPI() {
  console.log('🧪 Testing Free Slots API Integration...\n');

  const testCalendarId = 'U9qdnx6IVYmZTS1ccbiY'; // Partner Consultation calendar
  const testDate = '2025-08-15'; // Tomorrow
  const testTimezone = 'America/Los_Angeles';
  const testUserId = null; // Optional

  try {
    // Test 1: Fetch free slots for a specific date
    console.log('📅 Test 1: Fetching free slots for date:', testDate);
    console.log('Calendar ID:', testCalendarId);
    console.log('Timezone:', testTimezone);
    console.log('---');

    const response1 = await fetchFreeSlotsForDate(
      testCalendarId,
      testDate,
      testTimezone,
      testUserId
    );

    console.log('✅ Response received:');
    console.log('- Response keys:', Object.keys(response1 || {}));
    console.log('- Has slots:', !!response1?.slots);
    console.log('- Slots count:', response1?.slots?.length || 0);
    console.log('- Has freeSlots:', !!response1?.freeSlots);
    console.log('- Free slots count:', response1?.freeSlots?.length || 0);

    if (response1?.slots?.length > 0) {
      console.log('🕐 First few slots:');
      response1.slots.slice(0, 3).forEach((slot, index) => {
        console.log(`  ${index + 1}. ${slot.startTime} - ${slot.endTime}`);
      });
    } else if (response1?.freeSlots?.length > 0) {
      console.log('🕐 First few free slots:');
      response1.freeSlots.slice(0, 3).forEach((slot, index) => {
        console.log(`  ${index + 1}. ${slot.startTime} - ${slot.endTime}`);
      });
    } else {
      console.log('⚠️ No slots found in response');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }

  console.log('\n' + '='.repeat(50));
  
  try {
    // Test 2: Fetch free slots with custom date range
    console.log('📅 Test 2: Fetching free slots with custom range...');
    
    const startDate = new Date('2025-08-15T09:00:00Z').getTime();
    const endDate = new Date('2025-08-15T17:00:00Z').getTime();

    console.log('Start date:', new Date(startDate).toISOString());
    console.log('End date:', new Date(endDate).toISOString());
    console.log('---');

    const response2 = await fetchFreeSlots({
      calendarId: testCalendarId,
      startDate,
      endDate,
      timeZone: testTimezone,
      userId: testUserId,
    });

    console.log('✅ Custom range response:');
    console.log('- Response type:', typeof response2);
    console.log('- Response keys:', Object.keys(response2 || {}));
    console.log('- Total properties:', Object.keys(response2 || {}).length);

  } catch (error) {
    console.error('❌ Custom range test failed:', error.message);
  }

  console.log('\n🎉 Free Slots API tests completed!');
}

// Export for use in other test files
export { testFreeSlotsAPI };

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testFreeSlotsAPI();
}
