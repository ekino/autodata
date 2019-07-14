/* eslint-disable require-jsdoc */
import React, { Component } from "react";
import Helmet from "react-helmet";
import autoData from "../../autodata";

export default class UrlChangeTracker extends Component {
  static changeHash() {
    const ts = Date.now();
    const newHash = `Timestamp hash ${ts}`;
    document.location.hash = newHash;

    autoData.sendVirtualPageView({
      page: `/timestamp/${ts}`,
      title: newHash
    });
  }

  constructor(props) {
    super(props);

    this.historyPushState = () => this.changeState(window.history.pushState);
    this.historyReplaceState = () =>
      this.changeState(window.history.replaceState, false);
  }

  state = {
    title: "Autodata demo page",
    page: "/autodata-demo-page/",
    language: "en",
    statePushed: false
  };

  changeState(method, goBack = true) {
    const previousState = {
      title: this.state.title,
      page: this.state.page,
      language: this.state.language,
      statePushed: this.state.statePushed
    };

    const newState = {
      title: "New page",
      page: "/new-page/",
      language: "eng",
      statePushed: true
    };

    this.setState(newState);
    method(null, newState.title, newState.page);

    setTimeout(() => {
      this.setState(previousState);

      if (goBack) {
        window.history.back();
      } else {
        method(null, previousState.title, previousState.page);
      }
    }, 1e3);
  }

  render() {
    return (
      <section className="section">
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title
            data-pageview-page={this.state.page}
            data-pageview-title={this.state.title}
            data-pageview-language={this.state.language}
          >
            {this.state.title}
          </title>
        </Helmet>
        <h2 className="title">UrlChangeTracker</h2>
        <div className="block-left">
          <h3>pushState</h3>
          <button
            type="button"
            className="btn"
            onClick={this.historyPushState}
            disabled={this.state.statePushed}
          >
            History pushState
          </button>
          <h3>replaceState</h3>
          <button
            type="button"
            className="btn"
            onClick={this.historyReplaceState}
            disabled={this.state.statePushed}
          >
            History replaceState
          </button>
        </div>
        <div className="block-right">
          <h3>hashChange</h3>
          <button
            type="button"
            className="btn"
            onClick={UrlChangeTracker.changeHash}
          >
            Change hash
          </button>
        </div>
      </section>
    );
  }
}
