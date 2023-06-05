# Google Sheets Reader

Hello and welcome to this tiny (but hopefully mighty) utility package that will help you fetch, read and process data from a Google Sheet without the faff of having to deal with the [Google Sheets API](https://developers.google.com/sheets/api/).

> **Note**: v2.0.0 of this package introduced breaking changes and a significant rewrite of the internals of the package. This is due to Googles end of support for the Google Sheets API v3, forcing a migration to v4. If you follow this readme doc you'll be fine, the biggest change will be that you need to create your own API key using Google Cloud Console.

[Skip to the how to use section](#how-to-use) or read on for more details.

## What is the Google Sheets Reader

Google Sheets offers a really straightforward means to access data held in a Google Sheet via a special script call appended to a Sheet's _published_ URL. That is, the Google Sheet must be made public to be able to call it.

This returns a JSON-style bundle of data which can be processed without the need for using the more complex [Google Sheets API library](https://developers.google.com/sheets/api) and jumping through the fairly complex hoops to get it working.

The Google Sheets Reader allows you to simply call a function, pass in some options (including the Sheet id and an API key) and run a callback function with the returned, processed, formatted results.

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
3. Generate a Google Sheets API key
4. Call the reader function
5. The options object argument
6. The callback argument
7. Process the results

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

Next, you'll need to make the sheet available to anyone with the link (**in read-only mode**):

1. In the top right of the screen, hit the 'Share' button
2. Change the dropdown option to 'Anyone with the link'
3. Make sure to leave the right hand drop down on 'Viewer', this way your sheet will remain read-only to the internet
4. Hit 'Done'

This is what the box looks like:

![Google Sheets public link settings - screenshot](demo/img/sheets-link-settings.png?raw=true)

And that's all the Sheet setup work done!

#### Get your Sheet id

You'll need the id value of your particular Sheet in order to fetch the results.

You can either get this from the URL of the open Sheet, or by clicking the 'Share' button and then 'Get shareable link'.

Either way, what you'll end up with is a URL that looks like this:

<https://docs.google.com/spreadsheets/d/1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc/edit>

you want the part between the _/d/_ and the next _/_ character. So, for the above URL, the Sheet id would be:

`1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc`

### Generate a Google Sheets API key

Since Google introduced Sheets API v4, you'll need to [create a Google Cloud Project](https://developers.google.com/sheets/api/quickstart/js) and generate an API key to access any information from a Google Sheet.

Effectively you need to set up a new Google Cloud Project, then enable the Google Sheets API access for that project, and finally, generate an API key.

> Whilst a little bit of extra leg work is needed here, all this is 100% free and includes generous API limits from Google so it's worth setting up.

There is more information in these guides:

- https://developers.google.com/workspace/guides/create-project
- https://developers.google.com/sheets/api/guides/authorizing

### Call the reader function

Now the exciting part - calling the actual reader!

First, import or require the package in your JavaScript file:

`const GSheetReader = require('g-sheets-api');`

The reader uses the JavaScript `fetch()` API to asynchronously fetch the data from the Google Sheet, converts the text data to JSON, formats the results to make them a little more consumable at your end and passes these formatted results back.

Because we're dealing with JavaScript Promises, in order to call and use the reader, you'll need to pass in an options object (explained below) and a callback function that will be passed the returned results from your Sheet.

```JavaScript
GSheetReader(
  options,
  results => {
    // do something with the results here
  },
  error => {
    // OPTIONAL: handle errors here
  });
```

### Handling errors

There's a good change something might go wrong at the fetching from GSheets end. It could be that you've entered an incorrect Sheet Id, that the Sheet isn't publicly available yet (it's not an instant publish process from Google), or some other in-transit error.

To handle this, we've got a couple of options:

1. Handle the error in the returned promise using a `.catch()` block;
2. Supply the `GSheetReader()` function with an optional error handling function as a third argument.

#### Using a `.catch()` block

The `GSheetsReader` will return a typical JS promise object. Therefore, you can catch any errors using the `.catch()` block like this:

```js
GSheetReader(options, (results) => {
  // do something with the results here
}).catch((err) => {
  // do something with the error message here
});
```

#### Using an optional error callback

If you don't want to handle things with the `.catch()` block, then you can supply an optional error handling function as a third argument to the `GSheetsReader` function.

```js
GSheetReader(
  options,
  (results) => {
    // do something with the results here
  },
  (error) => {
    // OPTIONAL: handle errors here
  }
);
```

### The options Object

You'll need to pass in an options object when you call the reader function in order to get things working correctly. The options object should look like this:

```JavaScript
const options = {
  apiKey: 'BIfqSyD4ZoTrXMfF2mhAMVNNiensNsWL4XC6Sxc'
  sheetId: '1_IpENDkoujmWr-B0M2ZVcyvgPQGeKwYxfHX_JYTDtRc',
  sheetNumber: 1,
  sheetName: 'myCustomSheetName', // if sheetName is supplied, this will take precedence over sheetNumber
  returnAllResults: false,
  filter: {
    'department': 'archaeology',
    'module description': 'introduction'
  },
  filterOptions: {
    operator: 'or',
    matching: 'loose'
  }
}
```

**Available options are**

- **apiKey** (required) - the API key you generated in the steps above. It will look something like this: 'AIerSyF4ZoTrXMfG9mhAMVNNiensNsWL5XC6Ssl'
- **sheetId** (required) - the id of the sheet you have made pulicly available, it will look something like this, _1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg_,
- **sheetNumber** (optional) - _default = 1_ - if you'd like to choose a different sheet number than the first, supply this argument with the _non-zero_ index based sheet number - i.e. for the second sheet, you'd supply `sheetNumber: 2`.
- **sheetName** (optional) - if you're using custom names for your Sheets (i.e. not the default 'Sheet1', 'Sheet2', etc.), then you can supply a `sheetName` option here with the string name of the sheet name you wish to find. **Note that if `sheetName` is supplied to the options object, it will override the `sheetNumber` value if also supplied.**
- **returnAllResults** (optional) - if you wish to override the filter (perhaps for demoing or testing) then set this value to _true_
- **filter** (optional) - an object consisting of key/value pairs where _key_ is a column header in the Sheet and _value_ is the value to match for the filter.
- **filterOptions** - (optional) - to better control the filter's matching, you can optionally supply a _filterOptions_ object consisting of the following properties:
  - **operator** - _default = 'or'_ - supplying either _'or'_ or _'and'_, this dictates whether to match ALL the values in the row, or ANY of them -- e.g. when supplying 'or', if any of the row's values match, that row will be returned.
  - **matching** - _default = 'loose'_ - with matching, if you wish to control how strictly the filter matches against the cell's value, you can supply _'loose'_, which offers a fuzzy search, or _'strict'_ which is more picky. For example, 'loose' would match 'introduction' in the following sentence, 'introduction to mathematatics', but 'strict' would not.

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

## Demo

You can checkout this source code and install the dependencies using `yarn install`.

Next, you'll need to add a `.env` file in the root of the project and add the following value into it:

```
SHEETS_API_KEY='YOUR_API_KEY'
```

> **Note** you should replace the `YOUR_API_KEY` bit with your own Google Sheets API key

Once you've done that, you can run `yarn start` which will fire up a local demo and show you a set of results.

If you'd rather just skip this and take a look at a live demo, then you can view [this CodeSandbox live demo](https://codesandbox.io/s/g-sheets-reader-demo-qm5r0) instead.

### Access to the demo GSheet

In the demos (both within this very repo and in my [website article on using the GSheets reader](https://robkendal.co.uk/blog/reading-google-sheets-data-using-javascript-with-google-sheets-reader)), I make reference to a demo sheet I have in my own Google account. Many people request access to this, but unfortunately this won't be granted because of security issues.

However, in case you'd like to recreate the exact same sheet I have, here's a screenshot:

![Google Sheet demo sheet content - screenshot](demo/img/g-sheets-demo-sheet-screenshot.png?raw=true)

## A note on Node support

This package can also be run via a Node backend or Node server. Added in v1.3.0, the native browser-based `fetch` support was replaced with a call to `node-fetch` depending on the calling environment.

### Node based demo

There is also a Node-based demo available in the repo. If you clone the repo and install it (`yarn install`), then run a build of the GSheets module (`yarn build`), then browse to `/nodedemo/` and run the following commands whilst in that directory:

- `yarn install`
- `yarn start`

You'll see a console log of the demo sheet output to the CLI.
