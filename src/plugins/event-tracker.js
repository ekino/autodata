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


var delegate = require('delegate');
var defaults = require('../utils/utilities').defaults;


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
  var selector = `[${prefix}${this.opts.trigger}]`;

  this.delegate = delegate(document, selector,
      'click', this.handleEventClicks.bind(this));
}


/**
 * Handles all clicks on elements with event attributes.
 * @param {Event} event The DOM click event.
 */
EventTracker.prototype.handleEventClicks = function(event) {

  const link = event.delegateTarget;
  const {attributePrefix, trigger, attributes} = this.opts;
  const data = {};

  [...attributes, trigger ]
    .forEach(attrName => {
      const attrValue = link.getAttribute(`${attributePrefix}${attrName}`);
      if (attrValue) {
        data[attrName] = attrValue;
      }
    });

  this.tracker.send('event', data);
};


/**
 * Removes all event listeners and instance properties.
 */
EventTracker.prototype.remove = function() {
  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;
};


export default EventTracker;
