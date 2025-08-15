// Quick test of the active calendar
import { GHL_CONFIG } from './src/config/ghlConfig.js';

async function testActiveCalendar() {
  console.warn('🎯 Testing Active Calendar: Partner Consultation');

  const calendarId = 'U9qdnx6IVYmZTS1ccbiY'; // Partner Consultation - ACTIVE: true
  const today = new Date();
  const startDate = Math.floor(today.getTime() / 1000);
  const endDate = Math.floor((today.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000);

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${GHL_CONFIG.token}`,
    'Version': '2021-04-15',
  };

  console.warn('📅 Testing Date Range:');
  console.warn('  From:', new Date(startDate * 1000).toISOString());
  console.warn('  To:', new Date(endDate * 1000).toISOString());

  try {
    const url = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=America%2FLos_Angeles`;
    console.warn('🔗 URL:', url);

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    console.warn('📊 Response Status:', response.status);
    console.warn('📊 Response Keys:', Object.keys(data));
    console.warn('📊 Full Response:', JSON.stringify(data, null, 2));

    if (Object.keys(data).length > 1) {
      console.warn('🎉 SUCCESS: Found slot data beyond just traceId!');
    } else {
      console.warn('⚠️ Still only getting traceId - calendar might need team members or specific configuration');

      // The issue might be that even active calendars need team members assigned
      console.warn('\n💡 POSSIBLE REASONS FOR EMPTY SLOTS:');
      console.warn('   1. Calendar is active but has no team members assigned');
      console.warn('   2. Calendar working hours don\'t match the requested time range');
      console.warn('   3. All time slots are already booked');
      console.warn('   4. Calendar availability settings need adjustment');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testActiveCalendar();
