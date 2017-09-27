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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptionalConfig = exports.camelize = exports.includes = exports.getBrowserPageview = exports.toArray = exports.isArray = exports.areDifferent = exports.isObject = exports.capitalize = exports.defaults = exports.withTimeout = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * * Camelize given string, it will search for following separators
 * - '-'
 * - '_'
 * @param {string} str - string to camelize
 * @returns {string} - camelized string
 */
var camelize = exports.camelize = function camelize() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (typeof str !== 'string') {
    _logger2.default.error('Camelize needs a string as argument');
    return str;
  }
  // eslint-disable-next-line no-unused-vars
  return str.replace(/[-|_|.](.)/gi, function (match, char) {
    return char.toUpperCase();
  });
};

/**
 * Get the optional config from DOM node
 * @param {object} configs - configuration list
 * @returns {*} - optional configuration target
 */
var getOptionalConfig = exports.getOptionalConfig = function getOptionalConfig(configs) {
  var configAttributeName = 'data-autodata-config';
  var $configTag = document.querySelector('[' + configAttributeName + ']');

  if (!$configTag) {
    return {};
  }

  var configName = $configTag.getAttribute(configAttributeName);
  var optionalConfig = configs[configName];

  if (optionalConfig && (typeof optionalConfig === 'undefined' ? 'undefined' : _typeof(optionalConfig)) === 'object') {
    return optionalConfig;
  }

  _logger2.default.warn('No configuration was found for ' + configName);

  return {};
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(23);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-confusing-arrow */
var log = {};
var noop = function noop() {};

var prepareArgs = function prepareArgs(args) {
  return args.map(function (value) {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }).join(' ');
};

var levels = [{ level: 'debug', background: '#c0f2ef', color: 'black' }, { level: 'info', background: '#8490f2', color: 'black' }, { level: 'warn', background: '#ffc765', color: 'white' }, { level: 'error', background: '#ff3f3a', color: 'white' }].map(function (_ref) {
  var level = _ref.level,
      background = _ref.background,
      color = _ref.color;
  return {
    level: level,
    background: background,
    color: color,
    logFn: function logFn() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console[level]('%c ' + prepareArgs(args), 'background: ' + background + '; padding: 3px 0; color: ' + color + ';');
    }
  };
});
var bindLevels = function bindLevels(target) {
  var enabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  target.forEach(function (_ref2) {
    var level = _ref2.level,
        logFn = _ref2.logFn;

    log[level] = enabled === true ? logFn : noop;
  });
};

var setLevel = exports.setLevel = function setLevel(levelName) {
  var levelIndex = levels.findIndex(function (_ref3) {
    var level = _ref3.level;
    return level === levelName;
  });

  if (levelIndex !== -1) {
    bindLevels(levels.slice(0, levelIndex), false);
    bindLevels(levels.slice(levelIndex, levels.length), true);
  } else {
    // TODO : warn about disable
    bindLevels(levels, false);
  }
};

// Default logger level is warn
setLevel('warn');

exports.default = log;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22),
    getRawTag = __webpack_require__(45),
    objectToString = __webpack_require__(46);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(54),
    listCacheDelete = __webpack_require__(55),
    listCacheGet = __webpack_require__(56),
    listCacheHas = __webpack_require__(57),
    listCacheSet = __webpack_require__(58);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(8);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(12);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(73);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var closest = __webpack_require__(107);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(43),
    getValue = __webpack_require__(50);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(1);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(21);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(13),
    isLength = __webpack_require__(31);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(20),
    overRest = __webpack_require__(39),
    setToString = __webpack_require__(40);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(12);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(53),
    assignMergeValue = __webpack_require__(26),
    baseFor = __webpack_require__(77),
    baseMergeDeep = __webpack_require__(79),
    isObject = __webpack_require__(1),
    keysIn = __webpack_require__(34);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(12),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(14),
    eq = __webpack_require__(8);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(87);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(88),
    isObjectLike = __webpack_require__(4);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2),
    stubFalse = __webpack_require__(90);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(92),
    baseUnary = __webpack_require__(93),
    nodeUtil = __webpack_require__(94);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(98),
    baseKeysIn = __webpack_require__(100),
    isArrayLike = __webpack_require__(16);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 36 */
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
var NO_MULTIPLE_INIT = exports.NO_MULTIPLE_INIT = 'Multiple init of autoData is not possible';

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultsDeep = __webpack_require__(38);

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _plugins = __webpack_require__(105);

var plugins = _interopRequireWildcard(_plugins);

var _tagTypes = __webpack_require__(17);

