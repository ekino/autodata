/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import {error} from '../../utils/logger';

require('../vendors/jwplayer/jwplayer');

const {jwplayer} = window;

export default class JwplayerTracker extends Component {
  constructor(props) {
    super(props);

    this.createPlayer = this.createPlayer.bind(this);
    this.destroyPlayer = this.destroyPlayer.bind(this);

    jwplayer.key = __ENV__.JWPLAYER_KEY;
  }

  state = {
    instances: [],
    players: [],
  };

  setupPlayer(id) {
    if (!this.state.players.includes(id)) {
      const players = [...this.state.players, id];

      jwplayer(id).setup({
        file: '/src/demo/assets/big-buck-bunny.mp4',
        // image: 'http://example.com/myImage.png',
        height: 360,
        width: 640,
        title: 'Big buck bunny',
      });

      this.setState({players});
    }
  }

  createPlayer() {
    const id = `jw-player-${Date.now()}`;
    const instances = [...this.state.instances, id];

    this.setState({instances});
  }

  destroyPlayer() {
    const {instances, players} = this.state;
    const id = instances.pop();

    try {
      jwplayer(id).remove();
      players.pop();
      this.setState({instances, players});
    } catch (err) {
      error(err);
    }
  }

  render() {
    const players = this.state.instances.map(id => (
      <li key={id} ref={() => this.setupPlayer(id)}>
        <div id={id} />
      </li>
    ));
    return (
      <section className="jwplayer-tracker">
        <h2>JwplayerTracker</h2>
        <ul>
          {players}
        </ul>
        <button className="btn" onClick={this.createPlayer}>Create</button>
        <button className="btn" onClick={this.destroyPlayer}>Destroy</button>
      </section>
    );
  }
}
