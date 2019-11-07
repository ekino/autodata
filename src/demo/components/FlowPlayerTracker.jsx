/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import logger from "../../utils/logger";

require("../vendors/flowplayer/flowplayer");

const { flowPlayer } = window;

export default class FlowplayerTracker extends Component {
  constructor(props) {
    super(props);

    this.createPlayer = this.createPlayer.bind(this);
    this.destroyPlayer = this.destroyPlayer.bind(this);
  }

  state = {
    instances: [],
    players: []
  };

  createPlayer() {
    const id = `flow-player-${Date.now()}`;

    this.setState(state => ({ instances: state.instances.concat(id) }), () => {
        flowplayer(`#${id}`, {
          src: 'https://i.imgur.com/QkOfMo4.mp4',
          token: __ENV__.FLOWPLAYER_KEY
        })
    });
  }

  destroyPlayer() {
    const { instances, players } = this.state;
    const id = instances.pop();

    try {
      flowplayer(`#${id}`).destroy();
      players.pop();
      this.setState({ instances, players });
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    const { instances } = this.state;
    const players = instances.map(id => (
      <li key={id}>
        <div id={id} />
      </li>
    ));
    return (
      <section className="player-tracker">
        <h2>FlowPlayerTracker</h2>
        <ul>
          {players}
        </ul>
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
