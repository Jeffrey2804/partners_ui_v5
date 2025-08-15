// Copy and paste this into your browser console (F12) when on the dashboard
// This will test the GHL free slots API directly

async function testGHLConnection() {
  console.log('🧪 Testing GHL Free Slots API...');
  
  // Test with the sample calendar from your docs
  const testCalendarId = 'U9qdnx6IVYmZTS1ccbiY'; // Replace with your actual calendar ID
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  
  console.log('📋 Using parameters:', {
    calendarId: testCalendarId,
    startDate: today.toISOString().split('T')[0],
    endDate: tomorrow.toISOString().split('T')[0],
  });
  
  try {
    // Import the function (this should work in the browser context)
    const { fetchFreeSlotsForDate } = await import('./apps/dashboard/src/shared/services/api/freeSlotsApi.js');
    
    const result = await fetchFreeSlotsForDate(testCalendarId, today);
    
    console.log('✅ API Result:', {
      success: result.success,
      slotsCount: result.slots?.length || 0,
      error: result.error || 'none',
      rawResponse: result.rawResponse,
    });
    
    if (result.slots && result.slots.length > 0) {
      console.log('📅 First 3 slots:', result.slots.slice(0, 3));
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testGHLConnection();
