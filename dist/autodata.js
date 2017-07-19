(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["autoData"] = factory();
	else
		root["autoData"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Accepts a function and returns a wrapped version of the function that is
 * expected to be called elsewhere in the system. If it's not called
 * elsewhere after the timeout period, it's called regardless. The wrapper
 * function also prevents the callback from being called more than once.
 * @param {Function} callback The function to call.
 * @param {number} wait How many milliseconds to wait before invoking
 *     the callback.
 * @returns {Function} The wrapped version of the passed function.
 */
var withTimeout = exports.withTimeout = function withTimeout(callback, wait) {
  var called = false;
  setTimeout(callback, wait || 2000);
  return function withTimeoutCallback() {
    if (!called) {
      called = true;
      callback();
    }
  };
};

/**
 * Accepts an object of overrides and defaults and returns a new object
 * with the values merged. For each key in defaults, if there's a
 * corresponding value in overrides, it gets used.
 * @param {Object} overrides The object with properties to override.
 * @param {?Object} values The object with properties to use as defaults.
 * @return {Object} The final, merged object.
 */
var defaults = exports.defaults = function defaults(overrides, values) {
  var result = {};

  if ((typeof overrides === 'undefined' ? 'undefined' : _typeof(overrides)) !== 'object') {
    overrides = {};
  }

  if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    values = {};
  }

  Object.keys(values).forEach(function (key) {
    result[key] = key in overrides ? overrides[key] : values[key];
  });
  return result;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str The input string.
 * @return {string} The capitalized string
 */
var capitalize = exports.capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Indicates whether the passed constiable is a JavaScript object.
 * @param {*} value The input constiable to test.
 * @return {boolean} Whether or not the test is an object.
 */
var isObject = exports.isObject = function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
};

/**
 * Compare to objects and determine if there first level of hierarchy is different
 * @param {object} obj1 - first object
 * @param {object} obj2 - second object
 * @returns {boolean} - true if the objects are different
 */
var areDifferent = exports.areDifferent = function areDifferent() {
  var obj1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (true) {
    case !!Object.keys(obj1).filter(function (name) {
      return !(name in obj2);
    }).length:
    case !!Object.keys(obj2).filter(function (name) {
      return !(name in obj1);
    }).length:
    case !!Object.keys(obj1).filter(function (name) {
      return obj1[name] !== obj2[name];
    }).length:
      return true;
    default:
      return false;
  }
};

/**
 * Indicates whether the passed constiable is a JavaScript array.
 * @param {*} value The input constiable to test.
 * @return {boolean} Whether or not the value is an array.
 */
var isArray = exports.isArray = Array.isArray || function isArrayPolyfill(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
};

/**
 * Accepts a value that may or may not be an array. If it is not an array,
 * it is returned as the first item in a single-item array.
 * @param {*} value The value to convert to an array if it is not.
 * @return {Array} The array-ified value.
 */
var toArray = exports.toArray = function toArray(value) {
  if (isArray(value)) {
    return value;
  }
  return [value];
};

/**
 * retrieve the browser information for current pageview
 * @param {bool} withQueryString - specify if you want queryString
 *  to be include in the page data
 * @returns {{page: string, title: (boolean|string)}} - browser page and title
 */
var getBrowserPageview = exports.getBrowserPageview = function getBrowserPageview() {
  var withQueryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _location = location,
      pathname = _location.pathname,
      search = _location.search;

  var _ref = history.state || document,
      title = _ref.title;

  return {
    page: '' + pathname + (withQueryString ? search : ''),
    title: title
  };
};

/**
 * Prevent unsupported Array.includes
 * @param {array} arr - dataset to test
 * @param {*} value - value to find
 * @return {boolean} - bool state of Array.includes
 */
var includes = exports.includes = function includes(arr, value) {
  return arr.indexOf(value) !== -1;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop() {};

var log = exports.log =  true ? function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return console.log('%c ' + args.join(' '), 'background: #8cdcf2; padding: 3px 0; color: black;');
} : noop;

var error = exports.error =  true ? function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return console.log('%c ' + args.join(' '), 'background: red; padding: 3px 0; color: white;');
} : noop;

var warn = exports.warn =  true ? function () {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return console.log('%c ' + args.join(' '), 'background: orange; padding: 3px 0; color: white;');
} : noop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(21);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EVENT = exports.EVENT = 'event';
var INITIAL_TAGS = exports.INITIAL_TAGS = 'initial-tags';
var MEDIA_QUERY = exports.MEDIA_QUERY = 'media-query';
var OUTBOUND_FORM = exports.OUTBOUND_FORM = 'outbound-form';
var OUTBOUND_LINK = exports.OUTBOUND_LINK = 'outbound-link';
var SOCIAL = exports.SOCIAL = 'social';
var PAGEVIEW = exports.PAGEVIEW = 'pageview';
var VIRTUAL_PAGEVIEW = exports.VIRTUAL_PAGEVIEW = 'virtualpageview';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInstance;

var _errors = __webpack_require__(6);

var errors = _interopRequireWildcard(_errors);

var _Driver = __webpack_require__(7);

var _Driver2 = _interopRequireDefault(_Driver);

var _gtm = __webpack_require__(8);

var gtm = _interopRequireWildcard(_gtm);

var _tealium = __webpack_require__(9);

