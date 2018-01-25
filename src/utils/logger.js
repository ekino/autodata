/* eslint-disable no-confusing-arrow */
const log = {};
const noop = () => {};

const prepareArgs = args => args.map(
  value => typeof value === 'string' ? value : JSON.stringify(value),
).join(' ');

const levels = [
  {level: 'debug', background: '#c0f2ef', color: 'black'},
  {level: 'info', background: '#8490f2', color: 'black'},
  {level: 'warn', background: '#ffc765', color: 'white'},
  {level: 'error', background: '#ff3f3a', color: 'white'},
].map(({level, background, color}) => ({
  level,
  background,
  color,
  logFn: (...args) => {
    console[level](
      `%c ${prepareArgs(args)}`,
      `background: ${background}; padding: 3px 0; color: ${color};`,
    );
  },
}));
const bindLevels = (target, enabled = true) => {
  target.forEach(({level, logFn}) => {
    log[level] = enabled === true ? logFn : noop;
  });
};

export const setLevel = (levelName) => {
  let levelIndex = -1;
  levels.forEach(({level}, idx) => {
    if (level === levelName) {
      levelIndex = idx;
    }
  });

  if (levelIndex !== -1) {
    bindLevels(levels.slice(0, levelIndex), false);
    bindLevels(levels.slice(levelIndex, levels.length), true);
  } else {
    // TODO : warn about disable
    bindLevels(levels, false);
  }
};

// Default logger level is warn
setLevel('warn');

export default log;
