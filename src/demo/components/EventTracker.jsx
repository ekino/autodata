import React from 'react';

const EventTracker = () => (
  <section>
    <h2>EventTracker</h2>
    <button
      className="btn"
      type="button"
      data-event-obj="homepage"
      data-event-act="click on the fork button"
      data-event-desc="Fork the project"
      data-event-val="Click on fork button"
    >Push tag on click</button>
  </section>
);

export default EventTracker;
