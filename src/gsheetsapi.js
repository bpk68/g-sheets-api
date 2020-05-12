import nodefetch from 'node-fetch';

const gsheetsAPI = function (sheetId, sheetNumber = 1) {
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
          throw new Error('Error fetching sheet');
        }

        return response.text();
      })
      .then(resultText => {
        const formattedText = resultText.replace('gdata.io.handleScriptLoaded(', '').slice(0, -2);
        return JSON.parse(formattedText);
      });

  } catch (err) {
    console.log(`gsheetsAPI error: ${err}`);

    return {};
  }
};

export default gsheetsAPI;
