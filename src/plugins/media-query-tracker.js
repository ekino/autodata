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

const debounce = require("debounce");
const { defaults, isObject, toArray } = require("../utils/utilities");

/**
 * Sets the string to use when no custom dimension value is available.
 */
const NULL_DIMENSION = "(not set)";

/**
 * Declares the MediaQueryListener instance cache.
 */
const mediaMap = {};

/**
 * Registers media query tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function MediaQueryTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.matchMedia) return;

  this.opts = defaults(opts, {
    mediaQueryDefinitions: false,
    mediaQueryChangeTemplate: this.changeTemplate,
    mediaQueryChangeTimeout: 1000
  });

  // Exits early if media query data doesn't exist.
  if (!isObject(this.opts.mediaQueryDefinitions)) return;

  this.opts.mediaQueryDefinitions = toArray(this.opts.mediaQueryDefinitions);
  this.tracker = tracker;
  this.changeListeners = [];

  this.processMediaQueries();
}

/**
 * Loops through each media query definition, sets the custom dimenion data,
 * and adds the change listeners.
 */
MediaQueryTracker.prototype.processMediaQueries = function processMediaQueries() {
  this.opts.mediaQueryDefinitions.forEach(definition => {
    // Only processes definitions with a name and index.
    if (definition.name && definition.dimensionIndex) {
      const mediaName = this.getMatchName(definition);
      this.tracker.set(`dimension${definition.dimensionIndex}`, mediaName);

      this.addChangeListeners(definition);
    }
  });
};

/**
 * Takes a definition object and return the name of the matching media item.
 * If no match is found, the NULL_DIMENSION value is returned.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension.
 * @return {string} The name of the matched media or NULL_DIMENSION.
 */
MediaQueryTracker.prototype.getMatchName = function getMatchName(definition) {
  let match;

  definition.items.forEach(item => {
    if (getMediaListener(item.media).matches) {
      match = item;
    }
  });
  return match ? match.name : NULL_DIMENSION;
};

/**
 * Adds change listeners to each media query in the definition list.
 * Debounces the changes to prevent unnecessary hits from being sent.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.addChangeListeners = function addChangeListeners(
  definition
) {
  definition.items.forEach(item => {
    const mql = getMediaListener(item.media);
    const fn = debounce(() => {
      this.handleChanges(definition);
    }, this.opts.mediaQueryChangeTimeout);

    mql.addListener(fn);
    this.changeListeners.push({ mql, fn });
  });
};

/**
 * Handles changes to the matched media. When the new value differs from
 * the old value, a change event is sent.
 * @param {Object} definition A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.handleChanges = function handleChanges(definition) {
  const newValue = this.getMatchName(definition);
  const oldValue = this.tracker.get(`dimension${definition.dimensionIndex}`);

  if (newValue !== oldValue) {
    this.tracker.set(`dimension${definition.dimensionIndex}`, newValue);
    this.tracker.send("media-query", {
      name: definition.name,
      value: this.opts.mediaQueryChangeTemplate(oldValue, newValue)
    });
  }
};

/**
 * Removes all event listeners and instance properties.
 */
MediaQueryTracker.prototype.remove = function remove() {
  for (let i = 0, listener; (listener = this.changeListeners[i]); i += 1) {
    listener.mql.removeListener(listener.fn);
  }
  this.changeListeners = null;
  this.tracker = null;
  this.opts = null;
};

/**
 * Sets the default formatting of the change event label.
 * This can be overridden by setting the `mediaQueryChangeTemplate` option.
 * @param {string} oldValue The value of the media query prior to the change.
 * @param {string} newValue The value of the media query after the change.
 * @return {string} The formatted event label.
 */
MediaQueryTracker.prototype.changeTemplate = function changeTemplate(
  oldValue,
  newValue
) {
  return `${oldValue} => ${newValue}`;
};

/**
 * Accepts a media query and returns a MediaQueryListener object.
 * Caches the values to avoid multiple unnecessary instances.
 * @param {string} media A media query value.
 * @return {MediaQueryListener} The matched media.
 */
function getMediaListener(media) {
  // Returns early if the media is cached.
  if (mediaMap[media]) return mediaMap[media];

  mediaMap[media] = window.matchMedia(media);
  return mediaMap[media];
}

export default MediaQueryTracker;
