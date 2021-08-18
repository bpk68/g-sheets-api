import GSheetsapi from './gsheetsapi.js';

function matchValues(valToMatch, valToMatchAgainst, matchingType) {
  try {
    if (typeof valToMatch != 'undefined') {
      valToMatch = valToMatch.toLowerCase().trim();
      valToMatchAgainst = valToMatchAgainst.toLowerCase().trim();

      if (matchingType === 'strict') {
        return valToMatch === valToMatchAgainst;
      }

      if (matchingType === 'loose') {
        return (
          valToMatch.includes(valToMatchAgainst) ||
          valToMatch == valToMatchAgainst
        );
      }
    }
  } catch (e) {
    console.log(`error in matchValues: ${e.message}`);
    return false;
  }

  return false;
}

function filterResults(resultsToFilter, filter, options) {
  let filteredData = [];

  // now we have a list of rows, we can filter by various things
  return resultsToFilter.filter(item => {

    // item data shape
    // item = {
    //   'Module Name': 'name of module',
    //   ...
    //   Department: 'Computer science'
    // }

    let addRow = null;
    let filterMatches = [];

    if (
      typeof item === 'undefined' ||
      item.length <= 0 ||
      Object.keys(item).length <= 0
    ) {
      return false;
    }

    Object.keys(filter).forEach(key => {
      const filterValue = filter[key]; // e.g. 'archaeology'

      // need to find a matching item object key in case of case differences
      const itemKey = Object.keys(item).find(thisKey => thisKey.toLowerCase().trim() === key.toLowerCase().trim());
      const itemValue = item[itemKey]; // e.g. 'department' or 'undefined'

      filterMatches.push(
        matchValues(itemValue, filterValue, options.matching || 'loose')
      );
    });

    if (options.operator === 'or') {
      addRow = filterMatches.some(match => match === true);
    }

    if (options.operator === 'and') {
      addRow = filterMatches.every(match => match === true);
    }

    return addRow;
  });
}

function processGSheetResults(
  JSONResponse,
  returnAllResults,
  filter,
  filterOptions
) {
  const data = JSONResponse.values;
  const startRow = 1; // skip the header row(1), don't need it

  let processedResults = [{}];
  let colNames = {};

  for (let i = 0; i < data.length; i++) {
    // Rows
    const thisRow = data[i];
    
    for (let j = 0; j < thisRow.length; j++) {
      // Columns/cells
      const cellValue = thisRow[j];
      const colNameToAdd = colNames[j]; // this will be undefined on the first pass
      
      if (i < startRow) {
        colNames[j] = cellValue;
        continue; // skip the header row
      }

      if (typeof processedResults[i] === 'undefined') {
        processedResults[i] = {};
      }
  
      if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
        processedResults[i][colNameToAdd] = cellValue;
      }
    }    
  }

  // make sure we're only returning valid, filled data items
  processedResults = processedResults.filter(
    result => Object.keys(result).length
  );

  // if we're not filtering, then return all results
  if (returnAllResults || !filter) {
    return processedResults;
  }

  return filterResults(processedResults, filter, filterOptions);
}

const gsheetProcessor = function (options, callback, onError) {

  if(!options.apiKey || options.apiKey === undefined) {
    throw new Error('Missing Sheets API key');
  }
  
  return GSheetsapi(
    options.apiKey,
    options.sheetId,
    options.sheetNumber ? options.sheetNumber : 1
  )
    .then(result => {
      const filteredResults = processGSheetResults(
        result,
        options.returnAllResults || false,
        options.filter || false,
        options.filterOptions || {
          operator: 'or',
          matching: 'loose'
        }
      );

      callback(filteredResults);
    })
    .catch(err => onError(err.message));
};

export default gsheetProcessor;
