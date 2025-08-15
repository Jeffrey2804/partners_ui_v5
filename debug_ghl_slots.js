// Quick debug test for GHL free slots
// Run this in your browser console while on the dashboard

async function debugGHLSlots() {
  console.log('🔍 Debug: Testing GHL Free Slots...');
  
  // Test with different calendar IDs you might have
  const testCalendars = [
    'U9qdnx6IVYmZTS1ccbiY', // From your docs
    // Add your actual calendar IDs here if you know them
  ];
  
  for (const calId of testCalendars) {
    try {
      console.log(`\n📅 Testing calendar: ${calId}`);
      
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      
      // Test the API endpoint directly
      const response = await fetch(`https://services.leadconnectorhq.com/calendars/${calId}/free-slots?startDate=${today.getTime()}&endDate=${tomorrow.getTime()}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer pit-1dd731f9-e51f-40f7-bf4e-9e8cd31ed75f',
          'Version': '2021-04-15',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success for ${calId}:`, {
          status: response.status,
          keys: Object.keys(data),
          hasSlots: !!data.slots,
          hasDates: !!data._dates_,
          dataLength: JSON.stringify(data).length,
        });
      } else {
        console.error(`❌ Failed for ${calId}:`, response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error(`💥 Exception for ${calId}:`, error);
    }
  }
}

// Run the debug
debugGHLSlots();
