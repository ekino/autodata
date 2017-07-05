import React from 'react';

const InitialTags = () => (
  <section>
    <h2>InitialTags</h2>
    <pre className="code" rows="12">
      {`
<script data-initial-tags type="autoData/initialTags">
[
  {
    "event": "transaction",
    "value": { }
  }, {
    "event": "variable",
    "label": "brand",
    "value": "autoData"
  }
]
</script>
          `}
    </pre>
    <script
      data-initial-tags
      type="autoData/initialTags"
      dangerouslySetInnerHTML={{__html: `
                  [
                    {
                      "event": "transaction",
                      "value": { }
                    }, {
                      "event": "variable",
                      "label": "brand",
                      "value": "autoData"
                    }
                  ]
                `}}
    />
  </section>
);

export default InitialTags;