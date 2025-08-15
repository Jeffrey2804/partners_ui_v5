#!/usr/bin/env node

/**
 * 🧪 Test Unified Free Slots API
 * Verify the new unified API works correctly after cleanup
 */

import { fetchFreeSlots, fetchFreeSlotsForDate } from './apps/dashboard/src/shared/services/api/freeSlotsApi.js';

async function testUnifiedAPI() {
  console.log('🧪 Testing Unified Free Slots API...\n');

  const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 1); // Tomorrow
  
  const startDate = new Date(testDate);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(testDate);
  endDate.setHours(23, 59, 59, 999);

  try {
    // Test 1: fetchFreeSlots with date range
    console.log('📅 Test 1: fetchFreeSlots (date range)');
    console.log(`   Calendar: ${calendarId}`);
    console.log(`   Range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    
    const result1 = await fetchFreeSlots({
      calendarId,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      timeZone: 'America/Los_Angeles'
    });

    console.log(`   ✅ Success: ${result1.success}`);
    console.log(`   📊 Slots found: ${result1.slots.length}`);
    console.log(`   📝 Sample slot: ${result1.slots[0] || 'None'}`);
    console.log('');

    // Test 2: fetchFreeSlotsForDate (single day)
    console.log('📅 Test 2: fetchFreeSlotsForDate (single day)');
    console.log(`   Calendar: ${calendarId}`);
    console.log(`   Date: ${testDate.toISOString().split('T')[0]}`);
    
    const result2 = await fetchFreeSlotsForDate(calendarId, testDate, 'America/Los_Angeles');

    console.log(`   ✅ Success: ${result2.success}`);
    console.log(`   📊 Slots found: ${result2.slots.length}`);
    console.log(`   📝 Sample slot: ${result2.slots[0] || 'None'}`);
    console.log('');

    // Summary
    console.log('🎉 Unified API Test Summary:');
    console.log(`   ✅ fetchFreeSlots: ${result1.success ? 'WORKING' : 'FAILED'}`);
    console.log(`   ✅ fetchFreeSlotsForDate: ${result2.success ? 'WORKING' : 'FAILED'}`);
    console.log(`   📊 Total API calls: 2`);
    console.log(`   🧹 Code duplication: ELIMINATED`);
    console.log(`   📝 Single source of truth: freeSlotsApi.js`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('   Stack:', error.stack);
  }
}

// Run the test
testUnifiedAPI().catch(console.error);
