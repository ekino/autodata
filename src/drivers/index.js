import * as errors from "../constants/errors";

// Driver class
import Driver from "./Driver";

// Drivers
import * as gtm from "./gtm";
import * as tealium from "./tealium";

/**
 * retrieves the desired driver and instanciates it
 * @param {object} config - user config
 * @returns {{instance: Driver, defaultConfig: {}}} - instance and defaultConfig
 */
export default function getInstance(config) {
  const { tms } = config;
  const defaultConfig = {};

  if (!tms) {
    throw new Error(errors.NO_DRIVER_PROVIDED);
  }

  const parsers = [];
  const senders = [];

  switch (tms.name) {
    case "gtm":
      parsers.push(gtm.parser);
      senders.push(gtm.sender);
      break;
    case "tealium":
      parsers.push(tealium.parser);
      senders.push(tealium.sender);
      break;
    default:
      break;
  }

  if (tms.parser) parsers.push(tms.parser);
  if (tms.sender) senders.push(tms.sender);

  return {
    instance: new Driver({
      parsers,
      enhancer: tms.enhancer,
      senders
    }),
    defaultConfig
  };
}
