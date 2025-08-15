// Test different GHL API endpoints to find available slots
import { GHL_CONFIG } from './src/config/ghlConfig.js';

async function testDifferentEndpoints() {
  console.warn('🔍 Testing Different GHL Endpoints for Slots...\n');

  const locationId = 'b7vHWUGVUNQGoIlAXabY';
  const calendarId = 'U9qdnx6IVYmZTS1ccbiY';
  const today = new Date();
  const startDate = Math.floor(today.getTime() / 1000);
  const endDate = Math.floor((today.getTime() + 7 * 24 * 60 * 60 * 1000) / 1000);

  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${GHL_CONFIG.token}`,
    'Version': '2021-04-15',
  };

  // Test 1: Current free-slots endpoint (individual calendar)
  console.warn('1️⃣ Testing: Individual Calendar Free Slots');
  try {
    const url = `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=America%2FLos_Angeles`;
    console.warn('   URL:', url);

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    console.warn('   Status:', response.status);
    console.warn('   Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('   Error:', error.message);
  }

  // Test 2: Calendar group endpoint
  console.warn('\n2️⃣ Testing: Calendar Groups');
  try {
    const url = `https://services.leadconnectorhq.com/calendars/groups?locationId=${locationId}`;
    console.warn('   URL:', url);

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    console.warn('   Status:', response.status);
    console.warn('   Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('   Error:', error.message);
  }

  // Test 3: Calendar events endpoint (might show availability)
  console.warn('\n3️⃣ Testing: Calendar Events');
  try {
    const url = `https://services.leadconnectorhq.com/calendars/events?locationId=${locationId}&calendarId=${calendarId}&startTime=${new Date(startDate * 1000).toISOString()}&endTime=${new Date(endDate * 1000).toISOString()}`;
    console.warn('   URL:', url);

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    console.warn('   Status:', response.status);
    console.warn('   Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('   Error:', error.message);
  }

  // Test 4: Calendar list (to see what calendars exist)
  console.warn('\n4️⃣ Testing: Calendar List');
  try {
    const url = `https://services.leadconnectorhq.com/calendars/?locationId=${locationId}`;
    console.warn('   URL:', url);

    const response = await fetch(url, { method: 'GET', headers });
    const data = await response.json();

    console.warn('   Status:', response.status);
    console.warn('   Response Keys:', Object.keys(data));
    console.warn('   Calendars Count:', data.calendars ? data.calendars.length : 'No calendars property');

    if (data.calendars && data.calendars.length > 0) {
      console.warn('   First Calendar:', JSON.stringify(data.calendars[0], null, 2));
    }

  } catch (error) {
    console.error('   Error:', error.message);
  }

  // Test 5: Try validate-slug endpoint (from your curl)
  console.warn('\n5️⃣ Testing: Validate Slug (from your curl)');
  try {
    const url = 'https://services.leadconnectorhq.com/calendars/groups/validate-slug';
    console.warn('   URL:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: locationId,
        slug: 'calendar-1',
      }),
    });
    const data = await response.json();

    console.warn('   Status:', response.status);
    console.warn('   Response:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('   Error:', error.message);
  }

  console.warn('\n🎯 Analysis Complete - Check which endpoint returns slot data');
}

testDifferentEndpoints();
