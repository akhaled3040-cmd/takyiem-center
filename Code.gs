/**
 * TAKYIEM Call Center Dashboard
 * Bind this Apps Script project to the Google Sheet that contains:
 * Interested, Inquiries, Booking Not Completed
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('TAKYIEM | Call Center Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function getDashboardData() {
  const SPREADSHEET_ID = '1O02FcTdZlkowogObQ9uFn2rHhcNzroC17h2GQOJzh0A';
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const tabNames = ['Interested', 'Inquiries', 'Booking Not Completed'];
  const result = {
    updatedAt: new Date().toISOString(),
    categories: [],
    leads: [],
    sources: {},
    agents: {},
    monthly: {}
  };

  tabNames.forEach(function(tabName) {
    const sh = ss.getSheetByName(tabName);
    if (!sh) throw new Error('Missing sheet: ' + tabName);

    const rawValues = sh.getDataRange().getValues();
    const displayValues = sh.getDataRange().getDisplayValues();
    const values = rawValues;
    if (values.length < 3) {
      result.categories.push({name: tabName, count: 0});
      return;
    }

    // Row 2 contains headers; records start on row 3.
    let count = 0;
    for (let i = 2; i < values.length; i++) {
      const row = values[i];
      const name = row[0];
      if (!name || String(name).trim() === '') continue;

      const dateValue = row[2];
      const date = dateValue instanceof Date
        ? Utilities.formatDate(dateValue, ss.getSpreadsheetTimeZone(), 'yyyy-MM-dd')
        : String(dateValue || '').trim();

      const lead = {
        category: tabName,
        name: String(name).trim(),
        phone: String(displayValues[i][1] || '').trim(),
        date: date,
        source: String(row[3] || '').trim(),
        agent: String(row[4] || '').trim(),
        originalStatus: String(row[5] || '').trim(),
        notes: String(row[6] || '').trim()
      };
      result.leads.push(lead);
      count++;

      const source = lead.source || 'Not specified';
      result.sources[source] = (result.sources[source] || 0) + 1;
      const agent = lead.agent || 'Not specified';
      result.agents[agent] = (result.agents[agent] || 0) + 1;
      const month = date && /^\d{4}-\d{2}/.test(date) ? date.slice(0,7) : 'Unknown';
      result.monthly[month] = (result.monthly[month] || 0) + 1;
    }
    result.categories.push({name: tabName, count: count});
  });

  return result;
}
