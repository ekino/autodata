# Jwplayer plugin

This plugin is aimed to tag automatically jwplayer instances.
As soon as a configured event will be fired by jwplayer, it will be
send to current tms.

## Initialization ans usage

```js
autoData.init({
  plugins: {
    jwplayerTracker: {
      // your configuration here
    }
  }
});
```

```js
jwplayer('myDiv').setup({
  // jwplayer config
  plugins: {
    autoData: {}, // optional, see "autoDetect" option
  }
});
}
```

## Default configuration

```js
{
  jwplayer: null,
  events: ['play', 'pause', 'time', 'volume', 'fullscreen'],
  autoDetect: false,
}
```

### jwplayer (mandatory)

jwplayer javascript API

### events (optional)

All the events that you want to track (default will be overridden by new ones)

### autoDetect (optional)

This is an experimental feature. This will set "autoData" plugin to jwplayer's default configuration
in order to catch automatically every instance that is created.
If you don't want to use this option, you just need to specify the "autoData" plugin in the jwplayer
setup settings.

```js
jwplayer('myDiv').setup({
  // jwplayer config
  plugins: {
    autoData: {}, // optional, see "autoDetect" option
  }
});
}
```