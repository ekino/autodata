import * as tagTypes from "../constants/tagTypes";

/**
 * default plugin's configuration object
 * @type {{plugins: {eventTracker: {trigger: string, attributes: [*]}}}}
 */
export const config = {
  eventTracker: {
    trigger: "obj",
    attributes: ["act", "desc", "val"]
  }
};

/**
 * Tags sending function
 * @param {string} type - tag type (usually plugins)
 * @param {object} data - data for the current tag
 * @returns {object} - parsed tag
 */
export const parser = (type, data = {}) => {
  switch (type) {
    case tagTypes.EVENT:
      return { event: "click", ...data };
    case tagTypes.VIRTUAL_PAGEVIEW:
      return { event: "virtualpageview", ...data };
    case tagTypes.PAGEVIEW:
      return { event: "pageview", ...data };
    case tagTypes.MEDIA_QUERY: // TODO
    case tagTypes.OUTBOUND_FORM: // TODO
    case tagTypes.OUTBOUND_LINK: // TODO
    case tagTypes.SOCIAL: // TODO
    case tagTypes.INITIAL_TAGS: // TODO
    default:
      return { event: type, ...data };
  }
};

/**
 * Create a sender
 * @param {string} dataLayerName - name of the dataLayer to push events
 * @returns {Function} - a sender
 */
export const sender = (dataLayerName = "dataLayer") => tag => {
  if (!window[dataLayerName]) {
    window[dataLayerName] = [];
  }

  window[dataLayerName].push(tag);
};
