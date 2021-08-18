import fetch from 'cross-fetch';

const gsheetsAPI = function (apiKey, sheetId, sheetNumber = 1) {
  try {    
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet${sheetNumber}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;
    
    return fetch(sheetsUrl)
      .then(response => {        
        if (!response.ok) {
          console.log('there is an error in the gsheets response');
          throw new Error('Error fetching GSheet');
        }
        return response.json();
      })
      .then(data => data)
      .catch(err => {
        throw new Error(
          'Failed to fetch from GSheets API. Check your Sheet Id and the public availability of your GSheet.'
        );
      });
  } catch (err) {
    throw new Error(`General error when fetching GSheet: ${err}`);
  }
};

export default gsheetsAPI;