var tealium = _interopRequireWildcard(_tealium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * retrieves the desired driver and instanciates it
 * @param {object} config - user config
 * @returns {{instance: Driver, defaultConfig: {}}} - instance and defaultConfig
 */


// Drivers
function getInstance(config) {
  var tms = config.tms;

  var defaultConfig = {};

  if (!tms) {
    throw new Error(errors.NO_DRIVER_PROVIDED);
  }

  var parsers = [];
  var senders = [];

  switch (tms.name) {
    case 'gtm':
      parsers.push(gtm.parser);
      senders.push(gtm.sender);
      break;
    case 'tealium':
      parsers.push(tealium.parser);
      senders.push(tealium.sender);
      break;
    default:
      break;
  }

  if (tms.parser) parsers.push(tms.parser);
  if (tms.sender) senders.push(tms.sender);

  return {
    instance: new _Driver2.default({
      parsers: parsers,
      enhancer: tms.enhancer,
      senders: senders
    }),
    defaultConfig: defaultConfig
  };
}

// Driver class

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventTracker = __webpack_require__(10);

Object.defineProperty(exports, 'eventTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_eventTracker).default;
  }
});

var _initialTags = __webpack_require__(11);

Object.defineProperty(exports, 'initialTags', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_initialTags).default;
  }
});

var _mediaQueryTracker = __webpack_require__(13);

Object.defineProperty(exports, 'mediaQueryTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mediaQueryTracker).default;
  }
});

var _outboundFormTracker = __webpack_require__(14);

Object.defineProperty(exports, 'outboundFormTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outboundFormTracker).default;
  }
});

var _outboundLinkTracker = __webpack_require__(15);

Object.defineProperty(exports, 'outboundLinkTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outboundLinkTracker).default;
  }
});

var _socialTracker = __webpack_require__(17);

Object.defineProperty(exports, 'socialTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_socialTracker).default;
  }
});

var _urlChangeTracker = __webpack_require__(18);

Object.defineProperty(exports, 'urlChangeTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_urlChangeTracker).default;
  }
});

var _pageviewTracker = __webpack_require__(16);

Object.defineProperty(exports, 'pageviewTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pageviewTracker).default;
  }
});

var _jwplayerTracker = __webpack_require__(12);

