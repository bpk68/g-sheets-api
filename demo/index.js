import GSheetProcessor from '../src/gsheetsprocessor.js';

// test Sheet url
const demoSheetURL = 'https://docs.google.com/spreadsheets/d/1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc/edit#gid=0';

// test sheet id, Sheets API key, and valid auth scope
const demoSheetId = '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc';
const apiKey = process.env.SHEETS_API_KEY;

const options = {
  apiKey: apiKey,  
  sheetId: demoSheetId,
  sheetNumber: 1,
  returnAllResults: false,
  filter: {
    department: 'archaeology',
    'module description': 'introduction'
  },
  filterOptions: {
    operator: 'or',
    matching: 'loose',
  }
};

GSheetProcessor(
  options,
  results => {
    const table = document.createElement('table');
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const tbody = table.createTBody();

    // First, create a header row
    Object.getOwnPropertyNames(results[0]).forEach(colName => {
      const cell = headerRow.insertCell(-1);
      cell.innerHTML = colName;
    });

    // Next, fill the rest of the rows with the lovely data
    results.forEach(result => {
      const row = tbody.insertRow(-1);

      Object.keys(result).forEach(key => {
        const cell = row.insertCell(-1);
        cell.innerHTML = result[key];
      });
    });

    const main = document.querySelector('#output');
    main.innerHTML = '';
    main.append(table);
  },
  error => {
    console.log('error from sheets API', error);
    const main = document.querySelector('#output');
    main.innerHTML = `Error while fetching sheets: ${error}`;
  }
);
