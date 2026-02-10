/**
 * Google Apps Script - GA4 Analytics API
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create new project, paste this code
 * 3. Click "Services" (+) → Add "Google Analytics Data API"
 * 4. Replace PROPERTY_ID below with your GA4 property ID
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and add to your portfolio
 */

// Replace with your GA4 Property ID (found in GA Admin → Property Settings)
const PROPERTY_ID = '475aborting186072';  // Your GA4 property ID

function doGet(e) {
  try {
    const data = getAnalyticsData();
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getAnalyticsData() {
  const analyticsData = AnalyticsData.Properties.runReport({
    dimensions: [],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'totalUsers' },
      { name: 'averageSessionDuration' }
    ],
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }]
  }, 'properties/' + PROPERTY_ID);

  const row = analyticsData.rows[0];
  
  return {
    pageViews: parseInt(row.metricValues[0].value) || 0,
    visitors: parseInt(row.metricValues[1].value) || 0,
    avgSessionDuration: parseFloat(row.metricValues[2].value) || 0,
    period: 'Last 30 days'
  };
}

// Test function - run this to verify it works
function testAnalytics() {
  const data = getAnalyticsData();
  console.log(data);
}
