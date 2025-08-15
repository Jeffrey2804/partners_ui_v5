import { fetchFreeSlots } from '../../apps/dashboard/src/shared/services/api/freeSlotsApi.js';

// Test all the calendars from the list to identify working ones
async function testAllCalendars() {
  console.log('🔧 Testing All Available Calendars...\n');

  const calendarsToTest = [
    { name: 'Book With Jonathan Ferrell', id: 'FIt5F2PbZVrK846aJeJF' },
    { name: 'Partner Consultation', id: 'U9qdnx6IVYmZTS1ccbiY' },
    { name: 'Gmail Calendar', id: 'cF0lnbb4A2vCVdKQLrJp' },
    { name: 'Ricky Personal Calendar', id: 'sV3BiXrjzbfo1tSUdyHO' },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = Math.floor(today.getTime() / 1000);
  const endDate = Math.floor((today.getTime() + 24 * 60 * 60 * 1000) / 1000);

  const workingCalendars = [];
  const brokenCalendars = [];

  for (const calendar of calendarsToTest) {
    console.log(`\n📅 Testing: ${calendar.name}`);
    console.log(`   ID: ${calendar.id}`);

    try {
      const result = await fetchGHLCalendarFreeSlots(
        calendar.id,
        startDate,
        endDate,
        'America/Los_Angeles',
      );

      console.log(`   ✅ SUCCESS: ${result.slots?.length || 0} slots available`);
      workingCalendars.push({
        name: calendar.name,
        id: calendar.id,
        slots: result.slots?.length || 0,
      });

    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`);
      brokenCalendars.push({
        name: calendar.name,
        id: calendar.id,
        error: error.message,
      });
    }
  }

  console.log('\n📊 FINAL RESULTS:');
  console.log('\n✅ WORKING CALENDARS:');
  workingCalendars.forEach((cal, index) => {
    console.log(`  ${index + 1}. ${cal.name} (${cal.id}) - ${cal.slots} slots`);
  });

  console.log('\n❌ BROKEN CALENDARS:');
  brokenCalendars.forEach((cal, index) => {
    console.log(`  ${index + 1}. ${cal.name} (${cal.id}) - ${cal.error}`);
  });

  console.log('\n🎯 RECOMMENDED CALENDAR OPTIONS FOR DROPDOWN:');
  workingCalendars.forEach((cal, index) => {
    console.log(`  { label: '${cal.name}', value: '${cal.id}' },`);
  });
}

testAllCalendars();
