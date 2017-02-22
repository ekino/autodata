# Autodata

This project is a fork of [googleanalytics/autotrack](https://github.com/googleanalytics/autotrack) and is part
of the ekino github team.
You can find the project documentation at [ekino.github.io/autodata](https://ekino.github.io/autodata/)

## Table of contents
- [Requirements](#requirements)
- [Setup](#setup)
  - [Installation](#installation)
  - [Setup requirements](#setup-requirements)
- [Running autodata](#running-autodata)
  - [Running demo page](#running-demo-page)
  - [Running tests](#running-tests)
  - [Running documentation](#running-documentation)
- [Build autodata](#build-autodata)
- [Release autodata](#release-autodata)

# Requirements

- [Yarn](https://yarnpkg.com/)

# Setup

## Installation

 - ``git clone git@github.com:ekino/autodata.git``
 - ``make install``

## Setup requirements

### ENV vars
Create a copy of ENV.json.example and name it ENV.json in order to configure the
local environment variable for development.

# Running autodata

Every running script of autodata is listed here : demo page, unit tests, documentation

## Running demo page

Execute the following command to start autodata demo page

```
$ make dev
```

After what the demo page will be started at this url

- demo page: [http://localhost:8080/](http://localhost:8080/) - node express

## Running tests

Execute the following command to start autodata unit tests

```
$ make test
```

## Running documentation

>Only useful if you want to edit documentation, otherwise you can consult [online gitbook](https://ekino.github.io/autodata/)

Execute the following command to start autodata documentation

```
$ yarn doc
```

# Build autodata

Execute the following command to build autodata

```
$ make build
```

Build will create 2 scripts
- autodata.js will keep log and unminified code
- autodata.min.js will remove log and minify code

# Release autodata

Execute the following command to release autodata

```
$ yarn version
```

Choose the new version with yarn interactive mode.