import {expect} from 'chai';

import {
  getBrowserPageview,
  areDifferent,
} from './utilities';

describe('(Utils) utilities', () => {
  context('getBrowserPageview', () => {
    it('should return the current pathname', () => {
      const {page} = getBrowserPageview();
      expect(page).equals(location.pathname + location.search);
    });

    it('should return the current title', () => {
      const {title} = getBrowserPageview();
      expect(title).equals(document.title);
    });
  });

  context('areDifferent', () => {
    it('should return false for same objects', () => {
      expect(areDifferent(
        {foo: 'bar'},
        {foo: 'bar'}
      )).equals(false);
    });

    it('should return true for name differences', () => {
      expect(areDifferent(
        {foo: 'bar'},
        {foo: 'bar', bar: 'baz'},
      )).equals(true);
    });

    it('should return true for value differences', () => {
      expect(areDifferent(
        {foo: 'bar'},
        {foo: 'baz'},
      )).equals(true);
    });
  });
});