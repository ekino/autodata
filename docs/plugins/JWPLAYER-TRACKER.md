# JWPlayer plugin

This plugin is aimed to tag automatically JWPlayer instances.

As soon as a configured event will be fired by JWPlayer, it will be sent to current TMS.

autoData use JWPlayer API to listen player events. 7.10.4+ version of JWPlayer is required to work with autoData.

## Initialization and usage

JWPlayer plugin needs to be declared to be taken into account by autoData.

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

JWPlayer javascript API

### events (optional)

All the events that you want to track (default will be  overridden by new ones)

### autoDetect (optional)

This is an experimental feature. This will set "autoData" plugin to JWPlayer's default configuration
in order to catch automatically every instance that is created.
If you don't want to use this option, you just need to specify the "autoData" plugin in the JWPlayer
setup settings.

```js
jwplayer('myDiv').setup({
  // JWPlayer config
  plugins: {
    autoData: {}, // optional, see "autoDetect" option
  }
});
}
```

### cuepoints (optional)

Launch an event when threshold or percent of video is reached.

```
{
  cuepoints: {
    thresholds: [10, 30, 60, 120],
    percentages: [25, 50, 75],
  }
}
```

In the example above, an event is sent at each percent set in `percentages` and at each second set in `thresholds`.

### enhancer (optional)

Idea is to merge and to transform tag to custom enhanced tag. You can add or overwrite easily any informations of the initial tag. 

```
{
  enhancer: function enhancer(tag) {
    switch (tag.act) {
      case 'play':
        return {
          ...tag,
          foo: 'bar'
        };
      default:
        return tag;
    }
  },
}
```

In the example above (with spread syntax), we add `foo: 'bar'` in the tag when a `play` event is triggered.
