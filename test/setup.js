/* setup.js */

const jsdom = require('jsdom').jsdom;

global.__DEV__ = false;

global.document = jsdom('');
global.window = document.defaultView;
global.Element = window.Element;
global.location = window.location;
global.history = window.history;

global.navigator = {
  userAgent: 'node.js',
};

//allows to add tests for the Carousel
window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };