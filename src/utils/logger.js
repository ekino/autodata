export const log = (...args) => {
  __DEV__&& console.log(
    `%c ${args.join(' ')}`, 'background: #8cdcf2; padding: 3px 0; color: black;'
  );
};

export const error = (...args) => {
  __DEV__ && console.log(
    `%c ${args.join(' ')}`, 'background: red; padding: 3px 0; color: white;'
  );
};

export const warn = (...args) => {
  __DEV__ && console.log(
    `%c ${args.join(' ')}`, 'background: orange; padding: 3px 0; color: white;'
  );
};
