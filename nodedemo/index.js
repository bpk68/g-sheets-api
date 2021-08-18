var gSheetsApi = require('../build/index');

console.log('welcome to the dev server...');
console.log('loading your GSheet...');

gSheetsApi(
  {
    sheetId: '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc',
    sheetNumber: 1,
    apiKey: 'ADD_YOUR_API_KEY_HERE',
  },
  results => {
    console.log(results);
  }
);
