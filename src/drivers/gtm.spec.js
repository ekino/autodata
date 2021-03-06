import { expect } from "chai";
import * as tagTypes from "../constants/tagTypes";
import { config, parser, sender } from "./gtm";

describe("(Driver) gtm", () => {
  describe("sender initialization", () => {
    after(() => {
      delete window.dataLayer;
    });

    it('should use "dataLayer" as default data layer name', () => {
      // WHEN
      sender()("tag");

      // THEN
      expect(window.dataLayer)
        .to.be.an("array")
        .that.includes("tag");
    });

    it("should use a custom datalayer name", () => {
      // WHEN
      sender("customDataLayer")("tag");

      // THEN
      expect(window["customDataLayer"])
        .to.an("array")
        .that.includes("tag");
    });
  });

  describe("sender calls", () => {
    // Return last pushed layer
    const lastLayer = () => window.dataLayer.pop();

    let gtm;
    beforeEach(() => {
      window.dataLayer = [];

      gtm = (type, data) => sender()(parser(type, data), type);
    });

    it("should respect the correct default config", () => {
      expect(config).deep.equals({
        eventTracker: {
          trigger: "obj",
          attributes: ["act", "desc", "val"]
        }
      });
    });

    it(`should send ${tagTypes.EVENT} in correct format`, () => {
      const data = { obj: "foo", desc: "bar" };
      gtm(tagTypes.EVENT, data);

      expect(lastLayer()).deep.equals({
        event: "click",
        ...data
      });
    });

    it(`should send ${tagTypes.VIRTUAL_PAGEVIEW} in correct format`, () => {
      const data = { page: "/home", title: "home" };
      gtm(tagTypes.VIRTUAL_PAGEVIEW, data);

      expect(lastLayer()).deep.equals({
        event: "virtualpageview",
        ...data
      });
    });

    it(`should send ${tagTypes.PAGEVIEW} in correct format`, () => {
      const data = { page: "/home", title: "home" };
      gtm(tagTypes.PAGEVIEW, data);

      expect(lastLayer()).deep.equals({
        event: "pageview",
        ...data
      });
    });

    it(`should send ${tagTypes.MEDIA_QUERY} in correct format`, () => {
      const data = { name: "breakpoint", value: "foo" };
      gtm(tagTypes.MEDIA_QUERY, data);

      expect(lastLayer()).deep.equals({
        event: "media-query",
        ...data
      });
    });

    it(`should send ${tagTypes.OUTBOUND_FORM} in correct format`, () => {
      const data = { action: "http://foo.bar" };
      gtm(tagTypes.OUTBOUND_FORM, data);

      expect(lastLayer()).deep.equals({
        event: "outbound-form",
        ...data
      });
    });

    it(`should send ${tagTypes.OUTBOUND_LINK} in correct format`, () => {
      const data = { href: "http://foo.bar" };
      gtm(tagTypes.OUTBOUND_LINK, data);

      expect(lastLayer()).deep.equals({
        event: "outbound-link",
        ...data
      });
    });

    it(`should send ${tagTypes.SOCIAL} in correct format`, () => {
      const data = { name: "foo", action: "bar" };
      gtm(tagTypes.SOCIAL, data);

      expect(lastLayer()).deep.equals({
        event: "social",
        ...data
      });
    });
  });
});
