/* eslint-disable require-jsdoc */
import React, {Component} from 'react';

export default class InitialTags extends Component {
  state = {
    tags: [
      {
        event: 'transaction',
        value: { },
      }, {
        event: 'variable',
        label: 'brand',
        value: 'autoData',
      },
      {
        label: 'navigation',
        value: 'home button',
      },
    ],
  };

  getTagScript(stringified = false) {
    if (stringified) {
      return `
        <script data-initial-tags type="autoData/initialTags">
          ${JSON.stringify(this.state.tags, null, 2)}
        </script>
      `;
    }
    return (
      <script data-initial-tags type="autoData/initialTags">
        {JSON.stringify(this.state.tags, null, 2)}
      </script>
    );
  }

  render() {
    return (
      <section>
        <h2>InitialTags</h2>
        <pre className="code" rows="12">{this.getTagScript(true)}</pre>
        {this.getTagScript()}
      </section>
    );
  }
}