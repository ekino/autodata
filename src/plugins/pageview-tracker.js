import {
  defaults,
  getBrowserPageview,
  isObject,
  areDifferent,
  camelize,
  waitForDomToBeReady
} from "../utils/utilities";
import logger from "../utils/logger";

/**
 * @class InitialPageview
 */
export default class InitialPageview {
  /**
   * InitialPageview constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - configuration
   */
  constructor(tracker, opts) {
    this.opts = defaults(opts, {
      attributePrefix: "data-pageview-",
      trigger: "page",
      attributes: ["title"],
      withQueryString: true,
      hotReload: false
    });

    this.tracker = tracker;
    this.currentData = {};

    if (this.opts.hotReload) {
      logger.warn(
        "hotReload feature is not really well tested, be careful with its usage"
      );
      this.startHotReload();
    }

    // Wait for DOM to be ready before sending the first pageview
    waitForDomToBeReady(() => this.send());
  }

  /**
   * Hot reload mechanism, this will listen for history state
   * changes and send pageview automatically
   *
   * FIXME:
   * - DOM updates for SPA. How to avoid setTimeout in order
   *   to retrieve the pageview information on the trigger tag
   * - No destroy mechanism. The events and history pushState / replaceState
   *   overrides are never restored, it could be interesting for performance
   */
  startHotReload() {
    // Overrides history.pushState.
    const { pushState, replaceState } = window.history;
    const onHistoryChanges = () => setTimeout(this.send.bind(this), 100);

    window.history.pushState = (...args) => {
      const [state, title] = args;

      // Manually set state.title
      if (isObject(state) && title) state.title = title;

      pushState.apply(window.history, args);
      onHistoryChanges();
    };

    // Overrides history.repaceState.
    window.history.replaceState = (...args) => {
      const [state, title] = args;

      // Manually set state.title
      if (isObject(state) && title) state.title = title;

      replaceState.apply(window.history, args);
      onHistoryChanges();
    };

    // Handles URL changes via user interaction.
    window.addEventListener("popstate", onHistoryChanges);
  }

  /**
   * send the new pageView if the data has changed
   */
  send() {
    const data = this.getPageView();

    if (areDifferent(data, this.currentData)) {
      this.currentData = data;

      this.tracker.send("pageview", data);
    }
  }

  /**
   * retrieve the pageview information for the current page
   * @returns {{page: string, title: (boolean|string)}} - pageview data
   */
  getPageView() {
    const { attributePrefix, trigger, attributes, withQueryString } = this.opts;
    // TODO : we could store this tag in constructor but there is a risk if it is not rendered yet
    const $trigger = document.querySelector(`[${attributePrefix}${trigger}]`);
    const data = getBrowserPageview(withQueryString);

    if ($trigger) {
      [...attributes, trigger]
        .filter(name => $trigger.hasAttribute(`${attributePrefix}${name}`))
        .forEach(name => {
          data[camelize(name)] = $trigger.getAttribute(
            `${attributePrefix}${name}`
          );
        });
    }

    return data;
  }
}
