import GSheetProcessor from '../src/gsheetsprocessor.js'

// test Sheet url
const demoSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNecew9RqdOMQBmeVLdZT1Mu5x0lsapOQ-h-u8tQYWnjynFVNnL9U4IFMHn13nT7npV4348vk9Qr0X/pubhtml';

// test sheet id
const demoSheetId = '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg';

const options = {
  sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
  sheetNumber: 1,
  returnAllResults: false,
  filter: {
    'department': 'archaeology'
  }
}

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
    })
  });

  const main = document.querySelector('#output');
  main.innerHTML = "";
  main.append(table);
});