Object.defineProperty(exports, 'jwplayerTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_jwplayerTracker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable max-len */

var NO_DRIVER_PROVIDED = exports.NO_DRIVER_PROVIDED = 'No driver was provided';
var NO_DRIVER_INSTANCE = exports.NO_DRIVER_INSTANCE = 'There is no driver instance';
var DRIVER_NOT_FOUND = exports.DRIVER_NOT_FOUND = 'Driver not found';
var PLUGIN_NOT_FOUND = exports.PLUGIN_NOT_FOUND = 'Plugin not found';
var MISSING_PROPERTY = exports.MISSING_PROPERTY = 'Missing property';
var NO_PARSER_PROVIDED = exports.NO_PARSER_PROVIDED = 'You need to provide a parser function if you do not use a default tms';
var NO_SENDER_PROVIDED = exports.NO_SENDER_PROVIDED = 'You need to provide a sender function if you do not use a default tms';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Driver
 */
var Driver = function () {
  /**
   * @constructor
   * @param {function|string} driver - desired driver, can be either
   *  - string for provided driver selection
   *  - function for custom driver selection
   * @param {object} data - initial driver data
   */
  function Driver(_ref) {
    var senders = _ref.senders,
        parsers = _ref.parsers,
        enhancer = _ref.enhancer;

    _classCallCheck(this, Driver);

    this.parsers = parsers;
    this.enhancer = enhancer || function (tag) {
      return tag;
    };
    this.senders = senders;

    this.data = {};
  }

  /**
   * Parse and send the tag to TMS
   * @param {string} type - tag type
   * @param {object} data - generic autoData information
   */


  _createClass(Driver, [{
    key: 'send',
    value: function send(type, data) {
      try {
        // Parsed tags
        var parsedTag = this.parsers.reduce(function (currentTag, parser) {
          return parser(type, currentTag);
        }, data);
        // Enhanced tag
        var enhancedTag = this.enhancer(parsedTag);
        // Send tag
        this.senders.forEach(function (sender) {
          return sender(enhancedTag);
        });

        if (true) {
          (0, _logger.log)(type, JSON.stringify(enhancedTag, null, 2));
        }
      } catch (err) {
        throw err;
      }
    }

    /**
     * Get the asked stored property inside the tracker
     * @param {string} property - the property name
     * @returns {*} the value of the asked property
     */

  }, {
    key: 'get',
    value: function get(property) {
      return this.data[property];
    }

    /**
     * Set the given property inside the tracker
     * @param {object|string} propertyOrData - this can be a prorperty name
     *  or directly a configuration object
     * @param {*} value - the property value
     */

  }, {
    key: 'set',
    value: function set(propertyOrData, value) {
      var _this = this;

      if ((0, _utilities.isObject)(propertyOrData)) {
        Object.keys(propertyOrData).forEach(function (propertyName) {
          _this.set(propertyName, propertyOrData[propertyName]);
        });
      } else {
        this.data[propertyOrData] = value;
      }
    }
  }]);

  return Driver;
}();

exports.default = Driver;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sender = exports.parser = exports.config = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tagTypes = __webpack_require__(3);

var tagTypes = _interopRequireWildcard(_tagTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * default plugin's configuration object
 * @type {{plugins: {eventTracker: {trigger: string, attributes: [*]}}}}
 */
var config = exports.config = {
  eventTracker: {
    trigger: 'obj',
    attributes: ['act', 'desc', 'val']
  }
};

/**
 * Tags sending function
 * @param {string} type - tag type (usually plugins)
 * @param {object} data - data for the current tag
 * @returns {object} - parsed tag
 */
var parser = exports.parser = function parser(type) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (type) {
    case tagTypes.EVENT:
      return _extends({ event: 'click' }, data);
    case tagTypes.VIRTUAL_PAGEVIEW:
      return _extends({ event: 'virtualpageview' }, data);
    case tagTypes.PAGEVIEW:
      return _extends({ event: 'pageview' }, data);
    case tagTypes.MEDIA_QUERY: // TODO
    case tagTypes.OUTBOUND_FORM: // TODO
    case tagTypes.OUTBOUND_LINK: // TODO
    case tagTypes.SOCIAL: // TODO
    case tagTypes.INITIAL_TAGS: // TODO
    default:
      return _extends({ event: type }, data);
  }
};

/**
 * Send the parsed tag to dataLayer
 * @param {object} tag - parsed tag to be sent
 */
var sender = exports.sender = function sender(tag) {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push(tag);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sender = exports.parser = exports.config = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tagTypes = __webpack_require__(3);

var tagTypes = _interopRequireWildcard(_tagTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * default plugin's configuration object
 * @type {{plugins: {eventTracker: {trigger: string, attributes: [*]}}}}
 */
var config = exports.config = {
  eventTracker: {
    trigger: 'obj',
    attributes: ['act', 'desc', 'val']
  }
};

/**
 * Tags sending function
 * @param {string} type - tag type (usually plugins)
 * @param {object} data - data for the current tag
 * @returns {object} - parsed tag
 */
var parser = exports.parser = function parser(type) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // TODO : identification in sender
  switch (type) {
    case tagTypes.EVENT:
      return _extends({ event: 'click' }, data);
    case tagTypes.VIRTUAL_PAGEVIEW:
      return _extends({ event: 'virtualpageview' }, data);
    case tagTypes.PAGEVIEW:
      return _extends({ event: 'pageview' }, data);
    case tagTypes.MEDIA_QUERY: // TODO
    case tagTypes.OUTBOUND_FORM: // TODO
    case tagTypes.OUTBOUND_LINK: // TODO
    case tagTypes.SOCIAL: // TODO
    case tagTypes.INITIAL_TAGS: // TODO
    default:
      return _extends({ event: type }, data);
  }
};

/**
 * Send the parsed tag to dataLayer
 * @param {object} tag - parsed tag to be sent
 */
var sender = exports.sender = function sender(tag) {
  var _window = window,
      utag = _window.utag;


  if (!utag) {
    throw new Error('TEALIUM SENDER REQUIRES utag GLOBAL');
  }

  switch (tag.event) {
    case 'pageview':
    case 'virtualpageview':
      utag.view(tag);
      break;
    default:
      utag.link(tag);
      break;
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var delegate = __webpack_require__(2);
var defaults = __webpack_require__(0).defaults;

/**
 * Registers declarative event tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function EventTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    attributePrefix: 'data-event-',
    trigger: 'obj',
    attributes: ['act', 'desc', 'val']
  });

  this.tracker = tracker;

  var prefix = this.opts.attributePrefix;
  var selector = '[' + prefix + this.opts.trigger + ']';

  this.delegate = delegate(document, selector, 'click', this.handleEventClicks.bind(this));
}

/**
 * Handles all clicks on elements with event attributes.
 * @param {Event} event The DOM click event.
 */
EventTracker.prototype.handleEventClicks = function handleEventClicks(event) {
  var link = event.delegateTarget;
  var _opts = this.opts,
      attributePrefix = _opts.attributePrefix,
      trigger = _opts.trigger,
      attributes = _opts.attributes;

  var data = {};

  [].concat(_toConsumableArray(attributes), [trigger]).forEach(function (attrName) {
    var attrValue = link.getAttribute('' + attributePrefix + attrName);
    if (attrValue) {
      data[attrName] = attrValue;
    }
  });

  this.tracker.send('event', data);
};

/**
 * Removes all event listeners and instance properties.
 */
EventTracker.prototype.remove = function remove() {
  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;
};

exports.default = EventTracker;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_EVENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = __webpack_require__(1);

var _utilities = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEFAULT_EVENT = exports.DEFAULT_EVENT = 'click';

/**
 * Registers initial tags events.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function InitialTags(tracker, opts) {
  var _this = this;

  this.opts = (0, _utilities.defaults)(opts, {
    attributePrefix: 'data-',
    initialTagsDelay: 1e3, // 1sec
    tags: []
  });

  this.tracker = tracker;
  this.tagSelector = '[' + this.opts.attributePrefix + 'initial-tags]';

  // Wait for DOM to be ready before calling it
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(_this.parseInitialTags.bind(_this), _this.opts.initialTagsDelay);
  });
}

/**
 * Sends the given tag to tracker
 * @param {object} tag - the tag to send
 */
InitialTags.prototype.send = function send(tag) {
  this.tracker.send('initial-tags', _extends({
    event: DEFAULT_EVENT
  }, tag));
};

/**
 * Parse the initialTags HTMLScriptElement and send it to tracker
 */
InitialTags.prototype.parseInitialTags = function parseInitialTags() {
  var scriptTags = [].slice.call(document.querySelectorAll(this.tagSelector));
  var initialTags = [].concat(_toConsumableArray(this.opts.tags), _toConsumableArray(scriptTags.reduce(function (allTags, scriptTag) {
    try {
      return allTags.concat(JSON.parse(scriptTag.innerText));
    } catch (err) {
      (0, _logger.warn)('Script tag parsing failed', err);
      return allTags;
    }
  }, [])));
  initialTags.forEach(this.send.bind(this));
};

exports.default = InitialTags;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSUPPORTED_EVENT = exports.NO_API_PROVIDED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NO_API_PROVIDED = exports.NO_API_PROVIDED = 'No JwPlayer instance was provided';
var UNSUPPORTED_EVENT = exports.UNSUPPORTED_EVENT = 'The event: %s is not supported';

/**
 * Track JWPlayer activity.
 */

var _class = function () {
  /**
   * constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - plugin configuration
   */
  function _class(tracker, opts) {
    var _this = this;

    _classCallCheck(this, _class);

    this.opts = (0, _utilities.defaults)(opts, {
      jwplayer: null,
      events: ['playlistItem', 'play', 'pause', 'complete', 'error', 'seek', 'mute', 'volume', 'fullscreen', 'resize', 'audioTrackChanged', 'displayClick'],
      autoDetect: false
    });

    if (!this.opts.jwplayer) {
      throw new Error(NO_API_PROVIDED);
    }

    this.tracker = tracker;
    this.instances = [];

    var jwplayer = this.opts.jwplayer;


    if ((0, _utilities.includes)(this.opts.events, 'all')) {
      throw new Error(UNSUPPORTED_EVENT.replace('%s', 'all'));
    }

    jwplayer.api.registerPlugin('autoData', '6.0', function (instance) {
      return _this.setInstance(instance);
    });

    /**
     * Add autoData plugin to default configuration
     * FIXME : configuration override risk
     * - we need to provide a warning or an exception
     *   because our configuration could be overriden
     */
    if (this.opts.autoDetect) {
      (0, _logger.warn)('jwplayer:autoDetect is experimental because it uses the jwplayer.defaults configuration' + 'and it could be overridden so be careful with its use !');
      // Prevent empty config case
      if (!jwplayer.defaults) {
        jwplayer.defaults = {};
      }
      // Prevent empty plugins config case
      if (!jwplayer.defaults.plugins) {
        jwplayer.defaults.plugins = {};
      }
      // Do the override
      jwplayer.defaults.plugins = _extends({}, jwplayer.defaults.plugins, { // Keep existing configuration
        autoData: {}
      });
    }
  }

  /**
   * onEvent - send event information to tracker
   * @param {object} instance - current jwplayer instance
   * @param {string} eventName - configuration event name
   * @param {object} data* - optional data for 'all' event case
   */


  _createClass(_class, [{
    key: 'onEvent',
    value: function onEvent(instance, eventName) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var tag = {};

      switch (eventName) {
        case 'playlistItem':
          tag = { act: 'load', desc: data.item.title, val: data.index };
          break;
        case 'play':
          tag = { act: 'play', desc: data.oldstate };
          break;
        case 'pause':
          tag = { act: 'pause', desc: data.oldstate };
          break;
        case 'complete':
          {
            var _instance$getPlaylist = instance.getPlaylistItem(),
                _instance$getPlaylist2 = _instance$getPlaylist.title,
                title = _instance$getPlaylist2 === undefined ? '' : _instance$getPlaylist2;

            tag = { act: 'complete', desc: title };
            break;
          }
        case 'error':
          tag = { act: 'error', desc: data.message };
          break;
        case 'seek':
          tag = { act: 'seek', desc: data.position + '|' + data.offset };
          break;
        case 'mute':
          tag = { act: 'mute', desc: data.mute };
          break;
        case 'volume':
          tag = { act: 'volume', desc: data.volume };
          break;
        case 'fullscreen':
          tag = { act: 'fullscreen', desc: data.fullscreen };
          break;
        case 'resize':
          tag = { act: 'resize', desc: data.width + '|' + data.height };
          break;
        case 'audioTrackChanged':
          // TODO : find a way to reproduce this
          tag = _extends({ act: 'playlist' }, data);
          break;
        case 'displayClick':
          tag = { act: 'clic' };
          break;
        default:
          break;
      }

      this.tracker.send('jwplayer', tag);
    }

    /**
     * setInstance - keep instance reference and bind events
     * @param {object} instance - jwplayer instance
     */

  }, {
    key: 'setInstance',
    value: function setInstance(instance) {
      var _this2 = this;

      this.opts.events.forEach(function (name) {
        instance.on(name, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this2.onEvent.apply(_this2, [instance, name].concat(args));
        });
      });
      instance.on('remove', function () {
        return _this2.unsetInstance(instance);
      });

      this.instances.push(instance.uniqueId);
      this.tracker.send('jwplayer', { obj: 'instance', val: instance.uniqueId });
    }

    /**
     * unsetInstance - remove the destroyed instance reference
     * @param {object} instance - the jwplayer instance
     */

  }, {
    key: 'unsetInstance',
    value: function unsetInstance(instance) {
      var instanceId = this.instances.indexOf(instance.uniqueId);

      if (instanceId !== -1) {
        this.instances.splice(instanceId, 1);
        this.tracker.send('jwplayer', { obj: 'remove', val: instance.uniqueId });
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var debounce = __webpack_require__(20);
var defaults = __webpack_require__(0).defaults;
var isObject = __webpack_require__(0).isObject;
var toArray = __webpack_require__(0).toArray;

/**
 * Sets the string to use when no custom dimension value is available.
 */
var NULL_DIMENSION = '(not set)';

/**
 * Declares the MediaQueryListener instance cache.
 */
var mediaMap = {};

/**
 * Registers media query tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function MediaQueryTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.matchMedia) return;

  this.opts = defaults(opts, {
    mediaQueryDefinitions: false,
    mediaQueryChangeTemplate: this.changeTemplate,
    mediaQueryChangeTimeout: 1000
  });

  // Exits early if media query data doesn't exist.
  if (!isObject(this.opts.mediaQueryDefinitions)) return;

  this.opts.mediaQueryDefinitions = toArray(this.opts.mediaQueryDefinitions);
  this.tracker = tracker;
  this.changeListeners = [];

  this.processMediaQueries();
}

/**
 * Loops through each media query definition, sets the custom dimenion data,
 * and adds the change listeners.
 */
MediaQueryTracker.prototype.processMediaQueries = function processMediaQueries() {
  var _this = this;

  this.opts.mediaQueryDefinitions.forEach(function (definition) {
    // Only processes definitions with a name and index.
    if (definition.name && definition.dimensionIndex) {
      var mediaName = _this.getMatchName(definition);
      _this.tracker.set('dimension' + definition.dimensionIndex, mediaName);

      _this.addChangeListeners(definition);
    }
  });
};

/**
 * Takes a definition object and return the name of the matching media item.
 * If no match is found, the NULL_DIMENSION value is returned.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension.
 * @return {string} The name of the matched media or NULL_DIMENSION.
 */
MediaQueryTracker.prototype.getMatchName = function getMatchName(definition) {
  var match = void 0;

  definition.items.forEach(function (item) {
    if (getMediaListener(item.media).matches) {
      match = item;
    }
  });
  return match ? match.name : NULL_DIMENSION;
};

/**
 * Adds change listeners to each media query in the definition list.
 * Debounces the changes to prevent unnecessary hits from being sent.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.addChangeListeners = function addChangeListeners(definition) {
  var _this2 = this;

  definition.items.forEach(function (item) {
    var mql = getMediaListener(item.media);
    var fn = debounce(function () {
      _this2.handleChanges(definition);
    }, _this2.opts.mediaQueryChangeTimeout);

    mql.addListener(fn);
    _this2.changeListeners.push({ mql: mql, fn: fn });
  });
};

/**
 * Handles changes to the matched media. When the new value differs from
 * the old value, a change event is sent.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.handleChanges = function handleChanges(definition) {
  var newValue = this.getMatchName(definition);
  var oldValue = this.tracker.get('dimension' + definition.dimensionIndex);

  if (newValue !== oldValue) {
    this.tracker.set('dimension' + definition.dimensionIndex, newValue);
    this.tracker.send('media-query', {
      name: definition.name,
      value: this.opts.mediaQueryChangeTemplate(oldValue, newValue)
    });
  }
};

/**
 * Removes all event listeners and instance properties.
 */
MediaQueryTracker.prototype.remove = function remove() {
  for (var i = 0, listener; listener = this.changeListeners[i]; i += 1) {
    listener.mql.removeListener(listener.fn);
  }
  this.changeListeners = null;
  this.tracker = null;
  this.opts = null;
};

/**
 * Sets the default formatting of the change event label.
 * This can be overridden by setting the `mediaQueryChangeTemplate` option.
 * @param {string} oldValue The value of the media query prior to the change.
 * @param {string} newValue The value of the media query after the change.
 * @return {string} The formatted event label.
 */
MediaQueryTracker.prototype.changeTemplate = function changeTemplate(oldValue, newValue) {
  return oldValue + ' => ' + newValue;
};

/**
 * Accepts a media query and returns a MediaQueryListener object.
 * Caches the values to avoid multiple unnecessary instances.
 * @param {string} media A media query value.
 * @return {MediaQueryListener} The matched media.
 */
function getMediaListener(media) {
  // Returns early if the media is cached.
  if (mediaMap[media]) return mediaMap[media];

  mediaMap[media] = window.matchMedia(media);
  return mediaMap[media];
}

exports.default = MediaQueryTracker;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var defaults = __webpack_require__(0).defaults;
var delegate = __webpack_require__(2);
var utilities = __webpack_require__(0);

/**
 * Registers outbound form tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function OutboundFormTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackOutboundForm: this.shouldTrackOutboundForm
  });

  this.tracker = tracker;

  this.delegate = delegate(document, 'form', 'submit', this.handleFormSubmits.bind(this));
}

/**
 * Handles all submits on form elements. A form submit is considered outbound
 * if its action attribute starts with http and does not contain
 * location.hostname.
 * When the beacon transport method is not available, the event's default
 * action is prevented and re-emitted after the hit is sent.
 * @param {Event} event The DOM submit event.
 */
OutboundFormTracker.prototype.handleFormSubmits = function handleFormSubmits(event) {
  var form = event.delegateTarget;
  var action = form.getAttribute('action');
  var fieldsObj = { transport: 'beacon' };

  if (this.opts.shouldTrackOutboundForm(form)) {
    if (!navigator.sendBeacon) {
      // Stops the submit and waits until the hit is complete (with timeout)
      // for browsers that don't support beacon.
      event.preventDefault();
      fieldsObj.hitCallback = utilities.withTimeout(function () {
        form.submit();
      });
    }

    this.tracker.send('outbound-form', {
      action: action,
      fieldsObj: fieldsObj
    });
  }
};

/**
 * Determines whether or not the tracker should send a hit when a form is
 * submitted. By default, forms with an action attribute that starts with
 * "http" and doesn't contain the current hostname are tracked.
 * @param {Element} form The form that was submitted.
 * @return {boolean} Whether or not the form should be tracked.
 */
OutboundFormTracker.prototype.shouldTrackOutboundForm = function shouldTrackOutboundForm(form) {
  var action = form.getAttribute('action');
  return action && action.indexOf('http') === 0 && action.indexOf(location.hostname) < 0;
};

/**
 * Removes all event listeners and instance properties.
 */
OutboundFormTracker.prototype.remove = function remove() {
  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;
};

exports.default = OutboundFormTracker;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var defaults = __webpack_require__(0).defaults;
var delegate = __webpack_require__(2);

/**
 * Registers outbound link tracking on a tracker object.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function OutboundLinkTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackOutboundLink: this.shouldTrackOutboundLink
  });

  this.tracker = tracker;

  this.delegate = delegate(document, 'a', 'click', this.handleLinkClicks.bind(this));
}

/**
 * Handles all clicks on link elements. A link is considered an outbound link
 * its hostname property does not match location.hostname. When the beacon
 * transport method is not available, the links target is set to "_blank" to
 * ensure the hit can be sent.
 * @param {Event} event The DOM click event.
 */
OutboundLinkTracker.prototype.handleLinkClicks = function handleLinkClicks(event) {
  var link = event.delegateTarget;
  if (this.opts.shouldTrackOutboundLink(link)) {
    // Opens outbound links in a new tab if the browser doesn't support
    // the beacon transport method.
    if (!navigator.sendBeacon) {
      link.target = '_blank';
    }
    this.tracker.send('outbound-link', {
      href: link.href,
      transport: 'beacon'
    });
  }
};

/**
 * Determines whether or not the tracker should send a hit when a link is
 * clicked. By default links with a hostname property not equal to the current
 * hostname are tracked.
 * @param {Element} link The link that was clicked on.
 * @return {boolean} Whether or not the link should be tracked.
 */
OutboundLinkTracker.prototype.shouldTrackOutboundLink = function shouldTrackOutboundLink(link) {
  return link.hostname !== location.hostname && link.protocol.indexOf('http') === 0;
};

/**
 * Removes all event listeners and instance properties.
 */
OutboundLinkTracker.prototype.remove = function remove() {
  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;
};

exports.default = OutboundLinkTracker;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class InitialPageview
 */
var InitialPageview = function () {
  /**
   * InitialPageview constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - configuration
   */
  function InitialPageview(tracker, opts) {
    var _this = this;

    _classCallCheck(this, InitialPageview);

    this.opts = (0, _utilities.defaults)(opts, {
      attributePrefix: 'data-pageview-',
      trigger: 'page',
      attributes: ['title'],
      withQueryString: true,
      hotReload: false
    });

    this.tracker = tracker;
    this.currentData = {};

    if (this.opts.hotReload) {
      (0, _logger.warn)('hotReload feature is not really well tested, be careful with its usage');
      this.startHotReload();
    }

    // Wait for DOM to be ready before calling it
    document.addEventListener('DOMContentLoaded', function () {
      // Initial pageview send
      _this.send();
    });
  }

  /**
   * Hot reload mechanism, this will listen for history state
   * changes and send pageview automatically
   *
   * FIXME:
   * - DOM updates for SPA. How to avoid setTimeout in order
   *   to retrieve the pageview information on the trigger tag
   * - No destroy mechanism. The events and history pushState / replaceState
   *   overrides are never restored, it could be interesting for performance
   */


  _createClass(InitialPageview, [{
    key: 'startHotReload',
    value: function startHotReload() {
      var _this2 = this;

      // Overrides history.pushState.
      var _history = history,
          pushState = _history.pushState,
          replaceState = _history.replaceState;

      var onHistoryChanges = function onHistoryChanges() {
        return setTimeout(_this2.send.bind(_this2), 100);
      };

      history.pushState = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var state = args[0],
            title = args[1];

        // Manually set state.title

        if ((0, _utilities.isObject)(state) && title) state.title = title;

        pushState.apply(history, args);
        onHistoryChanges();
      };

      // Overrides history.repaceState.
      history.replaceState = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var state = args[0],
            title = args[1];

        // Manually set state.title

        if ((0, _utilities.isObject)(state) && title) state.title = title;

        replaceState.apply(history, args);
        onHistoryChanges();
      };

      // Handles URL changes via user interaction.
      window.addEventListener('popstate', onHistoryChanges);
    }

    /**
     * send the new pageView if the data has changed
     */

  }, {
    key: 'send',
    value: function send() {
      var data = this.getPageView();

      if ((0, _utilities.areDifferent)(data, this.currentData)) {
        this.currentData = data;

        this.tracker.send('pageview', data);
      }
    }

    /**
     * retrieve the pageview information for the current page
     * @returns {{page: string, title: (boolean|string)}} - pageview data
     */

  }, {
    key: 'getPageView',
    value: function getPageView() {
      var _opts = this.opts,
          attributePrefix = _opts.attributePrefix,
          trigger = _opts.trigger,
          attributes = _opts.attributes,
          withQueryString = _opts.withQueryString;
      // TODO : we could store this tag in constructor but there is a risk if it is not rendered yet

      var $trigger = document.querySelector('[' + attributePrefix + trigger + ']');
      var data = (0, _utilities.getBrowserPageview)(withQueryString);

      if ($trigger) {
        [].concat(_toConsumableArray(attributes), [trigger]).filter(function (name) {
          return $trigger.hasAttribute('' + attributePrefix + name);
        }).forEach(function (name) {
          data[name] = $trigger.getAttribute('' + attributePrefix + name);
        });
      }

      return data;
    }
  }]);

  return InitialPageview;
}();

exports.default = InitialPageview;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global FB, twttr */

var defaults = __webpack_require__(0).defaults;
var delegate = __webpack_require__(2);

/**
 * Registers social tracking on tracker object.
 * Supports both declarative social tracking via HTML attributes as well as
 * tracking for social events when using official Twitter or Facebook widgets.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function SocialTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    attributePrefix: 'data-'
  });

  this.tracker = tracker;

  var prefix = this.opts.attributePrefix;
  var selector = '[' + prefix + 'social-network]' + ('[' + prefix + 'social-action]') + ('[' + prefix + 'social-target]');

  // Binds methods to `this`.
  this.handleSocialClicks = this.handleSocialClicks.bind(this);
  this.addWidgetListeners = this.addWidgetListeners.bind(this);
  this.addTwitterEventHandlers = this.addTwitterEventHandlers.bind(this);
  this.handleTweetEvents = this.handleTweetEvents.bind(this);
  this.handleFollowEvents = this.handleFollowEvents.bind(this);
  this.handleLikeEvents = this.handleLikeEvents.bind(this);
  this.handleUnlikeEvents = this.handleUnlikeEvents.bind(this);

  this.delegate = delegate(document, selector, 'click', this.handleSocialClicks);

  if (document.readyState !== 'complete') {
    // Adds the widget listeners after the window's `load` event fires.
    // If loading widgets using the officially recommended snippets, they
    // will be available at `window.load`. If not users can call the
    // `addWidgetListeners` method manually.
    window.addEventListener('load', this.addWidgetListeners);
  } else {
    this.addWidgetListeners();
  }
}

/**
 * Invokes the methods to add Facebook and Twitter widget event listeners.
 * Ensures the respective global namespaces are present before adding.
 */
SocialTracker.prototype.addWidgetListeners = function addWidgetListeners() {
  if (window.FB) this.addFacebookEventHandlers();
  if (window.twttr) this.addTwitterEventHandlers();
};

/**
 * Handles all clicks on elements with social tracking attributes.
 * @param {Event} event The DOM click event.
 */
SocialTracker.prototype.handleSocialClicks = function handleSocialClicks(event) {
  var link = event.delegateTarget;
  var prefix = this.opts.attributePrefix;

  this.tracker.send('social', {
    socialNetwork: link.getAttribute(prefix + 'social-network'),
    socialAction: link.getAttribute(prefix + 'social-action'),
    socialTarget: link.getAttribute(prefix + 'social-target')
  });
};

/**
 * Adds event handlers for the "tweet" and "follow" events emitted by the
 * official tweet and follow buttons. Note: this does not capture tweet or
 * follow events emitted by other Twitter widgets (tweet, timeline, etc.).
 */
SocialTracker.prototype.addTwitterEventHandlers = function addTwitterEventHandlers() {
  var _this = this;

  try {
    twttr.ready(function () {
      twttr.events.bind('tweet', _this.handleTweetEvents);
      twttr.events.bind('follow', _this.handleFollowEvents);
    });
  } catch (err) {}
};

/**
 * Removes event handlers for the "tweet" and "follow" events emitted by the
 * official tweet and follow buttons.
 */
SocialTracker.prototype.removeTwitterEventHandlers = function removeTwitterEventHandlers() {
  var _this2 = this;

  try {
    twttr.ready(function () {
      twttr.events.unbind('tweet', _this2.handleTweetEvents);
      twttr.events.unbind('follow', _this2.handleFollowEvents);
    });
  } catch (err) {}
};

/**
 * Adds event handlers for the "like" and "unlike" events emitted by the
 * official Facebook like button.
 */
SocialTracker.prototype.addFacebookEventHandlers = function addFacebookEventHandlers() {
  try {
    FB.Event.subscribe('edge.create', this.handleLikeEvents);
    FB.Event.subscribe('edge.remove', this.handleUnlikeEvents);
  } catch (err) {}
};

/**
 * Removes event handlers for the "like" and "unlike" events emitted by the
 * official Facebook like button.
 */
SocialTracker.prototype.removeFacebookEventHandlers = function removeFacebookEventHandlers() {
  try {
    FB.Event.unsubscribe('edge.create', this.handleLikeEvents);
    FB.Event.unsubscribe('edge.remove', this.handleUnlikeEvents);
  } catch (err) {}
};

/**
 * Handles `tweet` events emitted by the Twitter JS SDK.
 * @param {Object} event The Twitter event object passed to the handler.
 */
SocialTracker.prototype.handleTweetEvents = function handleTweetEvents(event) {
  // Ignores tweets from widgets that aren't the tweet button.
  if (event.region !== 'tweet') return;

  var url = event.data.url || event.target.getAttribute('data-url') || location.href;

  this.tracker.send('social', {
    name: 'Twitter',
    action: 'tweet',
    url: url
  });
};

/**
 * Handles `follow` events emitted by the Twitter JS SDK.
 * @param {Object} event The Twitter event object passed to the handler.
 */
SocialTracker.prototype.handleFollowEvents = function handleFollowEvents(event) {
  // Ignore follows from widgets that aren't the follow button.
  if (event.region !== 'follow') return;

  var screenName = event.data.screen_name || event.target.getAttribute('data-screen-name');

  this.tracker.send('social', {
    name: 'Twitter',
    action: 'follow',
    screenName: screenName
  });
};

/**
 * Handles `like` events emitted by the Facebook JS SDK.
 * @param {string} url The URL corresponding to the like event.
 */
SocialTracker.prototype.handleLikeEvents = function handleLikeEvents(url) {
  this.tracker.send('social', {
    name: 'Facebook',
    action: 'like',
    url: url
  });
};

/**
 * Handles `unlike` events emitted by the Facebook JS SDK.
 * @param {string} url The URL corresponding to the unlike event.
 */
SocialTracker.prototype.handleUnlikeEvents = function handleUnlikeEvents(url) {
  this.tracker.send('social', {
    name: 'Facebook',
    action: 'unlike',
    url: url
  });
};

/**
 * Removes all event listeners and instance properties.
 */
SocialTracker.prototype.remove = function remove() {
  window.removeEventListener('load', this.addWidgetListeners);
  this.removeFacebookEventHandlers();
  this.removeTwitterEventHandlers();

  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;

  this.handleSocialClicks = null;
  this.addWidgetListeners = null;
  this.addTwitterEventHandlers = null;
  this.handleTweetEvents = null;
  this.handleFollowEvents = null;
  this.handleLikeEvents = null;
  this.handleUnlikeEvents = null;
};

exports.default = SocialTracker;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var defaults = __webpack_require__(0).defaults;
var isObject = __webpack_require__(0).isObject;

/**
 * Adds handler for the history API methods
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function UrlChangeTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!history.pushState || !window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackUrlChange: this.shouldTrackUrlChange
  });

  this.tracker = tracker;

  // Sets the initial page field.
  // Don't set this on the tracker yet so campaign data can be retreived
  // from the location field.
  this.path = getPath();

  this.updateTrackerData = this.updateTrackerData.bind(this);

  // Overrides history.pushState.
  this.originalPushState = history.pushState;
  history.pushState = function pushState(state, title) {
    var _originalPushState;

    // Sets the document title for reference later.
    // TODO(philipwalton): consider using WeakMap for this to not conflict
    // with any user-defined property also called "title".
    if (isObject(state) && title) state.title = title;

    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    (_originalPushState = this.originalPushState).call.apply(_originalPushState, [history, state, title].concat(rest));
    this.updateTrackerData();
  }.bind(this);

  // Overrides history.repaceState.
  this.originalReplaceState = history.replaceState;
  history.replaceState = function replaceState(state, title) {
    var _originalReplaceState;

    // Sets the document title for reference later.
    // TODO(philipwalton): consider using WeakMap for this to not conflict
    // with any user-defined property also called "title".
    if (isObject(state) && title) state.title = title;

    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      rest[_key2 - 2] = arguments[_key2];
    }

    (_originalReplaceState = this.originalReplaceState).call.apply(_originalReplaceState, [history, state, title].concat(rest));
    this.updateTrackerData(false);
  }.bind(this);

  // Handles URL changes via user interaction.
  window.addEventListener('popstate', this.updateTrackerData);
}

/**
 * Updates the page and title fields on the tracker if necessary and
 * optionally sends a pageview.
 * @param {boolean} shouldSendPageview Indicates whether the tracker should
 *     send a pageview after updating the URL.
 */
UrlChangeTracker.prototype.updateTrackerData = function updateTrackerData(shouldSendPageview) {
  var _this = this;

  // Sets the default.
  shouldSendPageview = shouldSendPageview !== false;

  // Calls the update logic asychronously to help ensure user callbacks
  // happen first.
  setTimeout(function () {
    var oldPath = _this.path;
    var newPath = getPath();

    if (oldPath !== newPath && _this.opts.shouldTrackUrlChange.call(_this, newPath, oldPath)) {
      var page = newPath;
      var title = isObject(history.state) ? history.state.title : document.title;

      _this.path = newPath;
      _this.tracker.set({ page: page, title: title });

      if (shouldSendPageview) _this.tracker.send('pageview', { page: page, title: title });
    }
  }, 0);
};

/**
 * Determines whether or not the tracker should send a hit with the new page
 * data. This default implementation can be overrided in the config options.
 * @param {string} newPath The path prior to the URL change.
 * @param {string} oldPath The path after the URL change.
 * @return {boolean} Whether or not the URL change should be tracked.
 */
UrlChangeTracker.prototype.shouldTrackUrlChange = function shouldTrackUrlChange(newPath, oldPath) {
  return newPath && oldPath;
};

/**
 * Removes all event listeners and instance properties.
 */
UrlChangeTracker.prototype.remove = function remove() {
  window.removeEventListener('popstate', this.updateTrackerData);
  history.replaceState = this.originalReplaceState;
  history.pushState = this.originalPushState;

  this.tracker = null;
  this.opts = null;
  this.path = null;

  this.updateTrackerData = null;
  this.originalReplaceState = null;
  this.originalPushState = null;
};

/**
 * @return {string} The path value of the current URL.
 */
function getPath() {
  return location.pathname + location.search;
}

exports.default = UrlChangeTracker;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = Date.now || now

function now() {
    return new Date().getTime()
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var now = __webpack_require__(19);

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _plugins = __webpack_require__(5);

var plugins = _interopRequireWildcard(_plugins);

var _tagTypes = __webpack_require__(3);

var tagTypes = _interopRequireWildcard(_tagTypes);

var _drivers = __webpack_require__(4);

var _drivers2 = _interopRequireDefault(_drivers);

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var driver = void 0;

var init = function init() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!driver) {
    driver = (0, _drivers2.default)(config);
  }

  if (!config.plugins) {
    (0, _logger.warn)('No plugins provided');
  } else {
    Object.keys(config.plugins).filter(function (pluginName) {
      return plugins[pluginName];
    }).forEach(function (pluginName) {
      var pluginConfig = _extends({}, driver.defaultConfig[pluginName] || {}, config.plugins[pluginName] || {});

      if (true) {
        (0, _logger.log)('Config for plugin : ' + pluginName);
        console.log(pluginConfig);
      }

      new plugins[pluginName](driver.instance, pluginConfig);
    });
  }
};

/**
 * send virtualpageview event to driver
 * @param {object} data - pageview data
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
var sendVirtualPageView = function sendVirtualPageView(data) {
  driver.instance.send(tagTypes.VIRTUAL_PAGEVIEW, _extends({}, (0, _utilities.getBrowserPageview)(), data));
};

/**
 * send pageview event to driver
 * @param {object} data - data to be sent
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
var sendPageView = function sendPageView(data) {
  driver.instance.send(tagTypes.PAGEVIEW, _extends({}, (0, _utilities.getBrowserPageview)(), data));
};

/**
 * send custom event
 * @param {object} data - data to be sent
 */
var sendEvent = function sendEvent(data) {
  driver.instance.send(tagTypes.EVENT, data);
};

var autoData = {
  init: init,
  sendVirtualPageView: sendVirtualPageView,
  sendPageView: sendPageView,
  sendEvent: sendEvent,
  tagTypes: tagTypes
};

module.exports = autoData;

/***/ })
/******/ ]);
});