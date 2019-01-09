import GSheetProcessor from './gsheetsprocessor.js';

const reader = (options, callback) => {
  GSheetProcessor(options, results => {
    callback(results);
  });
};

module.exports = reader;

export default reader;
