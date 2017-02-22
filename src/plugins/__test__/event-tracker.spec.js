import {expect} from 'chai';
import {spy} from 'sinon';
import eventTracker from '../event-tracker';

const tracker = {
  send: spy()
};
const defaultOptions = {
  attributePrefix: 'data-event-',
  trigger: 'obj',
  attributes: ['act', 'desc', 'val']
};

const getInstance = (options = defaultOptions) => new eventTracker(tracker, options);
const getEvent = (attributes) => ({
  delegateTarget: {
    getAttribute: (name) => attributes[name.replace(defaultOptions.attributePrefix, '')],
  }
});

describe('(Plugin) event tracker', () => {
  context('constructor', () => {
    it('should have default config', () => {
      const {opts} = getInstance();
      expect(opts).deep.equals(defaultOptions);
    });
  });

  context('handleEventClicks', () => {
    let instance;
    beforeEach(() => {
      instance = getInstance();
    });

    it('should tag the target attributes', () => {
      const attributes = {obj: 'foo', act: 'bar', desc: 'baz', val: 'toto'};
      instance.handleEventClicks(getEvent(attributes));

      expect(tracker.send.calledWith('event', attributes)).equals(true);
    });
  });
});