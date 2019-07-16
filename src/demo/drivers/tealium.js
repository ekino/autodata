/**
 * Tealium mock
 * this fils is aimed to mock tealium base API for preventing the load
 * of the real library
 */

const $log = name => (...args) =>
  console.log(`%c TEALIUM:${name}`, "color: white; background: blue", ...args);

window.utag = {
  link: $log("utag.link"),
  view: $log("utag.view")
};

window.utag_data = {
  product_sku: "demo product sku",
  product_id: "demo product id",
  product_name: "demo product name"
};
