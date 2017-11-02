# Autodata

[![Build Status](https://travis-ci.org/ekino/autodata.svg?branch=master)](https://travis-ci.org/ekino/autodata)

This project is a fork of [googleanalytics/autotrack](https://github.com/googleanalytics/autotrack) and is part of the ekino github team.

You can find the project documentation at [ekino.github.io/autodata](https://ekino.github.io/autodata/)

## Table of contents
- [Requirements](#requirements)
- [Getting started](#getting-started)
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

- [NodeJS](https://nodejs.org/en/) - v8.x.x
- [Yarn](https://yarnpkg.com/) - v1.x.x

# Getting started

Autodata library can be installed with 2 options :

## npm

```
$ npm install autodata
```

## unpkg cdn

```
<script src="https://unpkg.com/autodata@latest"></script>
```

All the documentation and examples are available on the project's gitbook : [ekino.github.io/autodata](https://ekino.github.io/autodata/)

# Setup

## Installation

 - ``git clone git@github.com:ekino/autodata.git``
 - ``yarn``

## Setup requirements

### ENV vars
Create a copy of ENV.json.example and name it ENV.json in order to configure the
local environment variable for development.

# Running autodata

Every running script of autodata is listed here : demo page, unit tests, documentation

## Running demo page

Execute the following command to start autodata demo page

```
$ yarn start
```

After what the demo page will be started at this url

- demo page: [http://localhost:8080/](http://localhost:8080/) - node express

## Running tests

Execute the following command to start autodata unit tests

```
$ yarn test
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
$ NODE_ENV=(development|production) yarn build
```

It will create a script depending on NODE_ENV
- NODE_ENV=development -> autodata.js will keep log and unminified code
- NODE_ENV=production -> autodata.min.js will remove log and uglify code

# Release autodata

Execute the following command to release autodata

```
$ yarn version
```

Choose the new version with yarn interactive mode.
