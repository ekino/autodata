import logger from "./logger";

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
export const withTimeout = (callback, wait) => {
  let called = false;
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
export const defaults = (overrides, values) => {
  const result = {};

  if (typeof overrides !== "object") {
    overrides = {};
  }

  if (typeof values !== "object") {
    values = {};
  }

  Object.keys(values).forEach(key => {
    result[key] = key in overrides ? overrides[key] : values[key];
  });
  return result;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str The input string.
 * @return {string} The capitalized string
 */
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Indicates whether the passed constiable is a JavaScript object.
 * @param {*} value The input constiable to test.
 * @return {boolean} Whether or not the test is an object.
 */
export const isObject = value => typeof value === "object" && value !== null;

/**
 * Compare to objects and determine if there first level of hierarchy is different
 * @param {object} obj1 - first object
 * @param {object} obj2 - second object
 * @returns {boolean} - true if the objects are different
 */
export const areDifferent = (obj1 = {}, obj2 = {}) => {
  switch (true) {
    case !!Object.keys(obj1).filter(name => !(name in obj2)).length:
    case !!Object.keys(obj2).filter(name => !(name in obj1)).length:
    case !!Object.keys(obj1).filter(name => obj1[name] !== obj2[name]).length:
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
export const isArray =
  Array.isArray ||
  function isArrayPolyfill(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  };

/**
 * Accepts a value that may or may not be an array. If it is not an array,
 * it is returned as the first item in a single-item array.
 * @param {*} value The value to convert to an array if it is not.
 * @return {Array} The array-ified value.
 */
export const toArray = value => {
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
export const getBrowserPageview = (withQueryString = true) => {
  const { pathname, search } = document.location;
  const { title } = window.history.state || document;

  return {
    page: `${pathname}${withQueryString ? search : ""}`,
    title
  };
};

/**
 * Prevent unsupported Array.includes
 * @param {array} arr - dataset to test
 * @param {*} value - value to find
 * @return {boolean} - bool state of Array.includes
 */
export const includes = (arr, value) => arr.indexOf(value) !== -1;

/**
 * * Camelize given string, it will search for following separators
 * - '-'
 * - '_'
 * @param {string} str - string to camelize
 * @returns {string} - camelized string
 */
export const camelize = (str = "") => {
  if (typeof str !== "string") {
    logger.error("Camelize needs a string as argument");
    return str;
  }
  // eslint-disable-next-line no-unused-vars
  return str.replace(/[-|_|.](.)/gi, (match, char) => char.toUpperCase());
};

/**
 * Get the optional config from DOM node
 * @param {object} configs - configuration list
 * @returns {*} - optional configuration target
 */
export const getOptionalConfig = configs => {
  const configAttributeName = "data-autodata-config";
  const $configTag = document.querySelector(`[${configAttributeName}]`);

  if (!$configTag) {
    return {};
  }

  const configName = $configTag.getAttribute(configAttributeName);
  const optionalConfig = configs[configName];

  if (optionalConfig && typeof optionalConfig === "object") {
    return optionalConfig;
  }

  logger.warn(`No configuration was found for ${configName}`);

  return {};
};

/**
 * As the library can be loaded async we need this helper to condition some logic
 * only if the DOM is ready.
 * But if it is loaded synchronously the callback will be triggered immediately
 * @param {function} callback - callback
 */
export const waitForDomToBeReady = callback => {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      callback();
    });
  }
};

/**
 * Get playback percentage of the playlist item
 * @param {number} cuepointValue - value of the cuepoint in seconds
 * @param {number} duration - duration of the current playlist item in seconds.
 * @returns {number} percentage in absolute
 */
export const getPlaybackPercentage = (cuepointValue, duration) =>
  Math.trunc((cuepointValue / duration) * 100);
