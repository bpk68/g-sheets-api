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
      const itemValue = item[key]; // e.g. 'department' or 'undefined'

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
  const data = JSONResponse.feed.entry;
  const startRow = 2; // skip the header row(1), don't need it

  let processedResults = [{}];
  let colNames = {};

  for (let item of data) {
    const cell = item['gs$cell']; // gets cell data
    const val = cell['$t']; // gets cell value
    const columnNum = cell['col']; // gets the col number
    const thisRow = cell['row']; // gets the row number

    const colNameToAdd = colNames[columnNum]; // careful, this will be undefined if we hit it on the first pass

    // don't add this row to the return data, but add it to list of column names
    if (thisRow < startRow) {
      colNames[columnNum] = val.toLowerCase();
      continue; // skip the header row
    }

    if (typeof processedResults[thisRow] === 'undefined') {
      processedResults[thisRow] = {};
    }

    if (typeof colNameToAdd !== 'undefined' && colNameToAdd.length > 0) {
      processedResults[thisRow][colNameToAdd] = val;
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
  return GSheetsapi(
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
