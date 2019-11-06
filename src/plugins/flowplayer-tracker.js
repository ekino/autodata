import { defaults, includes, getPlaybackPercentage } from "../utils/utilities";

export const NO_API_PROVIDED = "No FlowPlayer instance was provided";
export const UNSUPPORTED_EVENT = "The event: %s is not supported";

/**
 * Track FlowPlayer activity.
 */
export default class {
  /**
   * constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - plugin configuration
   */
  constructor(tracker, opts) {
    this.opts = defaults(opts, {
      flowplayer: null,
      events: [
        "playing",
        "pause",
        "ended",
        "error",
        "seeked",
        "cuepoint_start",
        "volume_change",
        "fullscreen_enter",
        "fullscreen_exit",
        "resize"
      ],
      autoDetect: false,
      cuepoints: {},
      enhancer: tag => tag
    });

    if (!this.opts.flowplayer) {
      throw new Error(NO_API_PROVIDED);
    }

    this.tracker = tracker;
    this.instances = [];
    this.cuepoints = [];

    const { flowplayer } = this.opts;

    if (includes(this.opts.events, "all")) {
      throw new Error(UNSUPPORTED_EVENT.replace("%s", "all"));
    }

    flowplayer.cloud.then(() => {
      this.instances = flowplayer.instances;
      this.instances.map(video => {
        if (this.opts.cuepoints) {
          this.cuepoints = this.opts.cuepoints;
          this.uc = {
            percentages: this.opts.cuepoints.percentages || [],
            thresholds: this.opts.cuepoints.thresholds || []
          };
        }
        video.on(Object.values(flowplayer.events), e => {
          this.onEvent(e.type, e.target);
        });
      });
    });
  }

  /**
   * onEvent - send event information to tracker
   * @param {string} eventName - configuration event name
   * @param {object} data* - optional data for 'all' event case
   */
  onEvent(eventName, data = {}) {
    const opts = data && data.opts;
    let tag = null;
    switch (eventName) {
      case "loadstart":
        tag = { act: "videoStarted" };
        break;
      case "playing":
        tag = { act: "play" };
        break;
      case "pause":
        tag = { act: "pause" };
        break;
      case "ended":
        tag = { act: "ended" };
        break;
      case "error":
        tag = { act: "error" };
        break;
      case "seeked":
        tag = { act: "seeked", desc: data.currentTime };
        break;
      case "cuepoints":
        tag = { act: "cuepointStart" };
        break;
      case "volumechange":
        tag = { act: "volumeChange", desc: data.volume };
        break;
      case "fullscreenenter":
        tag = { act: "fullscreenEnter", desc: "enter" };
        break;
      case "fullscreenexit":
        tag = { act: "fullscreenExit", desc: "exit" };
        break;
      case "resize":
        tag = { act: "resize", desc: `${data.width}|${data.height}` };
        break;
      case "timeupdate":
        tag = this.onTimeEvent(data);
        break;
      default:
        break;
    }

    if (tag) {
      const itemInfo = this.getInfos(opts);
      tag = { ...tag, ...itemInfo };
      this.tracker.send("flowplayer", this.opts.enhancer(tag, itemInfo));
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
        const foundValue = this.uc.thresholds.find(
          value => data.currentTime >= value
        );
        if (foundValue) {
          this.uc.thresholds = this.uc.thresholds.filter(
            value => value !== foundValue
          );
          return {
            act: "cuepoint",
            cuepointType: "threshold",
            cuepointValue: foundValue
          };
        }
      }
      if (this.opts.cuepoints.percentages) {
        const percentage = getPlaybackPercentage(
          data.currentTime,
          data.duration
        );
        const foundValue = this.uc.percentages.find(
          value => percentage >= value
        );
        if (foundValue) {
          this.uc.percentages = this.uc.percentages.filter(
            value => value !== foundValue
          );
          return {
            act: "cuepoint",
            cuepointType: "percentage",
            cuepointValue: foundValue
          };
        }
      }
    }
    return null;
  }

  /**
   * getInfos - retrieve infos from the player instance
   * @param {object} itemInfo - video data
   * @returns {object} filtered data
   */
  getInfos(itemInfo) {
    if (itemInfo) {
      return {
        title: itemInfo.metadata.title,
        mediaId: itemInfo.metadata.media_id,
        obj: "flowplayer"
      };
    }
  }
}