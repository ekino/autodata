import * as plugins from './plugins';
import * as tagTypes from './constants/tagTypes';
import getInstance from './drivers';
import {getBrowserPageview} from './utils/utilities';
import logger, {setLevel} from './utils/logger';

let driver;

const init = (config = {}) => {
  if (!driver) {
    driver = getInstance(config);
  }

  setLevel(config.debug || 'none');

  if (!config.plugins) {
    logger.warn('No plugins provided');
  } else {
    Object.keys(config.plugins)
      .filter(pluginName => plugins[pluginName])
      .forEach((pluginName) => {
        const pluginConfig = {
          ...(driver.defaultConfig[pluginName] || {}),  // driver default config
          ...(config.plugins[pluginName] || {}),         // user plugin config
        };

        logger.debug(`Config for plugin : ${pluginName}`);
        logger.debug(pluginConfig);

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
const sendVirtualPageView = (data) => {
  driver.instance.send(tagTypes.VIRTUAL_PAGEVIEW, {
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
  driver.instance.send(tagTypes.PAGEVIEW, {
    ...getBrowserPageview(),
    ...data,
  });
};

/**
 * send custom event
 * @param {object} data - data to be sent
 */
const sendEvent = (data) => {
  driver.instance.send(tagTypes.EVENT, data);
};

const autoData = {
  init,
  sendVirtualPageView,
  sendPageView,
  sendEvent,
  tagTypes,
};

module.exports = autoData;
