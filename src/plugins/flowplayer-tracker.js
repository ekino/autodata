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
   */
  onEvent(instance, eventName, data = {}, srcElement) {
    let tag = null;

    switch (eventName) {
      case "playing":
        tag = { act: "play" };
        break;
      case "pause":
        tag = { act: "pause" };
        break;
      case "ended":
        // resets the flag for the "started" event
        instance.hasStarted = false;
        tag = { act: "ended" };
        break;
      case "error":
        tag = { act: "error" };
        break;
      case "seeked":
        tag = { act: "seek", desc: data.currentTime };
        break;
      case "volumechange":
        tag = { act: "volume", desc: data.volume };
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

    if (tag) {
      this.tracker.send(
        "flowplayer",
        this.opts.enhancer({ ...tag, ...this.getInfos(srcElement) })
      );
    }
  }

  /**
   * onTimeEvent - send time event information to tracker
   * @param {object} data - data for 'time' event case
   * @returns {?object} - tag object
   */
  onTimeEvent(data) {
    // Flowplayer doesn't send an event on the initial start of the video
    // send a "started" event each time the video starts from the beginning
    if (!instance.hasStarted) {
      instance.hasStarted = true;

      tag = { act: "started", ...this.getInfos(srcElement) };

      this.tracker.send("flowplayer", this.opts.enhancer(tag, itemInfo));
    }

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
   * @param {object} srcElement - video data
   * @returns {object} filtered data
   */
  getInfos(srcElement) {
    return {
      title: srcElement.title || "",
      currentSrc: srcElement.currentSrc || "",
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

    instance.on(Object.values(this.opts.events), e => {
      this.onEvent(instance, e.type, e.target, e.srcElement);
    });
  }
}
