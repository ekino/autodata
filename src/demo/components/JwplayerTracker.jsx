/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import logger from "../../utils/logger";

require("../vendors/jwplayer/jwplayer");

const { jwplayer } = window;

export default class JwplayerTracker extends Component {
  constructor(props) {
    super(props);

    this.createPlayer = this.createPlayer.bind(this);
    this.destroyPlayer = this.destroyPlayer.bind(this);

    jwplayer.key = __ENV__.JWPLAYER_KEY;
  }

  state = {
    instances: [],
    players: []
  };

  setupPlayer(id) {
    const { players } = this.state;

    if (!players.includes(id)) {
      jwplayer(id).setup({
        file: "/src/demo/assets/big-buck-bunny.mp4",
        // image: 'http://example.com/myImage.png',
        height: 360,
        width: 640,
        title: "Big buck bunny"
      });

      this.setState({ players: players.concat(id) });
    }
  }

  createPlayer() {
    const id = `jw-player-${Date.now()}`;

    this.setState(state => ({ instances: state.instances.concat(id) }));
  }

  destroyPlayer() {
    const { instances, players } = this.state;
    const id = instances.pop();

    try {
      jwplayer(id).remove();
      players.pop();
      this.setState({ instances, players });
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    const { instances } = this.state;

    const players = instances.map(id => (
      <li key={id} ref={() => this.setupPlayer(id)}>
        <div id={id} />
      </li>
    ));
    return (
      <section className="jwplayer-tracker">
        <h2>JwplayerTracker</h2>
        <ul>{players}</ul>
        <button type="button" className="btn" onClick={this.createPlayer}>
          Create
        </button>
        <button type="button" className="btn" onClick={this.destroyPlayer}>
          Destroy
        </button>
      </section>
    );
  }
}
