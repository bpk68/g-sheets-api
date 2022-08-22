# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Released]

## [2.1.2] 2021-08-31

### Changed

- Fixes sheet name/number issue 0eb9aa1
- upgrades some packages 95e809b

## [2.1.1] 2021-08-24

### Changed

- Adds support for special characters in sheet names a816878
- Closes #101

## [2.1.0] 2021-08-23

### Changed

- Merge pull request #100 from vinnyang/master 7ec8237
- Corrects variable name for consistency, updates readme file eaf4f45
- custom sheetname 75d9d32

## [2.0.0] 2021-08-18

### Changed

- Adds supporting screenshot 17fde66
- Rewrites internal code to support Google Sheets API v4 ec42868
- Merge branch 'master' of https://github.com/bpk68/g-sheets-api ad60cba
- Remove trailing console statements 9582536
- Merge pull request #96 from bpk68/renovate/pin-dependencies 543f390
- Pin dependency parcel-bundler to 1.12.5 0729d69

> Important, the g-sheets-api package will work just as it does now so you shouldn't need to alter your existing code. However, you will need to get hold of your own Google Sheets API key and add it to the calling options as apiKey.

You can learn more about generating a Google Sheets API key here >>> https://developers.google.com/sheets/api/guides/authorizing

You may also need to adjust the public sharing of your Sheet, by reading through the README.md file in the package.

## [1.5.1] 2021-08-13

### Changed

- Remove cache from repo 713c556
- Update renovate.json 3a1902a
- Merge pull request #95 from bpk68/renovate/babel-monorepo a0985dd
- Update dependency @babel/core to v7.15.0 caa1059
- Update node support from node-fetch to cross-fetch package
- Alters internal GSheets call to pull in JSON over text feed
- Update README.md for node support
- Fix node demo load issue

## [1.5.0] 2021-08-13

### Changed

- Update node support from node-fetch to cross-fetch package
- Alters internal GSheets call to pull in JSON over text feed
- Update README.md for node support
- Fix node demo load issue

## [1.4.2] 2021-07-27

### Changed

- Add support for missing cells returned from GSheets call
- Patch some security vulnerabilities
- Dependency updates and security patches

## [1.4.1] 2020-12-23

### Changed

- Fix casing issue when using column headers in filtering
- Replaced Webpack with Parcel JS for running the project demo
- Dependency updates and security patches

## [1.4.0] 2020-09-08

### Changed

- Dependency updates

## [1.3.0] 2020-05-13

### Changed

- Add support for running package from Node servers

## [1.2.1] 2020-05-12

### Changed

- Fixes missing sheet id options property

## [1.2.0] 2020-05-05

### Changed

- Add filterOptions property to control results filtering
- Update documentation

## [1.1.0] 2020-05-04

### Changed

- Fix security vulnerabilities in node dependencies
- Add option to read sheet data from specific sheets
- Update readme file with new instructions

## [1.0.3] 2019-11-27

### Changed

- Fix security vulnerabilities in node dependencies
