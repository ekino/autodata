/* eslint-disable require-jsdoc */
import React from "react";

// Demo plugin's components
import EventTracker from "./EventTracker";
import UrlChangeTracker from "./UrlChangeTracker";
import OutboundLinkTracker from "./OutboundLinkTracker";
import OutboundFormTracker from "./OutboundFormTracker";
import JwplayerTracker from "./JwplayerTracker";
import FlowplayerTracker from "./FlowPlayerTracker";
import PageviewTracker from "./PageviewTracker";
import InitialTags from "./InitialTags";
import Logger from "./Logger";

const Demo = ({ logs, clearLogs }) => (
  <div className="container">
    <header className="header">
      <h1>AutoData demo page</h1>
    </header>
    <Logger logs={logs} clearLogs={clearLogs} />
    <main className="main">
      <EventTracker />
      <UrlChangeTracker />
      <OutboundLinkTracker />
      <OutboundFormTracker />
      <FlowplayerTracker />
      <JwplayerTracker />
      <PageviewTracker />
      <InitialTags />
    </main>
  </div>
);

export default Demo;
