import logger from "../utils/logger";
import { defaults, waitForDomToBeReady } from "../utils/utilities";

export const DEFAULT_EVENT = "click";

/**
 * Registers initial tags events.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function InitialTags(tracker, opts) {
  this.opts = defaults(opts, {
    attributePrefix: "data-",
    initialTagsDelay: 1e3, // 1sec
    tags: []
  });

  this.tracker = tracker;
  this.tagSelector = `[${this.opts.attributePrefix}initial-tags]`;

  // Wait for DOM to be ready before parsing initial tags
  waitForDomToBeReady(() => {
    setTimeout(this.parseInitialTags.bind(this), this.opts.initialTagsDelay);
  });
}

/**
 * Sends the given tag to tracker
 * @param {object} tag - the tag to send
 */
InitialTags.prototype.send = function send(tag) {
  this.tracker.send("initial-tags", {
    event: DEFAULT_EVENT,
    ...tag
  });
};

/**
 * Parse the initialTags HTMLScriptElement and send it to tracker
 */
InitialTags.prototype.parseInitialTags = function parseInitialTags() {
  const scriptTags = [].slice.call(document.querySelectorAll(this.tagSelector));
  const initialTags = [
    // Tags from config
    ...this.opts.tags,
    // Tags from DOM
    ...scriptTags.reduce((allTags, scriptTag) => {
      try {
        return allTags.concat(JSON.parse(scriptTag.innerText));
      } catch (err) {
        logger.warn("Script tag parsing failed", err);
        return allTags;
      }
    }, [])
  ];
  initialTags.forEach(this.send.bind(this));
};

export default InitialTags;
