import GSheetProcessor from './gsheetsprocessor.js';

const reader = (options, callback, onError) => {
  return GSheetProcessor(
    options,
    results => {
      callback(results);
    },
    error => {
      if (onError) {
        onError(error);
      } else {
        throw new Error(`g-sheets-api error: ${error}`);
      }
    }
  );
};

module.exports = reader;

export default reader;
