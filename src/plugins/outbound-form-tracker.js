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

const delegate = require("delegate");
const { withTimeout, defaults } = require("../utils/utilities");

/**
 * Registers outbound form tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function OutboundFormTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackOutboundForm: this.shouldTrackOutboundForm
  });

  this.tracker = tracker;

  this.delegate = delegate(
    document,
    "form",
    "submit",
    this.handleFormSubmits.bind(this)
  );
}

/**
 * Handles all submits on form elements. A form submit is considered outbound
 * if its action attribute starts with http and does not contain
 * location.hostname.
 * When the beacon transport method is not available, the event's default
 * action is prevented and re-emitted after the hit is sent.
 * @param {Event} event The DOM submit event.
 */
OutboundFormTracker.prototype.handleFormSubmits = function handleFormSubmits(
  event
) {
  const form = event.delegateTarget;
  const action = form.getAttribute("action");
  const fieldsObj = { transport: "beacon" };

  if (this.opts.shouldTrackOutboundForm(form)) {
    if (!navigator.sendBeacon) {
      // Stops the submit and waits until the hit is complete (with timeout)
      // for browsers that don't support beacon.
      event.preventDefault();
      fieldsObj.hitCallback = withTimeout(() => {
        form.submit();
      });
    }

    this.tracker.send("outbound-form", {
      action,
      fieldsObj
    });
  }
};

/**
 * Determines whether or not the tracker should send a hit when a form is
 * submitted. By default, forms with an action attribute that starts with
 * "http" and doesn't contain the current hostname are tracked.
 * @param {Element} form The form that was submitted.
 * @return {boolean} Whether or not the form should be tracked.
 */
OutboundFormTracker.prototype.shouldTrackOutboundForm = function shouldTrackOutboundForm(
  form
) {
  const action = form.getAttribute("action");
  return (
    action &&
    action.indexOf("http") === 0 &&
    action.indexOf(document.location.hostname) < 0
  );
};

/**
 * Removes all event listeners and instance properties.
 */
OutboundFormTracker.prototype.remove = function remove() {
  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;
};

export default OutboundFormTracker;
