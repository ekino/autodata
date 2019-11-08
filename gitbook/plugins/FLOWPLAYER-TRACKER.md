# Flowplayer plugin

This plugin is aimed to automatically tag Flowplayer instances.

As soon as a configured event will be fired by a flowplayer instnace, it will be sent to the current TMS.

## Initialization and usage

Flowplayer plugin needs to be declared to be taken into account by autoData.

```js
autoData.init({
  plugins: {
    flowplayerTracker: {
      // your configuration here
    }
  }
});
```

## Default configuration

```js
{
  flowplayer: null,
  events: ['play', 'pause', 'time', 'volume', 'fullscreen'],
}
```

### flowplayer (mandatory)

flowplayer javascript API

### events (optional)

All the events that you want to track (default will be overridden by new ones)
