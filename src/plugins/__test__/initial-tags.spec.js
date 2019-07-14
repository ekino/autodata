import { expect } from "chai";
import { spy, stub } from "sinon";
import InitialTags, { DEFAULT_EVENT } from "../initial-tags";

const tracker = {
  send: spy()
};
const getInstance = (options = {}) => new InitialTags(tracker, options);

describe("(Plugin) InitialTags", () => {
  context("init", () => {
    it("should own the default options", () => {
      const { opts } = getInstance();

      expect(opts).eql({
        attributePrefix: "data-",
        initialTagsDelay: 1e3, // 1sec
        tags: []
      });
    });

    it("DEFAULT_EVENT should equals click", () => {
      expect(DEFAULT_EVENT).equals("click");
    });
  });

  context("with dom tags", () => {
    let stubQuerySelectorAll;
    beforeEach(() => {
      stubQuerySelectorAll = stub(document, "querySelectorAll").callsFake(
        selector => {
          if (selector === "[data-initial-tags]") {
            return [
              {
                innerText: JSON.stringify([
                  {
                    event: "foo-dom",
                    label: "bar-dom",
                    value: "baz-dom"
                  }
                ])
              }
            ];
          }
          return [];
        }
      );
    });

    afterEach(() => {
      stubQuerySelectorAll.restore();
    });

    it("should send collected tags", () => {
      getInstance().parseInitialTags();

      expect(
        tracker.send.calledWith("initial-tags", {
          event: "foo-dom",
          label: "bar-dom",
          value: "baz-dom"
        })
      ).equals(true);
    });
  });

  context("with config tags", () => {
    it("should send config tags", () => {
      getInstance({
        tags: [
          {
            event: "foo-config",
            label: "bar-config",
            value: "baz-config"
          }
        ]
      }).parseInitialTags();

      expect(
        tracker.send.calledWith("initial-tags", {
          event: "foo-config",
          label: "bar-config",
          value: "baz-config"
        })
      ).equals(true);
    });
  });

  context("with no event", () => {
    it(`should send ${DEFAULT_EVENT} as default`, () => {
      getInstance({
        tags: [
          {
            label: "foo-no-event",
            value: "bar-no-event"
          }
        ]
      }).parseInitialTags();

      expect(
        tracker.send.calledWith("initial-tags", {
          event: "click",
          label: "foo-no-event",
          value: "bar-no-event"
        })
      ).equals(true);
    });
  });
});
