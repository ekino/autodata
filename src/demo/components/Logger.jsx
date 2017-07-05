/* eslint-disable require-jsdoc */
import React from 'react';

const Logger = ({logs}) => (
  <aside className="logger">
    <h3>Logger</h3>
    <ul className="logs">
      {logs.map(({id, tag}) => (
        <li key={id}>
          <pre>{tag}</pre>
        </li>
      ))}
    </ul>
  </aside>
);

export default Logger;