var tagTypes = _interopRequireWildcard(_tagTypes);

var _errors = __webpack_require__(36);

var errors = _interopRequireWildcard(_errors);

var _drivers = __webpack_require__(117);

var _drivers2 = _interopRequireDefault(_drivers);

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var driver = void 0;

// TODO : refactor this not enough splitted, hard to test...
var futureInit = function futureInit(_ref) {
  var common = _ref.common,
      rest = _objectWithoutProperties(_ref, ['common']);

  if (driver) {
    throw new Error(errors.NO_MULTIPLE_INIT);
  }

  // Merge optional config with common
  var config = (0, _defaultsDeep2.default)((0, _utilities.getOptionalConfig)(rest), common);

  driver = (0, _drivers2.default)(config);

  (0, _logger.setLevel)(config.debug || 'none');

  if (!config.plugins) {
    _logger2.default.warn('No plugins provided');
  } else {
    Object.keys(config.plugins).filter(function (pluginName) {
      return plugins[pluginName];
    }).forEach(function (pluginName) {
      var pluginConfig = _extends({}, driver.defaultConfig[pluginName] || {}, config.plugins[pluginName] || {});

      _logger2.default.debug('Config for plugin : ' + pluginName);
      _logger2.default.debug(pluginConfig);

      new plugins[pluginName](driver.instance, pluginConfig);
    });
  }

  // FIXME : tmp return for tests
  return config;
};

var init = function init() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!config.common) {
    config = {
      common: config
    };

    _logger2.default.warn('\n      Deprecation warning: configuration object will change in future version of autoData.\n      Please look at the documentation https://ekino.github.io/autodata/API.html#init for more\n      information.\n    ');
  }

  return futureInit(config);
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

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(18),
    baseRest = __webpack_require__(19),
    customDefaultsMerge = __webpack_require__(52),
    mergeWith = __webpack_require__(102);

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function(args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

module.exports = defaultsDeep;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(18);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(41),
    shortOut = __webpack_require__(51);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(42),
    defineProperty = __webpack_require__(21),
    identity = __webpack_require__(20);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(13),
    isMasked = __webpack_require__(47),
    isObject = __webpack_require__(1),
    toSource = __webpack_require__(49);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(22);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(48);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(24),
    isObject = __webpack_require__(1);

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

module.exports = customDefaultsMerge;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(6),
    stackClear = __webpack_require__(59),
    stackDelete = __webpack_require__(60),
    stackGet = __webpack_require__(61),
    stackHas = __webpack_require__(62),
    stackSet = __webpack_require__(63);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(7);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(6);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(6),
    Map = __webpack_require__(25),
    MapCache = __webpack_require__(64);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(65),
    mapCacheDelete = __webpack_require__(72),
    mapCacheGet = __webpack_require__(74),
    mapCacheHas = __webpack_require__(75),
    mapCacheSet = __webpack_require__(76);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(66),
    ListCache = __webpack_require__(6),
    Map = __webpack_require__(25);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(67),
    hashDelete = __webpack_require__(68),
    hashGet = __webpack_require__(69),
    hashHas = __webpack_require__(70),
    hashSet = __webpack_require__(71);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(9);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(9);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(9);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(9);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(78);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 78 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(26),
    cloneBuffer = __webpack_require__(80),
    cloneTypedArray = __webpack_require__(81),
    copyArray = __webpack_require__(84),
    initCloneObject = __webpack_require__(85),
    isArguments = __webpack_require__(29),
    isArray = __webpack_require__(30),
    isArrayLikeObject = __webpack_require__(89),
    isBuffer = __webpack_require__(32),
    isFunction = __webpack_require__(13),
    isObject = __webpack_require__(1),
    isPlainObject = __webpack_require__(91),
    isTypedArray = __webpack_require__(33),
    toPlainObject = __webpack_require__(95);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(82);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(83);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(86),
    getPrototype = __webpack_require__(27),
    isPrototype = __webpack_require__(28);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(16),
    isObjectLike = __webpack_require__(4);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    getPrototype = __webpack_require__(27),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(31),
    isObjectLike = __webpack_require__(4);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(23);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(96),
    keysIn = __webpack_require__(34);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(97),
    baseAssignValue = __webpack_require__(14);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(14),
    eq = __webpack_require__(8);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(99),
    isArguments = __webpack_require__(29),
    isArray = __webpack_require__(30),
    isBuffer = __webpack_require__(32),
    isIndex = __webpack_require__(35),
    isTypedArray = __webpack_require__(33);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1),
    isPrototype = __webpack_require__(28),
    nativeKeysIn = __webpack_require__(101);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(24),
    createAssigner = __webpack_require__(103);

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(19),
    isIterateeCall = __webpack_require__(104);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(8),
    isArrayLike = __webpack_require__(16),
    isIndex = __webpack_require__(35),
    isObject = __webpack_require__(1);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventTracker = __webpack_require__(106);

