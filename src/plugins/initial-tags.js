const defaults = require('../utils/utilities').defaults;

/**
 * Registers initial tags events.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function InitialTags(tracker, opts) {
  this.opts = defaults(opts, {
    attributePrefix: 'data-',
    initialTagsDelay: 1e3, // 1sec
  });

  this.tracker = tracker;
  this.tagSelector = `[${this.opts.attributePrefix}initial-tags]`;

  // Wait for DOM to be ready before calling it
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(this.parseInitialTags.bind(this), this.opts.initialTagsDelay);
  });
}

/**
 * Sends the given tag to tracker
 * @param {object} tag - the tag to send
 */
InitialTags.prototype.send = function send(tag) {
  this.tracker.send('initial-tags', {
    tag,
    event: tag.event,
  });
};

/**
 * Parse the initialTags HTMLScriptElement and send it to tracker
 */
InitialTags.prototype.parseInitialTags = function parseInitialTags() {
  const initialTags = [].slice.call(document.querySelectorAll(this.tagSelector));

  if (initialTags.length) {
    initialTags.forEach((initialTagNode) => { // looping over each initialTags node
      const tags = JSON.parse(initialTagNode.innerText);

      if (tags && tags.length) {
        tags.forEach(this.send.bind(this)); // send each tags
      }
    });
  }
};


export default InitialTags;
