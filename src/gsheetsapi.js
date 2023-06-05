import fetch from 'cross-fetch';

const gsheetsAPI = async function ({
  apiKey,
  sheetId,
  sheetName,
  sheetNumber = 1,
}) {
  try {
    // Check for incorrect starting sheet number
    if (sheetNumber < 1 || sheetNumber > 1000) {
      sheetNumber = 1;
    }

    // Need to fetch correct sheet if sheetNumber is used
    const baseSheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;

    if (
      !sheetName ||
      sheetName === '' ||
      sheetName === null ||
      sheetName === undefined
    ) {
      const sheetDataUrl = `${baseSheetsUrl}?key=${apiKey}`;
      const response = await fetch(sheetDataUrl);
      const data = await response.json();

      if (data?.sheets?.length > 0) {
        sheetName =
          data?.sheets[sheetNumber - 1] !== undefined
            ? data.sheets[sheetNumber - 1]?.properties?.title
            : sheetName;
      }
    }

    const sheetsUrl = `${baseSheetsUrl}/values/${encodeURIComponent(
      sheetName
    )}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;

    return fetch(sheetsUrl)
      .then((response) => {
        if (!response.ok) {
          console.log('there is an error in the gsheets response');
          throw new Error('Error fetching GSheet');
        }
        return response.json();
      })
      .then((data) => data)
      .catch((err) => {
        throw new Error(
          'Failed to fetch from GSheets API. Check your Sheet Id and the public availability of your GSheet.'
        );
      });
  } catch (err) {
    throw new Error(`General error when fetching GSheet: ${err}`);
  }
};

export default gsheetsAPI;
