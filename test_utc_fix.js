#!/usr/bin/env node

/**
 * 🧪 Test UTC Date Fix for Free Slots
 * Compare results before and after the UTC date fix
 */

console.log('🧪 TESTING UTC DATE FIX FOR FREE SLOTS\n');

const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
const testDate = '2025-08-15'; // Tomorrow

console.log(`📅 Testing date: ${testDate}`);
console.log(`📋 Calendar ID: ${calendarId}`);
console.log('');

// Test the date conversion logic
console.log('🔍 UTC DATE CONVERSION TEST:');
const selectedDate = new Date(testDate);
console.log(`   Input: ${testDate}`);
console.log(`   Parsed: ${selectedDate.toISOString()}`);

// NEW APPROACH: UTC-based dates
const year = selectedDate.getUTCFullYear();
const month = selectedDate.getUTCMonth();  
const day = selectedDate.getUTCDate();

const startDateUTC = new Date(Date.UTC(year, month, day, 0, 0, 0, 0)).getTime();
const endDateUTC = new Date(Date.UTC(year, month, day, 23, 59, 59, 999)).getTime();

console.log(`   UTC Year: ${year}, Month: ${month}, Day: ${day}`);
console.log(`   Start UTC: ${new Date(startDateUTC).toISOString()} (${startDateUTC})`);
console.log(`   End UTC:   ${new Date(endDateUTC).toISOString()} (${endDateUTC})`);
console.log(`   Duration:  ${(endDateUTC - startDateUTC) / (1000 * 60 * 60)} hours`);
console.log('');

// COMPARE WITH OLD APPROACH
console.log('🔍 OLD APPROACH (LOCAL TIME):');
const selectedDateOld = new Date(testDate);
selectedDateOld.setHours(0, 0, 0, 0);
const startDateOld = selectedDateOld.getTime();

const endOfDayOld = new Date(selectedDateOld);
endOfDayOld.setHours(23, 59, 59, 999);
const endDateOld = endOfDayOld.getTime();

console.log(`   Start Local: ${new Date(startDateOld).toISOString()} (${startDateOld})`);
console.log(`   End Local:   ${new Date(endDateOld).toISOString()} (${endDateOld})`);
console.log(`   Duration:    ${(endDateOld - startDateOld) / (1000 * 60 * 60)} hours`);
console.log('');

// ANALYSIS
console.log('📊 COMPARISON ANALYSIS:');
const timeDiff = startDateUTC - startDateOld;
const hoursDiff = timeDiff / (1000 * 60 * 60);

console.log(`   Time difference: ${timeDiff} milliseconds`);
console.log(`   Hours difference: ${hoursDiff} hours`);
console.log(`   UTC approach benefits:`);
console.log(`   ✅ Avoids local timezone interpretation`);
console.log(`   ✅ Consistent across different server timezones`);
console.log(`   ✅ Matches date string exactly (no timezone offset)`);
console.log('');

console.log('🎯 EXPECTED IMPACT:');
console.log('   • UTC dates should align better with calendar business hours');
console.log('   • Should reduce timezone-related slot filtering issues');
console.log('   • May return more slots by avoiding date boundary problems');
console.log('   • Calendar will handle timezone conversion internally');
console.log('');

console.log('💡 NEXT STEPS:');
console.log('   1. Test with the new fetchFreeSlotsForDate function');
console.log('   2. Try the new fetchFreeSlotsRange for broader date ranges'); 
console.log('   3. Compare results with working cURL command patterns');
console.log('   4. Monitor slot availability across different dates');
