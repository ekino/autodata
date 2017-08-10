import {expect} from 'chai';

import {
  getBrowserPageview,
  areDifferent,
  camelize,
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
        {foo: 'bar'},
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

  context('camelize', () => {
    it('should return a camelized string', () => {
      expect(camelize(
        'i-should-be-camelized',
      )).equals('iShouldBeCamelized');
    });

    it('should return the original value without trying to camelize it', () => {
      expect(camelize(123)).equals(123);
    });
  });
});