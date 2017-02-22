import {defaults} from '../utils/utilities';
import {warn} from '../utils/logger';

export const NO_API_PROVIDED = 'No JwPlayer instance was provided';
export const UNSUPPORTED_EVENT = 'The event: %s is not supported';

/**
 * Track JWPlayer activity.
 */
export default class {
  /**
   * constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - plugin configuration
   */
  constructor(tracker, opts) {
    this.opts = defaults(opts, {
      jwplayer: null,
      events: [
        'playlistItem',
        'play',
        'pause',
        'complete',
        'error',
        'seek',
        'mute',
        'volume',
        'fullscreen',
        'resize',
        'audioTrackChanged',
        'displayClick'
      ],
      autoDetect: false,
    });

    if (!this.opts.jwplayer) {
      throw new Error(NO_API_PROVIDED);
    }

    this.tracker = tracker;
    this.instances = [];

    const {jwplayer} = this.opts;

    if (this.opts.events.includes('all')) {
      throw new Error(UNSUPPORTED_EVENT.replace('%s', 'all'));
    }

    jwplayer.api.registerPlugin('autoData', '6.0', (instance) => this.setInstance(instance));

    /**
     * Add autoData plugin to default configuration
     * FIXME : configuration override risk
     * - we need to provide a warning or an exception
     *   because our configuration could be overriden
     */
    if (this.opts.autoDetect) {
      warn(
        'jwplayer:autoDetect is experimental because it uses the jwplayer.defaults configuration'
        + 'and it could be overridden so be careful with its use !'
      );
      // Prevent empty config case
      if (!jwplayer.defaults) {
        jwplayer.defaults = {};
      }
      // Prevent empty plugins config case
      if (!jwplayer.defaults.plugins) {
        jwplayer.defaults.plugins = {};
      }
      // Do the override
      jwplayer.defaults.plugins = {
        ...jwplayer.defaults.plugins, // Keep existing configuration
        autoData: {}
      };
    }
  }

  /**
   * onEvent - send event information to tracker
   * @param {object} instance - current jwplayer instance
   * @param {string} eventName - configuration event name
   * @param {object} data* - optional data for 'all' event case
   */
  onEvent(instance, eventName, data = {}) {
    let tag = {};

    switch (eventName) {
      case 'playlistItem':
        tag = {act: 'load', desc: data.item.title, val: data.index};
        break;
      case 'play':
        tag = {act: 'play', desc: data.oldstate};
        break;
      case 'pause':
        tag = {act: 'pause', desc: data.oldstate};
        break;
      case 'complete': {
        const {title = ''} = instance.getPlaylistItem();
        tag = {act: 'complete', desc: title};
        break;
      }
      case 'error':
        tag = {act: 'error', desc: data.message};
        break;
      case 'seek':
        tag = {act: 'seek', desc: `${data.position}|${data.offset}`};
        break;
      case 'mute':
        tag = {act: 'mute', desc: data.mute};
        break;
      case 'volume':
        tag = {act: 'volume', desc: data.volume};
        break;
      case 'fullscreen':
        tag = {act: 'fullscreen', desc: data.fullscreen};
        break;
      case 'resize':
        tag = {act: 'resize', desc: `${data.width}|${data.height}`};
        break;
      case 'audioTrackChanged':
        // TODO : find a way to reproduce this
        tag = {act: 'playlist', ...data};
        break;
      case 'displayClick':
        tag = {act: 'clic'};
        break;
      default:
        break;
    }

    this.tracker.send('jwplayer', tag);
  }

  /**
   * setInstance - keep instance reference and bind events
   * @param {object} instance - jwplayer instance
   */
  setInstance(instance) {
    for (let name of this.opts.events) {
      instance.on(name, (...args) => this.onEvent(instance, name, ...args));
    }
    instance.on('remove', () => this.unsetInstance(instance));

    this.instances.push(instance.uniqueId);
    this.tracker.send('jwplayer', {obj: 'instance', val: instance.uniqueId});
  }

  /**
   * unsetInstance - remove the destroyed instance reference
   * @param {object} instance - the jwplayer instance
   */
  unsetInstance(instance) {
    const instanceId = this.instances.indexOf(instance.uniqueId);

    if (instanceId !== -1) {
      this.instances.splice(instanceId, 1);
      this.tracker.send('jwplayer', {obj: 'remove', val: instance.uniqueId});
    }
  }
}