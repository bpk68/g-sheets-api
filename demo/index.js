import GSheetProcessor from '../src/gsheetsprocessor.js';

// test Sheet url
const demoSheetURL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKkGwAKTEhHgPZPrYsszEGBVMNRR9ukXN7CzbGmWuNWiLNyYeTOzEpwKoBa1-kksaf3R60a_3vfQHW/pubhtml';

// test sheet id
const demoSheetId = '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc';

const options = {
  sheetId: '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc',
  sheetNumber: 1,
  returnAllResults: false,
  filter: {
    department: 'archaeology',
    'module description': 'introduction'
  },
  filterOptions: {
    operator: 'or',
    matching: 'loose'
  }
};

GSheetProcessor(options, results => {
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
});
