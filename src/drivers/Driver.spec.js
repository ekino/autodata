import { expect } from "chai";
import { spy } from "sinon";
import Driver from "./Driver";
import * as tagTypes from "../constants/tagTypes";

const defaultConfig = {
  // eslint-disable-next-line no-unused-vars
  parsers: [spy((type, data) => ({ ...data, parsed: true }))],
  senders: [spy()],
  enhancer: spy(tag => ({ ...tag, enhanced: true }))
};

const getInstance = (config = {}) =>
  new Driver({
    ...defaultConfig,
    ...config
  });

describe("Driver", () => {
  context("init", () => {
    it("should set the parsers", () => {
      const { parsers } = getInstance();
      expect(parsers).eql(defaultConfig.parsers);
    });

    it("should set the senders", () => {
      const { senders } = getInstance();
      expect(senders).eql(defaultConfig.senders);
    });

    it("should set the enhancer", () => {
      const { enhancer } = getInstance();
      expect(enhancer).eql(defaultConfig.enhancer);
    });

    it("should create an empty object for local data", () => {
      const { data } = getInstance();
      expect(data).eql({});
    });
  });

  context("getters / setters", () => {
    let instance;
    beforeEach(() => {
      instance = getInstance();
    });

    it("should set the value", () => {
      instance.set("foo", null);

      expect(instance.data).ownProperty("foo");
    });

    it("should get the value", () => {
      instance.set("foo", "bar");

      expect(instance.get("foo")).equals("bar");
    });
  });

  context("send", () => {
    let instance;
    beforeEach(() => {
      instance = getInstance();
    });

    it("should call the parsers", () => {
      instance.send(tagTypes.EVENT, { foo: "bar" });
      const [parser] = defaultConfig.parsers;

      expect(parser.lastCall.returnValue).ownProperty("parsed");
    });

    it("should call the enhancer", () => {
      instance.send(tagTypes.PAGEVIEW, { title: "baz" });

      expect(defaultConfig.enhancer.lastCall.returnValue).ownProperty("parsed");
    });

    it("should send the tag", () => {
      instance.send(tagTypes.EVENT, { bar: "baz" });
      const [sender] = defaultConfig.senders;

      expect(
        sender.calledWith({
          bar: "baz",
          parsed: true,
          enhanced: true
        })
      ).equals(true);
    });
  });
});
