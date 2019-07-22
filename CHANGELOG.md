#### 0.16.0 (2019-07-22)

##### Chores

* **travis:**  update npm encrypted token (410e42ae)
*  bump package.json to 0.14.0 (d387aa68)
*  allow to call the dev server with a .local domain (8143c585)
* **babel:**  migrate to version 7 (a3386cc2)

##### Continuous Integration

* **travis:**  do not cache folders (e6a3d7ec)

##### Documentation Changes

* **gtm:**  add custom data layer name section (80fd48c6)

##### New Features

* **gtm:**  add customDataLayer config (452ca602)
* **prettier:**  format files locally and in CI (d3ad5c11)
*  upgrade some dev dependencies (3fcb4c5f)
* **jwplayer:**
  *  Add enhancer (3b26c10a)
  *  plugin revision (3412601f)

##### Bug Fixes

* **babel:**  support IE 11 (a2ccd908)
* **mocha:**  use new babel 7 compiler (0146db5e)
* **jwplayer:**  Fix cuepoints event (4900252c)
*  security breach in eslint-scope (8721724b)
* **release:**  id mapping to mediaid (89680be5)

##### Refactors

*  migrate to webpack 4 (07f6abf5)

#### 0.12.0 (2018-01-25)

##### Refactors

* **libs:** remove lodash (4b8821eb)

#### 0.11.0 (2018-01-03)

##### Bug Fixes

* **package:** postinstall script (6f513056)

#### 0.10.0 (2017-11-03)

##### Chores

* **node:** update node version (eb407a3d)
* **ENV:** add postinstall script (6c888aa1)
* **hooks:** use lint-staged and remove prepush (98e4761b)
* **travis:** add npm deploy config (4f36783a)

##### Bug Fixes

* **logger:** use lodash findIndex (be417ec7)

##### Refactors

* **build:** move to CI (1a5f73f1)

#### 0.9.8 (2017-10-05)

##### Bug Fixes

* **waitForDomToBeReady:** dom ready detection (1e3d45b1)

#### 0.9.7 (2017-10-05)

##### Documentation Changes

* **implementation:** add npm spec (7d297fac)

##### Bug Fixes

* **jwlpayer:** restrain events scope (5d9e34ca)
* **utilities:** dom ready state helper (b6ef640a)
* **doc:** typo in autodata initialization (7f3bd62a)

#### 0.9.6 (2017-09-27)

##### Chores

* **changelog:** add npm package generate-changelog (695d5e9a)
* **tests:** Driver tests (d2011905)

##### New Features

* **optionalConfig:** add multiple config possibility (4c47df37)

##### Bug Fixes

* **release:**
  * postversion script (0a8172e9)
  * changelog step (904bbea4)
* **build:** bundle analyzer config (0fa7b9b4)
* **demo:** wrong camelize config (d3ca144a)
* **Driver:** provide type for enhancer / sender (4de67429)

#### 0.9.5 (2017-09-27)

##### Chores

* **tests:** Driver tests (d2011905)

##### Bug Fixes

* **demo:** wrong camelize config (d3ca144a)
* **Driver:** provide type for enhancer / sender (4de67429)

