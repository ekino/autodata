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

If you are using the embeded version of the flowplayer video player, autodata will automatically track every new instance on the page.

However, if you are using the JavaScript-based initialization of flowplayer, you'll need to register each new player to autodata with `autodataRegisterFlowplayer`:

```js
const player = flowplayer('#player_container', {
  src: 'my_video.mp4',
  token: '<my_token>'
})

autodataRegisterFlowplayer(player);
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
