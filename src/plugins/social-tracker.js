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


/* global FB, twttr */


const defaults = require('../utils/utilities').defaults;
const delegate = require('delegate');


/**
 * Registers social tracking on tracker object.
 * Supports both declarative social tracking via HTML attributes as well as
 * tracking for social events when using official Twitter or Facebook widgets.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function SocialTracker(tracker, opts) {
  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    attributePrefix: 'data-',
  });

  this.tracker = tracker;

  const prefix = this.opts.attributePrefix;
  const selector = `[${prefix}social-network]` +
                 `[${prefix}social-action]` +
                 `[${prefix}social-target]`;

  // Binds methods to `this`.
  this.handleSocialClicks = this.handleSocialClicks.bind(this);
  this.addWidgetListeners = this.addWidgetListeners.bind(this);
  this.addTwitterEventHandlers = this.addTwitterEventHandlers.bind(this);
  this.handleTweetEvents = this.handleTweetEvents.bind(this);
  this.handleFollowEvents = this.handleFollowEvents.bind(this);
  this.handleLikeEvents = this.handleLikeEvents.bind(this);
  this.handleUnlikeEvents = this.handleUnlikeEvents.bind(this);

  this.delegate = delegate(document, selector,
      'click', this.handleSocialClicks);

  if (document.readyState !== 'complete') {
    // Adds the widget listeners after the window's `load` event fires.
    // If loading widgets using the officially recommended snippets, they
    // will be available at `window.load`. If not users can call the
    // `addWidgetListeners` method manually.
    window.addEventListener('load', this.addWidgetListeners);
  } else {
    this.addWidgetListeners();
  }
}


/**
 * Invokes the methods to add Facebook and Twitter widget event listeners.
 * Ensures the respective global namespaces are present before adding.
 */
SocialTracker.prototype.addWidgetListeners = function addWidgetListeners() {
  if (window.FB) this.addFacebookEventHandlers();
  if (window.twttr) this.addTwitterEventHandlers();
};


/**
 * Handles all clicks on elements with social tracking attributes.
 * @param {Event} event The DOM click event.
 */
SocialTracker.prototype.handleSocialClicks = function handleSocialClicks(event) {
  const link = event.delegateTarget;
  const prefix = this.opts.attributePrefix;

  this.tracker.send('social', {
    socialNetwork: link.getAttribute(`${prefix}social-network`),
    socialAction: link.getAttribute(`${prefix}social-action`),
    socialTarget: link.getAttribute(`${prefix}social-target`),
  });
};


/**
 * Adds event handlers for the "tweet" and "follow" events emitted by the
 * official tweet and follow buttons. Note: this does not capture tweet or
 * follow events emitted by other Twitter widgets (tweet, timeline, etc.).
 */
SocialTracker.prototype.addTwitterEventHandlers = function addTwitterEventHandlers() {
  try {
    twttr.ready(() => {
      twttr.events.bind('tweet', this.handleTweetEvents);
      twttr.events.bind('follow', this.handleFollowEvents);
    });
  } catch (err) {}
};


/**
 * Removes event handlers for the "tweet" and "follow" events emitted by the
 * official tweet and follow buttons.
 */
SocialTracker.prototype.removeTwitterEventHandlers = function removeTwitterEventHandlers() {
  try {
    twttr.ready(() => {
      twttr.events.unbind('tweet', this.handleTweetEvents);
      twttr.events.unbind('follow', this.handleFollowEvents);
    });
  } catch (err) {}
};


/**
 * Adds event handlers for the "like" and "unlike" events emitted by the
 * official Facebook like button.
 */
SocialTracker.prototype.addFacebookEventHandlers = function addFacebookEventHandlers() {
  try {
    FB.Event.subscribe('edge.create', this.handleLikeEvents);
    FB.Event.subscribe('edge.remove', this.handleUnlikeEvents);
  } catch (err) {}
};


/**
 * Removes event handlers for the "like" and "unlike" events emitted by the
 * official Facebook like button.
 */
SocialTracker.prototype.removeFacebookEventHandlers = function removeFacebookEventHandlers() {
  try {
    FB.Event.unsubscribe('edge.create', this.handleLikeEvents);
    FB.Event.unsubscribe('edge.remove', this.handleUnlikeEvents);
  } catch (err) {}
};


/**
 * Handles `tweet` events emitted by the Twitter JS SDK.
 * @param {Object} event The Twitter event object passed to the handler.
 */
SocialTracker.prototype.handleTweetEvents = function handleTweetEvents(event) {
  // Ignores tweets from widgets that aren't the tweet button.
  if (event.region !== 'tweet') return;

  const url = event.data.url || event.target.getAttribute('data-url') ||
      location.href;

  this.tracker.send('social', {
    name: 'Twitter',
    action: 'tweet',
    url,
  });
};


/**
 * Handles `follow` events emitted by the Twitter JS SDK.
 * @param {Object} event The Twitter event object passed to the handler.
 */
SocialTracker.prototype.handleFollowEvents = function handleFollowEvents(event) {
  // Ignore follows from widgets that aren't the follow button.
  if (event.region !== 'follow') return;

  const screenName = event.data.screen_name ||
      event.target.getAttribute('data-screen-name');

  this.tracker.send('social', {
    name: 'Twitter',
    action: 'follow',
    screenName,
  });
};


/**
 * Handles `like` events emitted by the Facebook JS SDK.
 * @param {string} url The URL corresponding to the like event.
 */
SocialTracker.prototype.handleLikeEvents = function handleLikeEvents(url) {
  this.tracker.send('social', {
    name: 'Facebook',
    action: 'like',
    url,
  });
};


/**
 * Handles `unlike` events emitted by the Facebook JS SDK.
 * @param {string} url The URL corresponding to the unlike event.
 */
SocialTracker.prototype.handleUnlikeEvents = function handleUnlikeEvents(url) {
  this.tracker.send('social', {
    name: 'Facebook',
    action: 'unlike',
    url,
  });
};


/**
 * Removes all event listeners and instance properties.
 */
SocialTracker.prototype.remove = function remove() {
  window.removeEventListener('load', this.addWidgetListeners);
  this.removeFacebookEventHandlers();
  this.removeTwitterEventHandlers();

  this.delegate.destroy();
  this.delegate = null;
  this.tracker = null;
  this.opts = null;

  this.handleSocialClicks = null;
  this.addWidgetListeners = null;
  this.addTwitterEventHandlers = null;
  this.handleTweetEvents = null;
  this.handleFollowEvents = null;
  this.handleLikeEvents = null;
  this.handleUnlikeEvents = null;
};


export default SocialTracker;
