import deepMerge from "deepmerge";
import * as plugins from "./plugins";
import * as tagTypes from "./constants/tagTypes";
import * as errors from "./constants/errors";
import getInstance from "./drivers";
import { getBrowserPageview, getOptionalConfig } from "./utils/utilities";
import logger, { setLevel } from "./utils/logger";

let driver;

// will host every global functions needed by autoData plugins
window.autoDataTools = {};

// TODO : refactor this not enough splitted, hard to test...
const futureInit = ({ common, ...rest }) => {
  if (driver) {
    throw new Error(errors.NO_MULTIPLE_INIT);
  }

  // Merge deeply optional config with common
  const config = deepMerge(getOptionalConfig(rest), common);

  driver = getInstance(config);

  setLevel(config.debug || "none");

  if (!config.plugins) {
    logger.warn("No plugins provided");
  } else {
    Object.keys(config.plugins)
      .filter(pluginName => plugins[pluginName])
      .forEach(pluginName => {
        const pluginConfig = {
          ...(driver.defaultConfig[pluginName] || {}), // driver default config
          ...(config.plugins[pluginName] || {}) // user plugin config
        };

        logger.debug(`Config for plugin : ${pluginName}`);
        logger.debug(pluginConfig);

        new plugins[pluginName](driver.instance, pluginConfig);
      });
  }

  // FIXME : tmp return for tests
  return config;
};

const init = (config = {}) => {
  if (!config.common) {
    config = {
      common: config
    };

    logger.warn(`
      Deprecation warning: configuration object will change in future version of autoData.
      Please look at the documentation https://ekino.github.io/autodata/API.html#init for more
      information.
    `);
  }

  return futureInit(config);
};

/**
 * send virtualpageview event to driver
 * @param {object} data - pageview data
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
const sendVirtualPageView = data => {
  driver.instance.send(tagTypes.VIRTUAL_PAGEVIEW, {
    ...getBrowserPageview(),
    ...data
  });
};

/**
 * send pageview event to driver
 * @param {object} data - data to be sent
 * @param {string} data.page - page name
 * @param {string} data.title - page title
 */
const sendPageView = data => {
  driver.instance.send(tagTypes.PAGEVIEW, {
    ...getBrowserPageview(),
    ...data
  });
};

/**
 * send custom event
 * @param {object} data - data to be sent
 */
const sendEvent = data => {
  driver.instance.send(tagTypes.EVENT, data);
};

export default {
  init,
  sendVirtualPageView,
  sendPageView,
  sendEvent,
  tagTypes
};
