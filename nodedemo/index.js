var gSheetsApi = require('../build/index');

console.log('welcome to the dev server...');
console.log('loading your GSheet...');

gSheetsApi(
  {
    sheetId: '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc',
    sheetNumber: 2
  },
  results => {
    console.log(results);
  }
);
