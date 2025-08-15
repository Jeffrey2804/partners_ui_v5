#!/usr/bin/env node

/**
 * 🧪 Diagnose Start/End Date Issues
 * Test different ways of setting start and end dates for GHL API
 */

console.log('🧪 DIAGNOSING START/END DATE ISSUES\n');

const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
const testDate = new Date('2025-08-15'); // Tomorrow

console.log('📅 BASE DATE ANALYSIS:');
console.log(`   Input date: 2025-08-15`);
console.log(`   Parsed date: ${testDate.toISOString()}`);
console.log(`   Local string: ${testDate.toString()}`);
console.log(`   Timezone offset: ${testDate.getTimezoneOffset()} minutes`);
console.log('');

// Method 1: Local time (current approach)
console.log('🔍 METHOD 1: Local Time (Current Approach)');
const localStart = new Date(testDate);
localStart.setHours(0, 0, 0, 0);
const localEnd = new Date(testDate);
localEnd.setHours(23, 59, 59, 999);

console.log(`   Start (local): ${localStart.toISOString()} (${localStart.getTime()})`);
console.log(`   End (local):   ${localEnd.toISOString()} (${localEnd.getTime()})`);
console.log(`   Duration: ${(localEnd.getTime() - localStart.getTime()) / (1000 * 60 * 60)} hours`);
console.log('');

// Method 2: UTC time 
console.log('🔍 METHOD 2: UTC Time');
const utcStart = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
const utcEnd = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate(), 23, 59, 59, 999);

console.log(`   Start (UTC): ${utcStart.toISOString()} (${utcStart.getTime()})`);
console.log(`   End (UTC):   ${utcEnd.toISOString()} (${utcEnd.getTime()})`);
console.log(`   Duration: ${(utcEnd.getTime() - utcStart.getTime()) / (1000 * 60 * 60)} hours`);
console.log('');

// Method 3: String-based parsing
console.log('🔍 METHOD 3: String-Based UTC');
const stringStart = new Date('2025-08-15T00:00:00.000Z');
const stringEnd = new Date('2025-08-15T23:59:59.999Z');

console.log(`   Start (string): ${stringStart.toISOString()} (${stringStart.getTime()})`);
console.log(`   End (string):   ${stringEnd.toISOString()} (${stringEnd.getTime()})`);
console.log(`   Duration: ${(stringEnd.getTime() - stringStart.getTime()) / (1000 * 60 * 60)} hours`);
console.log('');

// Method 4: Broader range (whole week)
console.log('🔍 METHOD 4: Broader Range (7 days)');
const broadStart = new Date('2025-08-14T00:00:00.000Z');
const broadEnd = new Date('2025-08-21T23:59:59.999Z');

console.log(`   Start (broad): ${broadStart.toISOString()} (${broadStart.getTime()})`);
console.log(`   End (broad):   ${broadEnd.toISOString()} (${broadEnd.getTime()})`);
console.log(`   Duration: ${(broadEnd.getTime() - broadStart.getTime()) / (1000 * 60 * 60 * 24)} days`);
console.log('');

// GHL Examples from working curl commands
console.log('🔍 REFERENCE: Working cURL timestamps');
console.log(`   cURL start: 1754774400000 = ${new Date(1754774400000).toISOString()}`);
console.log(`   cURL end:   1755628800000 = ${new Date(1755628800000).toISOString()}`);
console.log(`   cURL duration: ${(1755628800000 - 1754774400000) / (1000 * 60 * 60 * 24)} days`);
console.log('');

console.log('💡 POTENTIAL ISSUES:');
console.log('   1. Local vs UTC timezone confusion');
console.log('   2. Date range too narrow (single day vs broader range)');
console.log('   3. End time precision (23:59:59.999 vs full next day)');
console.log('   4. Calendar business hours not matching our date range');
console.log('');

console.log('🎯 RECOMMENDATIONS TO TRY:');
console.log('   • Use UTC dates instead of local dates');
console.log('   • Try broader date ranges (week instead of single day)');
console.log('   • Use start of next day instead of 23:59:59.999');
console.log('   • Match the working cURL timestamp format more closely');
