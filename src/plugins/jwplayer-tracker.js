import {defaults, includes, getPlaybackPercentage} from '../utils/utilities';
import logger from '../utils/logger';

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
        'firstFrame',
        'playlistItem',
        'play',
        'pause',
        'complete',
        'error',
        'seek',
        'time',
        'mute',
        'volume',
        'fullscreen',
        'resize',
        'audioTrackChanged',
        'displayClick',
      ],
      autoDetect: false,
      cuepoints: {},
      enhancer: tag => tag,
    });

    if (!this.opts.jwplayer) {
      throw new Error(NO_API_PROVIDED);
    }

    this.tracker = tracker;
    this.instances = [];

    if (this.opts.cuepoints) {
      // Unreached cuepoints
      this.uc = {
        percentages: this.opts.cuepoints.percentages || [],
        thresholds: this.opts.cuepoints.thresholds || [],
      };
    }

    const {jwplayer} = this.opts;

    if (includes(this.opts.events, 'all')) {
      throw new Error(UNSUPPORTED_EVENT.replace('%s', 'all'));
    }

    jwplayer.api.registerPlugin('autoData', '6.0', instance => this.setInstance(instance));

    /**
     * Add autoData plugin to default configuration
     * FIXME : configuration override risk
     * - we need to provide a warning or an exception
     *   because our configuration could be overriden
     */
    if (this.opts.autoDetect) {
      logger.warn(
        'jwplayer:autoDetect is experimental because it uses the jwplayer.defaults configuration'
        + 'and it could be overridden so be careful with its use !',
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
        autoData: {},
      };
    }
  }

  /**
   * calculateUnreachedCuepoints - remove all values before the position
   * @param {number} position - position that has been requested to seek to in secondes
   * @param {number} duration - duration of the current playlist item in seconds.
   */
  calculateUnreachedCuepoints(position, duration) {
    this.uc = Object.assign({}, this.opts.cuepoints);
    if (this.uc.thresholds) {
      this.uc.thresholds =
        this.uc.thresholds.filter(value => position < value);
    }
    if (this.uc.percentages) {
      const percentage = getPlaybackPercentage(position, duration);
      this.uc.percentages =
        this.uc.percentages.filter(value => percentage < value);
    }
  }

  /**
   * onEvent - send event information to tracker
   * @param {object} instance - current jwplayer instance
   * @param {string} eventName - configuration event name
   * @param {object} data* - optional data for 'all' event case
   */
  onEvent(instance, eventName, data = {}) {
    const {title = '', file = '', mediaid = 'noid'} = instance.getPlaylistItem();
    const itemInfo = {title, file, mediaid};
    let tag = null;

    switch (eventName) {
      case 'firstFrame':
        tag = {act: 'mediaStarted'};
        break;
      case 'playlistItem':
        tag = {act: 'load', val: data.index};
        break;
      case 'play':
        tag = {act: 'play', desc: data.oldstate};
        break;
      case 'pause':
        tag = {act: 'pause', desc: data.oldstate};
        break;
      case 'complete': {
        tag = {act: 'mediaEnded'};
        break;
      }
      case 'error':
        tag = {act: 'error', desc: data.message};
        break;
      case 'seek':
        this.calculateUnreachedCuepoints(data.offset, instance.getDuration());
        tag = {act: 'cuepoint', cuepointType: 'threshold', cuepointValue: data.offset};
        break;
      case 'time':
        tag = this.onTimeEvent(data);
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

    if (tag) {
      tag = {...tag, ...itemInfo};
      this.tracker.send('jwplayer', this.opts.enhancer(tag));
    }
  }

  /**
   * onTimeEvent - send time event information to tracker
   * @param {object} data - data for 'time' event case
   * @returns {?object} - tag object
   */
  onTimeEvent(data) {
    if (this.opts.cuepoints) {
      if (this.opts.cuepoints.thresholds) {
        const threshold = Math.trunc(data.position);
        const foundValue = this.uc.thresholds.find(value => data.position >= value);
        if (foundValue) {
          this.uc.thresholds =
            this.uc.thresholds.filter(value => value !== foundValue);
          return {
            act: 'cuepoint',
            cuepointType: 'threshold',
            cuepointValue: threshold,
          };
        }
      }
      if (this.opts.cuepoints.percentages) {
        const percentage = getPlaybackPercentage(data.position, data.duration);
        const foundValue = this.uc.percentages.find(value => percentage >= value);
        if (foundValue) {
          this.uc.percentages =
            this.uc.percentages.filter(value => value !== foundValue);
          return {
            act: 'cuepoint',
            cuepointType: 'percentage',
            cuepointValue: percentage,
          };
        }
      }
    }
    return null;
  }

  /**
   * setInstance - keep instance reference and bind events
   * @param {object} instance - jwplayer instance
   */
  setInstance(instance) {
    this.opts.events.forEach((name) => {
      instance.on(name, (...args) => this.onEvent(instance, name, ...args));
    });
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
