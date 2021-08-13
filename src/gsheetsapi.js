import fetch from 'cross-fetch';

const gsheetsAPI = function (sheetId, sheetNumber = 1) {
  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json`;

    return fetch(sheetsUrl)
      .then(response => {
        console.log(response);
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
