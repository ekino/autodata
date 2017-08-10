/* eslint-disable require-jsdoc */

// Libs
import React from 'react';
import {render} from 'react-dom';
import autoData from '../autodata';

// Demo
import Demo from './components/Demo';

require('style-loader!css-loader!./demo.css'); // eslint-disable-line
require('./drivers/tealium');
require('./drivers/gtm');

const logs = [];
const renderDemo = () => render(
  <Demo logs={logs} />, document.querySelector('#demo-app'),
);
const htmlLogger = (tag) => {
  if (logs.length > 5) {
    logs.pop();
  }
  logs.unshift({tag: JSON.stringify(tag, null, 2), id: Date.now()});
  renderDemo();
};

autoData.init({
  debug: 'debug',
  tms: {
    name: 'gtm',
    sender: htmlLogger,
  },
  plugins: {
    eventTracker: {
      attributes: ['act', 'desc', 'val', 'i-should-be-camelized'],
    },
    mediaQueryTracker: {
      mediaQueryDefinitions: [
        {
          name: 'Breakpoint',
          dimensionIndex: 1,
          items: [
            {name: 'sm', media: 'all'},
            {name: 'md', media: '(min-width: 30em)'},
            {name: 'lg', media: '(min-width: 48em)'},
          ],
        },
        {
          name: 'Resolution',
          dimensionIndex: 2,
          items: [
            {name: '1x', media: 'all'},
            {name: '1.5x', media: '(min-resolution: 144dpi)'},
            {name: '2x', media: '(min-resolution: 192dpi)'},
          ],
        },
        {
          name: 'Orientation',
          dimensionIndex: 3,
          items: [
            {name: 'landscape', media: '(orientation: landscape)'},
            {name: 'portrait', media: '(orientation: portrait)'},
          ],
        },
      ],
    },
    initialTags: {
      initialTagsDelay: 5e2,
      tags: [
        {
          event: 'user',
          label: 'geolocation',
          value: 'Paris, France',
        }, {
          event: 'ui',
          label: 'theme',
          value: 'default',
        },
      ],
    },
    outboundFormTracker: {
      shouldTrackOutboundForm(form) {
        const action = form.getAttribute('action');
        // Checks that the action is set and starts with "http" to exclude relative
        // paths, then checks that it does contains the string "google.fr".
        return action &&
          action.indexOf('http') === 0 &&
          action.indexOf('google.fr') !== -1;
      },
    },
    outboundLinkTracker: null,
//        urlChangeTracker: {},
    pageviewTracker: {
      trigger: 'page',
      attributes: ['title', 'language'],
      hotReload: true,
    },
    jwplayerTracker: {
      jwplayer,
      autoDetect: true,
    },
  },
});

// Custom event
autoData.sendEvent({
  event: 'swipe',
  obj: 'coucou',
});

renderDemo();
