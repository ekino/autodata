import React from "react";

const PageviewTracker = () => (
  <section>
    <h2>Pageview Tracker</h2>
    <pre className="code" rows="5">
      {`
<title
  data-pageview-page="/demo/"
  data-pageview-title="My demo page"
  data-pageview-language="French"
>Autodata demo page</title>
          `}
    </pre>
  </section>
);

export default PageviewTracker;
