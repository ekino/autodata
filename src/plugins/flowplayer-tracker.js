import { defaults, getPlaybackPercentage } from "../utils/utilities";

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
      events: [
        "playing",
        "pause",
        "ended",
        "error",
        "seeked",
        "volumechange",
        "fullscreenenter",
        "fullscreenexit",
        "resize",
        "timeupdate"
      ],
      cuepoints: {},
      enhancer: tag => tag
    });

    this.tracker = tracker;
    this.instances = [];
    this.cuepoints = [];

    window.autoDataTools = {
      registerFlowplayer: instance => {
        this.setInstance(instance);
      }
    };

    // eslint-disable-next-line
    // window.flowplayer.future && window.flowplayer.future((video, wrapper, instance) => {
    //   this.setInstance(instance);
    // });

    // const { flowplayer } = this.opts;

    // if (includes(this.opts.events, "all")) {
    //   throw new Error(UNSUPPORTED_EVENT.replace("%s", "all"));
    // }

    // this.instances = flowplayer.instances || [];
    // this.instances.forEach(video => {
    //   this.setInstance(video);
    // });
  }

  /**
   * onEvent - send event information to tracker
   * @param {object} instance - current flowplayer instance
   * @param {string} eventName - configuration event name
   * @param {object} data* - optional data for 'all' event case
   * @param {any} srcElement - srcElement from the event
   * @param {Error} error - error thrown by Player
   */
  onEvent(instance, eventName, data = {}, srcElement, error) {
    let tag = null;

    switch (eventName) {
      case "pause":
        tag = { act: "pause" };
        break;

      case "ended":
        // resets the flag for the "started" event
        instance.hasStarted = false;
        tag = { act: "ended" };
        break;

      case "error":
        tag = { act: "error", desc: error.type, val: error.code };
        break;

      case "seeked":
        tag = {
          act: "seek",
          desc: data.currentTime,
          val: Math.round(data.currentTime)
        };
        break;

      case "volumechange":
        if (instance.muted) {
          tag = { act: "mute" };
        } else {
          tag = { act: "volume", desc: data.volume };
        }
        break;

      case "fullscreenenter":
        tag = { act: "fullscreen", desc: "enter" };
        break;

      case "fullscreenexit":
        tag = { act: "fullscreen", desc: "exit" };
        break;

      case "resize":
        tag = {
          act: "resize",
          desc: `${data.clientWidth}|${data.clientHeight}`
        };
        break;

      case "timeupdate":
        tag = this.onTimeEvent(data);
        break;

      default:
        break;
    }

    if (eventName === "playing" && !instance.hasStarted) {
      instance.hasStarted = true;

      this.tracker.send(
        "flowplayer",
        this.opts.enhancer({ act: "started", ...this.getInfos(srcElement) })
      );
    }

    if (tag) {
      this.tracker.send(
        "flowplayer",
        this.opts.enhancer({ ...tag, ...this.getInfos(srcElement) })
      );
    }
  }

  /**
   * onTimeEvent - send time event information to tracker
   * @param {object} instance - data for 'time' event case
   * @returns {?object} - tag object
   */
  onTimeEvent(instance) {
    if (this.opts.cuepoints) {
      if (this.opts.cuepoints.thresholds) {
        const foundValue = this.uc.thresholds.find(
          value => instance.currentTime >= value
        );

        if (foundValue) {
          this.uc.thresholds = this.uc.thresholds.filter(
            value => value !== foundValue
          );

          return {
            act: "cuepoint",
            desc: "threshold",
            val: foundValue
          };
        }
      }

      if (this.opts.cuepoints.percentages) {
        const percentage = getPlaybackPercentage(
          instance.currentTime,
          instance.duration
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
            desc: "percentage",
            val: foundValue
          };
        }
      }
    }

    return null;
  }

  /**
   * getInfos - retrieve infos from the player instance
   * @param {object} srcElement - video data
   * @returns {object} filtered data
   */
  getInfos(srcElement) {
    return {
      title: srcElement.title || "",
      file: srcElement.currentSrc,
      obj: "flowplayer"
    };
  }

  /**
   * setInstance - keep instance reference and bind events
   * @param {object} instance - flowplayer instance
   */
  setInstance(instance) {
    instance.hasStarted = false;

    if (this.opts.cuepoints) {
      this.cuepoints = this.opts.cuepoints;
      this.uc = {
        percentages: this.opts.cuepoints.percentages || [],
        thresholds: this.opts.cuepoints.thresholds || []
      };
    }

    instance.on(this.opts.events, e => {
      this.onEvent(instance, e.type, e.target, e.srcElement, e.error);
    });
  }
}
