// Debug script to test the free slots API
import { fetchFreeSlots, fetchFreeSlotsForDate } from './apps/dashboard/src/shared/services/api/freeSlotsApi.js';

async function debugFreeSlots() {
  console.log('🔍 Starting GHL Free Slots API Debug...\n');

  // Test calendar ID - using a typical GHL format
  const testCalendarId = 'U9qdnx6IVYmZTS1ccbiY'; // Sample calendar ID from docs
  const testDate = new Date(); // Today
  const testEndDate = new Date(testDate.getTime() + 24 * 60 * 60 * 1000); // Tomorrow

  console.log('📋 Test Parameters:', {
    calendarId: testCalendarId,
    date: testDate.toISOString().split('T')[0],
    endDate: testEndDate.toISOString().split('T')[0],
  });

  try {
    console.log('\n1️⃣ Testing fetchFreeSlotsForDate...');
    const singleDayResult = await fetchFreeSlotsForDate(testCalendarId, testDate);
    
    console.log('✅ Single day result:', {
      success: singleDayResult.success,
      slots: singleDayResult.slots?.length || 0,
      error: singleDayResult.error || 'none',
      firstSlot: singleDayResult.slots?.[0] || 'none',
    });

    if (singleDayResult.rawResponse) {
      console.log('🔍 Raw API response structure:', Object.keys(singleDayResult.rawResponse));
    }

  } catch (error) {
    console.error('❌ Error in single day test:', error.message);
  }

  try {
    console.log('\n2️⃣ Testing fetchFreeSlots with range...');
    const rangeResult = await fetchFreeSlots({
      calendarId: testCalendarId,
      startDate: testDate.getTime(),
      endDate: testEndDate.getTime(),
      timeZone: 'America/Los_Angeles',
    });

    console.log('✅ Range result:', {
      success: rangeResult.success,
      slots: rangeResult.slots?.length || 0,
      error: rangeResult.error || 'none',
      firstSlot: rangeResult.slots?.[0] || 'none',
    });

  } catch (error) {
    console.error('❌ Error in range test:', error.message);
  }

  console.log('\n🔚 Debug complete!');
}

// Run the debug
debugFreeSlots().catch(console.error);
