const noop = () => {};

export const log = __DEV__ ? (...args) => console.log(
  `%c ${args.join(' ')}`, 'background: #8cdcf2; padding: 3px 0; color: black;',
) : noop;

export const error = __DEV__ ? (...args) => console.log(
  `%c ${args.join(' ')}`, 'background: red; padding: 3px 0; color: white;',
) : noop;

export const warn = __DEV__ ? (...args) => console.log(
  `%c ${args.join(' ')}`, 'background: orange; padding: 3px 0; color: white;',
) : noop;
