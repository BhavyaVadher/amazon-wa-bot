require('dotenv').config();
const { google } = require('googleapis');

const SHEET_NAME = 'Candidates';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuth() {
  return new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    SCOPES
  );
}

async function getNextId(sheets) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A:A`,
  });
  const rows = res.data.values || [];
  return rows.length; // row 1 = header, so length = next ID
}

async function appendCandidate(data) {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const id = await getNextId(sheets);

  const row = [
    id,
    data.name,
    data.email,
    data.loginCode,
    data.appPassword,
    data.contact,
    data.availability,
    data.shift,
    data.cities,
    data.visa,
    data.sin,
    data.dob,
    data.address,
    data.postalCode,
    data.landingDate,
    data.workedBefore,
    data.prevLocation || '',
    data.workDateRange || '',
    data.whatsappNumber,
    data.submittedAt,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A:T`,
    valueInputOption: 'RAW',
    requestBody: { values: [row] },
  });
}

async function initSheet() {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${SHEET_NAME}!A1:T1`,
  });

  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `${SHEET_NAME}!A1:T1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'ID', 'Full Name', 'Amazon Email', '6-Digit Login Code',
          '16-Digit App Password', 'Contact Number', 'Availability',
          'Shift Preference', 'Cities', 'Visa Status', 'SIN Number',
          'Date of Birth', 'Address', 'Postal Code', 'Landing Date in Canada',
          'Worked at Amazon Before', 'Previous Amazon Location',
          'Work Date Range', 'WhatsApp Number', 'Submission Timestamp',
        ]],
      },
    });
  }
}

module.exports = { appendCandidate, initSheet };
