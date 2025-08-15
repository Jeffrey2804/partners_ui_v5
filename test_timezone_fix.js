#!/usr/bin/env node

/**
 * 🧪 Test Free Slots WITHOUT Timezone Override
 * This should respect the calendar's own timezone settings
 */

import { fetchFreeSlots } from './apps/dashboard/src/shared/services/api/freeSlotsApi.js';

async function testWithoutTimezone() {
  console.log('🧪 Testing Free Slots WITHOUT timezone parameter...\n');

  const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Set to full day range
  const startDate = new Date(tomorrow);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(tomorrow);
  endDate.setHours(23, 59, 59, 999);

  console.log(`📅 Testing for date: ${tomorrow.toISOString().split('T')[0]}`);
  console.log(`🕐 Time range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
  console.log(`📋 Calendar ID: ${calendarId}`);
  console.log(`🌍 Timezone: NOT SPECIFIED (let calendar use its own timezone)`);
  console.log('');

  try {
    // Test WITHOUT timezone - let calendar use its own settings
    const result = await fetchFreeSlots({
      calendarId,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      // Note: NO timeZone parameter - calendar will use its configured timezone
    });

    console.log('✅ API Response:');
    console.log(`   Success: ${result.success}`);
    console.log(`   Slots found: ${result.slots.length}`);
    console.log(`   Error: ${result.error || 'None'}`);
    
    if (result.slots.length > 0) {
      console.log('\n📋 First few slots:');
      result.slots.slice(0, 5).forEach((slot, index) => {
        console.log(`   ${index + 1}. ${slot}`);
      });
    }

    if (result.rawResponse) {
      console.log('\n🔍 Raw Response Structure:');
      console.log(`   Response type: ${typeof result.rawResponse}`);
      console.log(`   Response keys: ${Object.keys(result.rawResponse).join(', ')}`);
      
      // Look for date-organized structure
      const dateKeys = Object.keys(result.rawResponse).filter(key => key.match(/^\d{4}-\d{2}-\d{2}$/));
      if (dateKeys.length > 0) {
        console.log(`   📅 Date keys found: ${dateKeys.join(', ')}`);
        dateKeys.forEach(dateKey => {
          const dayData = result.rawResponse[dateKey];
          if (dayData && dayData.slots) {
            console.log(`   📋 ${dateKey}: ${dayData.slots.length} slots`);
          }
        });
      }
    }

    console.log('\n🎯 TIMEZONE FIX TEST RESULTS:');
    console.log(`   ✅ No timezone sent to API: Calendar uses its own timezone`);
    console.log(`   📊 Slots returned: ${result.slots.length}`);
    console.log(`   🎉 Expected behavior: Calendar should return slots in its configured timezone`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('   Stack:', error.stack);
  }
}

// Run the test
testWithoutTimezone().catch(console.error);
