import nodefetch from 'node-fetch';

const gsheetsAPI = function (sheetId, sheetNumber = 1) {
  const errorObj = { hasError: true };
  let fetchFunc;

  try {
    fetchFunc = window.fetch;
  } catch (err) {
    fetchFunc = nodefetch;
  }

  try {
    const sheetsUrl = `https://spreadsheets.google.com/feeds/cells/${sheetId}/${sheetNumber}/public/values?alt=json-in-script`;

    return fetchFunc(sheetsUrl)
      .then(response => {
        if (!response.ok) {
          console.log('there is an error in the gsheets response');
          throw new Error('Error fetching GSheet');
        }
        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText
          .replace('gdata.io.handleScriptLoaded(', '')
          .slice(0, -2);
        return JSON.parse(formattedText);
      })
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
