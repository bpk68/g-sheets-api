
# Google Sheets Reader

Hello and welcome to this tiny (but hopefully mighty) utility package that will help you fetch, read and process data from a Google Sheet without the faff of having to deal with the [Google Sheets API](https://developers.google.com/sheets/api/).

[Skip to the how to use section](#how-to-use) or read on for more details.

## What is the Google Sheets Reader?

Google Sheets offers a really straightforward means to access data held in a Google Sheet via a special script call appended to a Sheet's _published_ URL. That is, the Google Sheet must be publicly to be able to call it.

This returns a JSON-style bundle of text which can be processed without the need for setting up the [Google Sheets API](https://developers.google.com/sheets/api/) and jumping through the fairly complex hoops to get it working.

The Google Sheets Reader allows you to simply call a function, pass in some options (including the Sheet id) and run a callback function with the returned, processed, formatted results.

## When to use this package

This package is a great option if some of the following needs suit your application:

- You need a simple means to store and retrieve structured, tabular data on the web
- You don't have the skills or inclination to work with the Google Sheets API
- The Google Sheets API is too costly or verbose to justify working with
- You have a relatively simple/straightforward dataset (e.g. not loads of sheets or huge number of rows)
- You are able to publish your data publicly

## When not to use this package

On the other hand, if you have some of the needs below apply more to you, then you might need to explore the Google Sheets API instead:

- You have a complex data structure within your Google Sheet involving multiple sheets, pivot tables, etc.
- You need to be able to leverage particular Google Sheets API features such as OAuth or caching
- You need more, fine-grain control over the data that is fetched and returned from the Sheet

## <a name="how-to-use"></a> How to use it

Right, the good part - getting started and using the reader!

The essential setup steps look like this:

1. Install the package
2. Set up a Google Sheet ready for access
3. Call the reader function
  1. The options object argument
  2. The callback argument
4. Process the results

### Install the package

First things first, let's get things installed. Run the following npm command from your favourite command line:

`npm install g-sheets-api --save-dev`

or, if you're more Yarn inclined (like I am), you'll need:

`yarn add --dev g-sheets-api`

And that's all there is to it.

### Set up a Google Sheet

If you have an existing Google Sheet you'd like to use, great! Otherwise, make a new one, enter your data and then make it public by following the publishing steps below:

1. Click File > Publish to the web
2. Select the 'Link' tab
3. Choose either 'Entire Document' or (more likely) a specific sheet name
4. In the next drop down, choose either 'Web page' or 'CSV'. It doesn't really matter which
5. Expand the section at the bottom
6. Check the box next to 'Automatically republish when changes are made'
7. Click 'Publish'

This is what your settings screen should look like...

![Google Sheets publishing settings - screenshot](demo/img/sheets-settings-screenshot.png?raw=true)

#### Get your Sheet id

You'll need the id value of your particular Sheet in order to fetch the results.

You can either get this from the URL of the open Sheet, or by clicking the 'Share' button and then 'Get shareable link'.

Either way, what you'll end up with is a URL that looks like this:

 https://docs.google.com/spreadsheets/d/1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg/edit?usp=sharing

 you want the part between the */d/* and the next */* character. So, for the above URL, the Sheet id would be:

 1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg

### Call the reader function

Now the exciting part - calling the actual reader!

First, import or require the package in your JavaScript file:

`const GSheetReader = require('g-sheet-api');`

The reader uses the JavaScript `fetch()` API to asynchronously fetch the data from the Google Sheet, converts the text data to JSON, formats the results to make them a little more consumable at your end and passes these formatted results back.

Because we're dealing with JavaScript Promises, in order to call and use the reader, you'll need to pass in an options object (explained below) and a callback function that will be passed the returned results from your Sheet.

```JavaScript
GSheetReader(options, results => {
  // do something with the results here
});
```

#### The options Object

You'll need to pass in an options object when you call the reader function in order to get things working correctly. The options object should look like this:

```JavaScript
const options = {
  sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
  returnAllResults: false,
  filter: {
    'department': 'archaeology'
  }
}
```

**Available options are**

- **sheetId** (required) - the id of the sheet you have made pulicly available, it will look something like this, *1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg*
- **returnAllResults** (optional) - if you wish to override the filter (perhaps for demoing or testing) then set this value to *true*
- **filter** (optional) - an object consisting of key/value pairs where *key* is a column header in the Sheet and *value* is the value to match for the filter.

### Process the results

The results item passed to your callback is an array of objects where the key is the column header from the Sheet and the value is the particular cell contents for that point in the row.

For example, using the demo sheet I have set up (in the URL's used above), the returned data looks like this:

```JavaScript
[
  {
    "Module Code" : "COM00001C-A",
    "Module Description" : "Introduction to computer architectures",
    "Year / Stage" : "1",
	   "Term Run": "Full Year",
     "Assessment Type" : "Open/Closed",
     "Assessment Month" : "Autumn/Spring",
     Credits : 15,
     Department : "Computer Science"
  },
  {
    "Module Code" : "COM00002C-A",
    "Module Description" : "Mathmatical foundations of computer science",
    "Year / Stage" : "1",
	   "Term Run": "Full Year",
     "Assessment Type" : "Closed Exam",
     "Assessment Month" : "Summer Term",
     Credits : 20,
     Department : "Computer Science"
  },
  {
    // ...etc.
  }
]
```

The reader doesn't make any assumptions on how you might like to present your data or what you should do with it, it simply formats the data in a flexible way so that you can do with it as you choose.


#### An advanced example to create an HTML table from the results

Here is a complete example that takes the returned results and creates a HTML table with them.

```JavaScript
GSheetReader(options, results => {

  const table = document.createElement('table');
  const header = table.createTHead();
  const headerRow = header.insertRow(0);
  const tbody = table.createTBody();

  // First, create a header row
  Object.getOwnPropertyNames(results[0]).forEach(colName => {
    const cell = headerRow.insertCell(-1);
    cell.innerHTML = colName;
  });

  // Next, fill the rest of the rows with the lovely data
  results.forEach(result => {
    const row = tbody.insertRow(-1);

    Object.keys(result).forEach(key => {
      const cell = row.insertCell(-1);
      cell.innerHTML = result[key];
    })
  });

  const main = document.querySelector('#output');
  main.innerHTML = "";
  main.append(table);
});
```
