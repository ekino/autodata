import {log} from '../utils/logger';
require('style-loader!css-loader!./demo.css');
require('./vendors/jwplayer/jwplayer');
require('./drivers/tealium');
require('./drivers/gtm');

const {autoData, jwplayer} = window;
const pageviewTag = document.querySelector('[data-pageview-page]');
const pushStateButton = document.querySelector('#pushStateButton');
const $logs = document.querySelector('.logs');

/**
 * htmlLogger - output tag in demo page
 * @param {object} tag - tag to be logged
 */
function htmlLogger(tag) {
  const newLog = document.createElement('li');
  newLog.className = 'log';
  newLog.innerHTML = `<pre>${JSON.stringify(tag, null, 2)}</pre>`;

  if ($logs.children.length === 5) {
    $logs.removeChild($logs.lastChild);
  }

  $logs.insertBefore(newLog, $logs.firstElementChild);
  log(tag.event, JSON.stringify(tag, null, 2));
}

/**
 * Push a fake history state
 */
function pushFakeState() {
  history.pushState(null, 'Random Page - ' + Date.now(), '/' + Date.now());
  pageviewTag.setAttribute('data-pageview-page', '/new-page/');
  pageviewTag.setAttribute('data-pageview-title', 'New page');
  pushStateButton.setAttribute('disabled', true);
}

/**
 * Pop state
 */
function popFakeState() {
  history.back();
  pageviewTag.setAttribute('data-pageview-page', '/demo/');
  pageviewTag.setAttribute('data-pageview-title', 'My demo page');
  pushStateButton.removeAttribute('disabled');
}

window.doFakeState = function () {
  pushFakeState();
  setTimeout(popFakeState, 1000);
};

window.doReplaceState = function () {
  history.replaceState('Random Page', null, '/fake-state');
};

window.pushFakeHash = function () {
  location.hash = Date.now();

  autoData.sendVirtualPageView({
    page: 'timestamp',
    title: 'Timestamp in the location hash',
  });
};

autoData.init({
  tms: {
    name: 'tealium',
    enhancer: (tag) => ({...tag, ...window.utag_data}),
  },
  plugins: {
    eventTracker: null,
    mediaQueryTracker: {
      mediaQueryDefinitions: [
        {
          name: 'Breakpoint',
          dimensionIndex: 1,
          items: [
            {name: 'sm', media: 'all'},
            {name: 'md', media: '(min-width: 30em)'},
            {name: 'lg', media: '(min-width: 48em)'}
          ]
        },
        {
          name: 'Resolution',
          dimensionIndex: 2,
          items: [
            {name: '1x', media: 'all'},
            {name: '1.5x', media: '(min-resolution: 144dpi)'},
            {name: '2x', media: '(min-resolution: 192dpi)'}
          ]
        },
        {
          name: 'Orientation',
          dimensionIndex: 3,
          items: [
            {name: 'landscape', media: '(orientation: landscape)'},
            {name: 'portrait', media: '(orientation: portrait)'}
          ]
        }
      ],
    },
    initialTags: {
      initialTagsDelay: 5e2,
    },
    outboundFormTracker: {
      shouldTrackOutboundForm: function (form) {
        var action = form.getAttribute('action');
        // Checks that the action is set and starts with "http" to exclude relative
        // paths, then checks that it does contains the string "google.fr".
        return action &&
          action.indexOf('http') === 0 &&
          action.indexOf('google.fr') !== -1;
      }
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
    }
  }
});

// Custom event
autoData.sendEvent({
  event: 'swipe',
  obj: 'coucou'
});

// jwplayer init
jwplayer.key = __ENV__.JWPLAYER_KEY;

const $players = document.querySelector('#jwplayer-tracker');
document.querySelector('#jwplayer-create').addEventListener('click', () => {
  const $container = document.createElement('div');
  const id = `jw-player-${Date.now()}`;
  $container.setAttribute('id', id);
  $players.appendChild($container);

  jwplayer(id).setup({
    file: '/src/demo/assets/retrowave.mp4',
    // image: 'http://example.com/myImage.png',
    height: 360,
    width: 640,
    title: 'Retrowave'
  });
});

document.querySelector('#jwplayer-destroy').addEventListener('click', () => {
  try {
    jwplayer().remove();
  } catch (err) {
    htmlLogger('No jwplayer instance found');
  }
});