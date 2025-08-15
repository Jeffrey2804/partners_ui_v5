// ========================================
// 🎯 CALENDAR APPOINTMENTS FETCH EXAMPLE
// ========================================
// This example demonstrates the proper usage of the enhanced calendar appointment fetching function
// with robust date handling, API error management, and fallback to mock data.

import { fetchCalendarAppointmentsWithDateHandling } from '../src/shared/services/api/calendarApi.js';

/**
 * 🎯 Example 1: Using Date objects
 * The function accepts startTime and endTime as Date objects and converts them to ISO strings
 */
async function exampleWithDateObjects() {
  console.log('\n📅 Example 1: Using Date objects');
  console.log('=' .repeat(50));

  // Create date range: last 7 days to next 7 days
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - 7); // 7 days ago

  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 7); // 7 days from now

  console.log(`📍 Start Date: ${startTime.toISOString()}`);
  console.log(`📍 End Date: ${endTime.toISOString()}`);

  try {
    const result = await fetchCalendarAppointmentsWithDateHandling(
      startTime, // Date object
      endTime,   // Date object
      {
        // Additional filters
        contactId: null,
        userId: null,
      },
    );

    if (result.success) {
      console.log(`✅ SUCCESS: Fetched ${result.data.length} appointments`);
      console.log(`🔍 Time Range: ${result.meta.timeRange.startTime} to ${result.meta.timeRange.endTime}`);

      // Display first few appointments
      result.data.slice(0, 3).forEach((appointment, index) => {
        console.log(`\n📋 Appointment ${index + 1}:`);
        console.log(`   📝 Title: ${appointment.title}`);
        console.log(`   📅 Start: ${appointment.startTime}`);
        console.log(`   📅 End: ${appointment.endTime}`);
        console.log(`   📊 Status: ${appointment.status}`);
        if (appointment.isMockData) {
          console.log('   🎭 Type: Mock Data (API fallback)');
        }
      });
    } else {
      console.log(`⚠️ API FAILED: ${result.error}`);
      console.log(`🎭 Fallback: Using ${result.data.length} mock appointments`);
      console.log('📊 Mock data generated for testing purposes');
    }

  } catch (error) {
    console.error('❌ Error in example:', error.message);
  }
}

/**
 * 🎯 Example 2: Using ISO strings
 * The function also accepts properly formatted ISO strings
 */
async function exampleWithISOStrings() {
  console.log('\n📅 Example 2: Using ISO strings');
  console.log('=' .repeat(50));

  // Create ISO string dates
  const startTime = '2025-08-12T00:00:00.000Z'; // Start of day
  const endTime = '2025-08-19T23:59:59.999Z';   // End of week

  console.log(`📍 Start Time: ${startTime}`);
  console.log(`📍 End Time: ${endTime}`);

  try {
    const result = await fetchCalendarAppointmentsWithDateHandling(
      startTime, // ISO string
      endTime,   // ISO string
      {
        userId: 'specific-user-id',
        contactId: 'specific-contact-id',
      },
    );

    console.log(`📊 API Success: ${result.success ? 'Yes' : 'No'}`);
    console.log(`📈 Data Count: ${result.data.length}`);
    console.log(`🎭 Is Mock Data: ${result.isMockData ? 'Yes' : 'No'}`);

    if (!result.success) {
      console.log(`⚠️ Error: ${result.error}`);
      console.log(`🔄 Fallback Reason: ${result.meta.fallbackReason}`);
    }

  } catch (error) {
    console.error('❌ Error in example:', error.message);
  }
}

/**
 * 🎯 Example 3: Error handling demonstration
 * Shows how the function handles invalid inputs
 */
async function exampleErrorHandling() {
  console.log('\n📅 Example 3: Error handling');
  console.log('=' .repeat(50));

  // Test with invalid dates
  const testCases = [
    {
      name: 'Invalid startTime',
      startTime: 'invalid-date-string',
      endTime: new Date(),
    },
    {
      name: 'StartTime after endTime',
      startTime: new Date('2025-08-20'),
      endTime: new Date('2025-08-10'),
    },
    {
      name: 'Non-string, non-Date startTime',
      startTime: 12345,
      endTime: new Date(),
    },
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    try {
      const result = await fetchCalendarAppointmentsWithDateHandling(
        testCase.startTime,
        testCase.endTime,
      );
      console.log(`📊 Result: ${result.success ? 'Success' : 'Failed'}`);
      if (!result.success) {
        console.log(`⚠️ Error: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Exception: ${error.message}`);
    }
  }
}

/**
 * 🎯 Main execution function
 */
async function runExamples() {
  console.log('🚀 Starting Calendar Appointments Fetch Examples');
  console.log('=' .repeat(70));

  try {
    await exampleWithDateObjects();
    await exampleWithISOStrings();
    await exampleErrorHandling();

    console.log('\n🎉 All examples completed!');
    console.log('=' .repeat(70));

  } catch (error) {
    console.error('💥 Fatal error running examples:', error);
  }
}

// Run the examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples();
}

export {
  exampleWithDateObjects,
  exampleWithISOStrings,
  exampleErrorHandling,
  runExamples,
};
