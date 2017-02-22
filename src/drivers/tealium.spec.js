import {expect} from 'chai';
import {spy} from 'sinon';
import * as tagTypes from '../constants/tagTypes';
import {config, parser, sender} from './tealium';

// API mock
const utag = window.utag = {
  view: spy(),
  link: spy(),
};

// Tiny driver for test
const tealium = (type, data) => sender(parser(type, data));

describe('(Driver) tealium', () => {
  it('should respect the correct default config', () => {
    expect(config).eql({
      eventTracker: {
        trigger: 'obj',
        attributes: ['act', 'desc', 'val']
      }
    });
  });

  it(`should send ${tagTypes.EVENT} in correct format`, () => {
    const data = {obj: 'foo', desc: 'bar'};
    tealium(tagTypes.EVENT, data);
    const [tag] = utag.link.lastCall.args;

    expect(tag).eql({
      event: 'click',
      obj: 'foo',
      desc: 'bar'
    });
  });

  it(`should send ${tagTypes.VIRTUAL_PAGEVIEW} in correct format`, () => {
    const data = {page: '/home', title: 'home'};
    tealium(tagTypes.VIRTUAL_PAGEVIEW, data);
    const [tag] = utag.view.lastCall.args;

    expect(tag).eql({
      event: tagTypes.VIRTUAL_PAGEVIEW,
      page: '/home',
      title: 'home'
    });
  });

  it(`should send ${tagTypes.PAGEVIEW} in correct format`, () => {
    const data = {page: '/home', title: 'home'};
    tealium(tagTypes.PAGEVIEW, data);
    const [tag] = utag.view.lastCall.args;

    expect(tag).eql({
      event: tagTypes.PAGEVIEW,
      page: '/home',
      title: 'home'
    });
  });

  it(`should send ${tagTypes.MEDIA_QUERY} in correct format`, () => {
    const data = {name: 'breakpoint', value: 'foo'};
    tealium(tagTypes.MEDIA_QUERY, data);
    const [tag] = utag.link.lastCall.args;

    expect(tag).eql({
      event: tagTypes.MEDIA_QUERY,
      name: 'breakpoint',
      value: 'foo'
    });
  });

  it(`should send ${tagTypes.OUTBOUND_FORM} in correct format`, () => {
    const data = {action: 'http://foo.bar'};
    tealium(tagTypes.OUTBOUND_FORM, data);
    const [tag] = utag.link.lastCall.args;

    expect(tag).eql({
      event: tagTypes.OUTBOUND_FORM,
      action: 'http://foo.bar',
    });
  });

  it(`should send ${tagTypes.OUTBOUND_LINK} in correct format`, () => {
    const data = {action: 'http://foo.bar'};
    tealium(tagTypes.OUTBOUND_LINK, data);
    const [tag] = utag.link.lastCall.args;

    expect(tag).eql({
      event: tagTypes.OUTBOUND_LINK,
      action: 'http://foo.bar',
    });
  });

  it(`should send ${tagTypes.SOCIAL} in correct format`, () => {
    const data = {name: 'foo', action: 'bar'};
    tealium(tagTypes.SOCIAL, data);
    const [tag] = utag.link.lastCall.args;

    expect(tag).eql({
      event: tagTypes.SOCIAL,
      name: 'foo',
      action: 'bar',
    });
  });
});