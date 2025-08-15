/**
 * Test file for GHL Calendar Events API
 *
 * This file can be used to test the getCalendarEvents function
 * with proper error handling and no console.log violations.
 */

const { getCalendarEvents, getCalendarDetails } = require('../src/shared/services/api/ghlCalendarService');

/**
 * Test the getCalendarDetails function
 * @param {string} calendarId - Calendar ID to test with
 * @returns {Promise<Object>} - API response or error
 */
async function testGetCalendarDetails(calendarId) {
  try {
    const result = await getCalendarDetails(calendarId);
    return {
      success: true,
      data: result,
      calendarName: result.name || 'Unknown',
      calendarId: result.id || calendarId,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      errorType: getErrorType(error.message),
    };
  }
}

/**
 * Test the getCalendarEvents function
 * @param {string} calendarId - Calendar ID to test with
 * @param {string} startTime - Start time in ISO format
 * @param {string} endTime - End time in ISO format
 * @returns {Promise<Object>} - API response or error
 */
async function testGetCalendarEvents(calendarId, startTime, endTime) {
  try {
    const result = await getCalendarEvents(calendarId, startTime, endTime);
    return {
      success: true,
      data: result,
      eventCount: result.events?.length || 0,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      errorType: getErrorType(error.message),
    };
  }
}

/**
 * Categorize error types for better handling
 * @param {string} errorMessage - The error message
 * @returns {string} - Error category
 */
function getErrorType(errorMessage) {
  if (errorMessage.includes('GHL_API_TOKEN')) {
    return 'MISSING_TOKEN';
  }
  if (errorMessage.includes('HTTP 401')) {
    return 'AUTHENTICATION';
  }
  if (errorMessage.includes('HTTP 404')) {
    return 'NOT_FOUND';
  }
  if (errorMessage.includes('Network error')) {
    return 'NETWORK';
  }
  if (errorMessage.includes('required and must be')) {
    return 'VALIDATION';
  }
  return 'UNKNOWN';
}

/**
 * Get events for the current week
 * @param {string} calendarId - Calendar ID
 * @returns {Promise<Object>} - API response or error
 */
async function getCurrentWeekEvents(calendarId) {
  const now = new Date();

  // Calculate start of week (Monday)
  const startOfWeek = new Date(now);
  const dayOfWeek = startOfWeek.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startOfWeek.setDate(startOfWeek.getDate() + daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Calculate end of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return testGetCalendarEvents(
    calendarId,
    startOfWeek.toISOString(),
    endOfWeek.toISOString(),
  );
}

/**
 * Validate environment setup
 * @returns {Object} - Validation result
 */
function validateEnvironment() {
  const issues = [];

  if (!process.env.GHL_API_TOKEN) {
    issues.push('GHL_API_TOKEN environment variable is missing');
  }

  return {
    isValid: issues.length === 0,
    issues,
    apiVersion: process.env.GHL_API_VERSION || '2021-04-15',
  };
}

module.exports = {
  testGetCalendarEvents,
  testGetCalendarDetails,
  getCurrentWeekEvents,
  validateEnvironment,
  getErrorType,
};
