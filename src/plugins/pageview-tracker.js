import {defaults, getBrowserPageview, isObject, areDifferent} from '../utils/utilities';
import {warn} from '../utils/logger';

/**
 * @class InitialPageview
 */
export default class InitialPageview {
  /**
   * InitialPageview constructor
   * @param {object} tracker - tracker instance
   * @param {object} opts - configuration
   */
  constructor (tracker, opts) {
    this.opts = defaults(opts, {
      attributePrefix: 'data-pageview-',
      trigger: 'page',
      attributes: ['title'],
      withQueryString: true,
      hotReload: false
    });

    this.tracker = tracker;
    this.currentData = {};

    if (this.opts.hotReload) {
      warn('hotReload feature is not really well tested, be careful with its usage');
      this.startHotReload();
    }

    // Wait for DOM to be ready before calling it
    document.addEventListener('DOMContentLoaded', () => {
      // Initial pageview send
      this.send();
    });
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
    const {pushState, replaceState} = history;
    const onHistoryChanges = () => setTimeout(this.send.bind(this), 100);

    history.pushState = (...args) => {
      const [state, title] = args;

      // Manually set state.title
      if (isObject(state) && title) state.title = title;

      pushState.apply(history, args);
      onHistoryChanges();
    };

    // Overrides history.repaceState.
    history.replaceState = (...args) => {
      const [state, title] = args;

      // Manually set state.title
      if (isObject(state) && title) state.title = title;

      replaceState.apply(history, args);
      onHistoryChanges();
    };

    // Handles URL changes via user interaction.
    window.addEventListener('popstate', onHistoryChanges);
  }

  /**
   * send the new pageView if the data has changed
   */
  send() {
    const data = this.getPageView();

    if (areDifferent(data, this.currentData)) {
      this.currentData = data;

      this.tracker.send('pageview', data);
    }
  }

  /**
   * retrieve the pageview information for the current page
   * @returns {{page: string, title: (boolean|string)}} - pageview data
   */
  getPageView() {
    const {attributePrefix, trigger, attributes, withQueryString} = this.opts;
    // TODO : we could store this tag in constructor but there is a risk if it is not rendered yet
    const $trigger = document.querySelector(`[${attributePrefix}${trigger}]`);
    const data = getBrowserPageview(withQueryString);

    if ($trigger) {
      [...attributes, trigger]
        .filter(name => $trigger.hasAttribute(`${attributePrefix}${name}`))
        .forEach(name => {
          data[name] = $trigger.getAttribute(`${attributePrefix}${name}`);
        });
    }

    return data;
  }
}
