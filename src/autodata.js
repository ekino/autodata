import * as plugins from './plugins';
import * as tagTypes from './constants/tagTypes';
import getInstance from './drivers';
import {getBrowserPageview} from './utils/utilities';
import {warn, log} from './utils/logger';

let _driver;

const init = (config = {}) => {
  if (!_driver) {
    _driver = getInstance(config);
  }

  if (!config.plugins) {
    warn('No plugins provided');
  } else {
    Object.keys(config.plugins)
      .filter(pluginName => plugins[pluginName])
      .forEach(pluginName => {
        const pluginConfig = {
          ...(_driver.defaultConfig[pluginName] || {}),  // driver default config
          ...(config.plugins[pluginName] || {}),         // user plugin config
        };

        if (__DEV__) {
          log(`Config for plugin : ${pluginName}`);
          console.log(pluginConfig);
        }

        new plugins[pluginName](_driver.instance, pluginConfig);
      });
  }
};

/**
 * send virtualpageview event to driver
 * @param {object} data - pageview data
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
const sendVirtualPageView = (data) => {
  _driver.instance.send(tagTypes.VIRTUAL_PAGEVIEW, {
    ...getBrowserPageview(),
    ...data,
  });
};

/**
 * send pageview event to driver
 * @param {object} data - data to be sent
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
const sendPageView = (data) => {
  _driver.instance.send(tagTypes.PAGEVIEW, {
    ...getBrowserPageview(),
    ...data,
  });
};

/**
 * send custom event
 * @param {object} data - data to be sent
 */
const sendEvent = (data) => {
  _driver.instance.send(tagTypes.EVENT, data);
};

const autoData = {
  init,
  sendVirtualPageView,
  sendPageView,
  sendEvent,
  tagTypes,
};

module.exports = autoData;
