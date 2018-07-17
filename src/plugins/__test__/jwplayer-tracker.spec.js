import {expect} from 'chai';
import {spy} from 'sinon';
import JwplayerTracker from '../jwplayer-tracker';

const tracker = {
  send: spy(),
};

const jwplayer = () => {};
jwplayer.api = {registerPlugin: spy()};

const getInstance = (options = {}) => new JwplayerTracker(tracker, options);

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
    const itemInfos = {title: '', file: '', mediaid: 'noid'};

    it('should not track "all" event case', () => {
      const instance = getInstance({jwplayer});
      instance.getPlaylistItem = () => itemInfos;

      instance.onEvent(instance, 'all', {bar: 'baz'});
      expect(tracker.send.called).equals(false);
    });

    it('should track "play" event case', () => {
      const instance = getInstance({jwplayer});
      instance.getPlaylistItem = () => itemInfos;

      instance.onEvent(instance, 'play', {oldstate: 'foo'});
      expect(tracker.send.calledWith('jwplayer', {act: 'play', ...itemInfos, desc: 'foo'}))
        .equals(true);
    });

    it('should have enhanced tag by the enhancer', () => {
      const enhancer = (tag) => {
        switch (tag.act) {
          case 'pause':
            return {
              ...tag,
              bar: 'barz',
            };
          default:
            return tag;
        }
      };

      const instance = getInstance({jwplayer, enhancer});
      instance.getPlaylistItem = () => itemInfos;

      instance.onEvent(instance, 'pause', {oldstate: 'foo'});
      expect(tracker.send.calledWith(
        'jwplayer',
        {
          act: 'pause', ...itemInfos, bar: 'barz', desc: 'foo',
        }))
        .equals(true);
    });
  });

  context('onTimeEvent', () => {
    let instance;

    beforeEach(() => {
      instance = getInstance({jwplayer});
      instance.opts = {
        cuepoints: {
          percentages: [5, 50, 75],
          thresholds: [20, 30, 60, 120],
        },
      };
      instance.uc = {
        percentages: [5, 50, 75],
        thresholds: [20, 30, 60, 120],
      };
    });

    it('should return null when no value is reached', () => {
      const data = {position: 4, duration: 120};
      expect(instance.onTimeEvent(data)).equals(null);
    });

    it('should return an object with correct cuepoint type (threshold)', () => {
      const data = {position: 30, duration: 120};
      expect(instance.onTimeEvent(data)).deep.equals({
        act: 'cuepoint',
        cuepointType: 'threshold',
        cuepointValue: 20,
      });
    });

    it('should return an object with correct cuepoint type (percentage)', () => {
      const data = {position: 5, duration: 100};
      expect(instance.onTimeEvent(data)).deep.equals({
        act: 'cuepoint',
        cuepointType: 'percentage',
        cuepointValue: 5,
      });
    });
  });

  context('calculateUnreachedCuepoints', () => {
    let instance;

    beforeEach(() => {
      instance = getInstance({jwplayer});
      instance.opts = {
        cuepoints: {
          percentages: [25, 50, 75],
          thresholds: [20, 30, 60, 120],
        },
      };
      instance.uc = {
        percentages: [25, 50, 75],
        thresholds: [20, 30, 60, 120],
      };
    });

    it('should return all cue points not reached', () => {
      instance.calculateUnreachedCuepoints(0, 120);
      expect(instance.uc).deep.equals({
        percentages: [25, 50, 75],
        thresholds: [20, 30, 60, 120],
      });

      instance.calculateUnreachedCuepoints(35, 100);
      expect(instance.uc).deep.equals({
        percentages: [50, 75],
        thresholds: [60, 120],
      });

      instance.calculateUnreachedCuepoints(99, 100);
      expect(instance.uc).deep.equals({
        percentages: [],
        thresholds: [120],
      });
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
      expect(tracker.send.calledWith('jwplayer', {obj: 'remove', val: 'foo'})).equals(true);
    });
  });
});
