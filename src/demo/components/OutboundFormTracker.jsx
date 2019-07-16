import React from "react";

const OutboundFormTracker = () => (
  <section>
    <h2>OutboundFormTracker</h2>
    <form target="_blank" action="https://www.google.fr/search" method="GET">
      <input type="hidden" name="source" defaultValue="hp" />
      <p>
        <label htmlFor="q">
          Search
          <input type="text" name="q" id="q" />
        </label>
      </p>
      <button
        type="button"
        id="searchButton"
        className="btn"
        data-event-obj="formButton"
        data-event-act="search"
        data-event-desc="Research term"
        data-event-val="Google form"
      >
        Search on google
      </button>
    </form>
  </section>
);

export default OutboundFormTracker;
