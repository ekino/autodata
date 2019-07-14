import { isObject } from "../utils/utilities";
import logger from "../utils/logger";

/**
 * @class Driver
 */
export default class Driver {
  /**
   * @constructor
   * @param {function|string} driver - desired driver, can be either
   *  - string for provided driver selection
   *  - function for custom driver selection
   * @param {object} data - initial driver data
   */
  constructor({ senders, parsers, enhancer }) {
    this.parsers = parsers;
    this.enhancer = enhancer || (tag => tag);
    this.senders = senders;

    this.data = {};
  }

  /**
   * Parse and send the tag to TMS
   * @param {string} type - tag type
   * @param {object} data - generic autoData information
   */
  send(type, data) {
    try {
      // Parsed tags
      const parsedTag = this.parsers.reduce(
        (currentTag, parser) => parser(type, currentTag),
        data
      );
      // Enhanced tag
      const enhancedTag = this.enhancer(parsedTag, type);
      // Send tag
      this.senders.forEach(sender => sender(enhancedTag, type));

      logger.debug(type, JSON.stringify(enhancedTag, null, 2));
    } catch (err) {
      logger.error(err.stack);
    }
  }

  /**
   * Get the asked stored property inside the tracker
   * @param {string} property - the property name
   * @returns {*} the value of the asked property
   */
  get(property) {
    return this.data[property];
  }

  /**
   * Set the given property inside the tracker
   * @param {object|string} propertyOrData - this can be a prorperty name
   *  or directly a configuration object
   * @param {*} value - the property value
   */
  set(propertyOrData, value) {
    if (isObject(propertyOrData)) {
      Object.keys(propertyOrData).forEach(propertyName => {
        this.set(propertyName, propertyOrData[propertyName]);
      });
    } else {
      this.data[propertyOrData] = value;
    }
  }
}
