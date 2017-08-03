/* eslint-disable no-confusing-arrow */
let debug = __DEV__;

const prepareArgs = args => args.map(
  value => typeof value === 'string' ? value : JSON.stringify(value),
).join(' ');

export const error = (...args) => {
  if (debug) {
    console.log(`%c ${prepareArgs(args)}`, 'background: red; padding: 3px 0; color: white;');
  }
};

export const warn = (...args) => {
  if (debug) {
    console.log(`%c ${prepareArgs(args)}`, 'background: orange; padding: 3px 0; color: white;');
  }
};

export const log = (...args) => {
  if (debug) {
    console.log(`%c ${prepareArgs(args)}`, 'background: #8cdcf2; padding: 3px 0; color: black;');
  }
};

export const enableDebug = () => {
  debug = true;
};

export const disableDebug = () => {
  debug = false;
};

