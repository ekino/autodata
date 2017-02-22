import {expect} from 'chai';
import {spy} from 'sinon';
import jwplayerTracker from '../jwplayer-tracker';

const tracker = {
  send: spy()
};

const jwplayer = () => {};
jwplayer.api = {registerPlugin: spy()};

const getInstance = (options = {}) => new jwplayerTracker(tracker, options);

describe('(Plugin) jwplayer tracker', () => {
  context('constructor', () => {
    it('should throw if no api specified', () => {
      expect(getInstance).to.throw(Error);
    });

    it('should have foo bar as events', () => {
      const {opts} = getInstance({jwplayer, events: ['foo', 'bar']});
      expect(opts.events).deep.equals(['foo', 'bar']);
    });

    it('should forbid the event "all"', () => {
      expect(getInstance).to.throw();
    });

    it('should have autoDetect to true', () => {
      const {opts} = getInstance({jwplayer, autoDetect: true});
      expect(opts.autoDetect).equals(true);
    });

    it('should set jwplayer default config', () => {
      expect(jwplayer.defaults.plugins.autoData).deep.equals({});
    });
  });

  context('onEvent', () => {
    let instance;

    beforeEach(() => {
      instance = getInstance({jwplayer});
    });

    it('should track "all" event case', () => {
      instance.onEvent('all', 'foo', {bar: 'baz'});
      expect(tracker.send.calledWith('jwplayer', {obj: 'foo', bar: 'baz'}));
    });

    it('should track "default" event case', () => {
      instance.onEvent('foo', {bar: 'baz'});
      expect(tracker.send.calledWith('jwplayer', {obj: 'foo', bar: 'baz'}));
    });
  });

  context('setInstance', () => {
    let instance;

    beforeEach(() => {
      instance = getInstance({jwplayer});
    });

    it('should track the new instance', () => {
      instance.setInstance({on: spy(), uniqueId: 'foo'});
      expect(tracker.send.calledWith('jwplayer', {obj: 'instance', val: 'foo'})).equals(true);
    });

    it('should keep the new instance', () => {
      const newInstance = {on: spy(), uniqueId: 'foo'};
      instance.setInstance(newInstance);

      expect(instance.instances).deep.equals(['foo']);
    });

    [
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
    ]
      .forEach((name, i) => {
        it(`should have bound ${name} event`, () => {
          const newInstance = {on: spy(), uniqueId: i};
          instance.setInstance(newInstance);

          expect(newInstance.on.calledWith(name)).equals(true);
        });
      });
  });

  context('unsetInstance', () => {
    let instance;
    beforeEach(() => {
      instance = getInstance({jwplayer});
      instance.setInstance({uniqueId: 'foo', on: () => {}});
      instance.unsetInstance({uniqueId: 'foo'});
    });

    it('should remove the desired instance', () => {
      expect(instance.instances).deep.equals([]);
    });

    it('should track the removed instance', () => {
      expect(tracker.send.calledWith('jwplayer', {obj: 'remove', val: 'foo'}));
    });
  });
});