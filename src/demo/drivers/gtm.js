/**
 * GTM mock
 * this fils is aimed to mock gtm dataLayer base API for preventing the load
 * of the real library
 */

const $log = name => (...args) =>
  console.log(`%c GTM:${name}`, "color: white; background: blue", ...args);
const dataLayer = [];
const oldPush = dataLayer.push;
const logPush = $log("dataLayer.push");

dataLayer.push = (...args) => {
  logPush(...args);
  oldPush.apply(dataLayer, args);
};

window.dataLayer = dataLayer;
