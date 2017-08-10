import React from 'react';

const EventTracker = () => (
  <section className="section">
    <h2>EventTracker</h2>
    <div className="block-left">
      <h3>Basic example</h3>
      <button
        className="btn"
        type="button"
        data-event-obj="homepage"
        data-event-act="click on the fork button"
        data-event-desc="Fork the project"
        data-event-val="Click on fork button"
      >Push tag on click</button>
    </div>
    <div className="block-right">
      <h3>Camelize example</h3>
      <button
        className="btn"
        type="button"
        data-event-obj="camelize"
        data-event-i_should-be-camelized="Camelize example"
      >Push tag on click</button>
    </div>
  </section>
);

export default EventTracker;
