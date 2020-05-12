var gSheetsApi = require('../dist/index');

console.log('welcome to the dev server...');
console.log('loading your GSheet...');

gSheetsApi({
    sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
    sheetNumber: 2
}, results => {
    console.log(results);
})

