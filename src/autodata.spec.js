// Node modules
import {expect} from 'chai';
import {spy} from 'sinon';

// Test modules
import autoData from './autodata';
import Driver from './drivers/Driver';
import * as tagTypes from './constants/tagTypes';

// const {autoData} = window;

const initSpy = spy(autoData, 'init');
const tmsSpy = spy(Driver.prototype, 'send');

const defaultConfig = {
  attributePrefix: 'data-',
  tms: {
    parser: spy(),
    sender: spy(),
  },
};

describe('Autodata', () => {
  it('should export the API on window object', () => {
    expect(autoData).to.be.ok;
  });

  it('should provide init function', () => {
    expect(typeof autoData.init).equals('function');
  });

  it('should provide sendVirtualPageView function', () => {
    expect(typeof autoData.sendVirtualPageView).equals('function');
  });

  it('should provide sendPageView function', () => {
    expect(typeof autoData.sendPageView).equals('function');
  });

  it('should provide sendEvent function', () => {
    expect(typeof autoData.sendEvent).equals('function');
  });

  context('init', () => {
    it('should be called with the given config', () => {
      autoData.init(defaultConfig);
      expect(initSpy.calledWith(defaultConfig)).equals(true);
    });
  });

  context('sendVirtualPageView', () => {
    it('should send the default page and title values', () => {
      autoData.sendVirtualPageView({foo: 'bar'});

      expect(tmsSpy.calledWith(tagTypes.VIRTUAL_PAGEVIEW, {
        page: 'blank',
        title: '',
        foo: 'bar'
      })).equals(true);
    });

    it('should send the given page and title values', () => {
      autoData.sendVirtualPageView({page: '/foo', title: 'bar'});

      expect(tmsSpy.calledWith(tagTypes.VIRTUAL_PAGEVIEW, {
        page: '/foo',
        title: 'bar',
      })).equals(true);
    });
  });

  context('sendEvent', () => {
    it('should send all the given data to tms', () => {
      const data = {foo: true, bar: false, baz: true};
      autoData.sendEvent(data);

      expect(tmsSpy.calledWith(tagTypes.EVENT, data)).equals(true);
    });
  });
});