Object.defineProperty(exports, 'eventTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_eventTracker).default;
  }
});

var _initialTags = __webpack_require__(108);

Object.defineProperty(exports, 'initialTags', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_initialTags).default;
  }
});

var _mediaQueryTracker = __webpack_require__(109);

Object.defineProperty(exports, 'mediaQueryTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mediaQueryTracker).default;
  }
});

var _outboundFormTracker = __webpack_require__(111);

Object.defineProperty(exports, 'outboundFormTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outboundFormTracker).default;
  }
});

var _outboundLinkTracker = __webpack_require__(112);

Object.defineProperty(exports, 'outboundLinkTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outboundLinkTracker).default;
  }
});

var _socialTracker = __webpack_require__(113);

Object.defineProperty(exports, 'socialTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_socialTracker).default;
  }
});

var _urlChangeTracker = __webpack_require__(114);

Object.defineProperty(exports, 'urlChangeTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_urlChangeTracker).default;
  }
});

var _pageviewTracker = __webpack_require__(115);

Object.defineProperty(exports, 'pageviewTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_pageviewTracker).default;
  }
});

var _jwplayerTracker = __webpack_require__(116);

Object.defineProperty(exports, 'jwplayerTracker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_jwplayerTracker).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 106 */
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

var delegate = __webpack_require__(11);

var _require = __webpack_require__(0),
    defaults = _require.defaults,
    camelize = _require.camelize;

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
      data[camelize(attrName)] = attrValue;
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
/* 107 */
/***/ (function(module, exports) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
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
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_EVENT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _logger2.default.warn('Script tag parsing failed', err);
      return allTags;
    }
  }, [])));
  initialTags.forEach(this.send.bind(this));
};

exports.default = InitialTags;

/***/ }),
/* 109 */
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

var debounce = __webpack_require__(110);
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
/* 110 */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
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
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};


/***/ }),
/* 111 */
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
var delegate = __webpack_require__(11);
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
/* 112 */
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
var delegate = __webpack_require__(11);

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
/* 113 */
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
var delegate = __webpack_require__(11);

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
/* 114 */
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _logger2.default.warn('hotReload feature is not really well tested, be careful with its usage');
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
          data[(0, _utilities.camelize)(name)] = $trigger.getAttribute('' + attributePrefix + name);
        });
      }

      return data;
    }
  }]);

  return InitialPageview;
}();

exports.default = InitialPageview;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNSUPPORTED_EVENT = exports.NO_API_PROVIDED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      _logger2.default.warn('jwplayer:autoDetect is experimental because it uses the jwplayer.defaults configuration' + 'and it could be overridden so be careful with its use !');
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInstance;

var _errors = __webpack_require__(36);

var errors = _interopRequireWildcard(_errors);

var _Driver = __webpack_require__(118);

var _Driver2 = _interopRequireDefault(_Driver);

var _gtm = __webpack_require__(119);

var gtm = _interopRequireWildcard(_gtm);

var _tealium = __webpack_require__(120);

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
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        var enhancedTag = this.enhancer(parsedTag, type);
        // Send tag
        this.senders.forEach(function (sender) {
          return sender(enhancedTag, type);
        });

        _logger2.default.debug(type, JSON.stringify(enhancedTag, null, 2));
      } catch (err) {
        _logger2.default.error(err.stack);
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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sender = exports.parser = exports.config = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tagTypes = __webpack_require__(17);

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
 * @param {string} type - autoData tag type
 */
var sender = exports.sender = function sender(tag, type) {
  // eslint-disable-line no-unused-vars
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.dataLayer.push(tag);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sender = exports.parser = exports.config = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tagTypes = __webpack_require__(17);

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
 * @param {string} type - autoData tag type
 */
var sender = exports.sender = function sender(tag, type) {
  var clonedTag = _extends({}, tag);
  var _window = window,
      utag = _window.utag;


  if (!utag) {
    throw new Error('TEALIUM SENDER REQUIRES utag GLOBAL');
  }

  switch (type) {
    case tagTypes.PAGEVIEW:
    case tagTypes.VIRTUAL_PAGEVIEW:
      utag.view(clonedTag);
      break;
    default:
      utag.link(clonedTag);
      break;
  }
};

/***/ })
/******/ ]);
});