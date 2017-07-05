# Outbound link plugin

This plugin is aimed to send a tag whenever an outbound link is visited.

## Initialization and usage

```js
autoData.init({
  plugins: {
    outboundLinkTracker: {
      // your configuration here
    }
  }
});
```

## Default configuration

```js
{
  shouldTrackOutboundLink: this.shouldTrackOutboundLink
}
```

### shouldTrackOutboundLink (optional)

This function let you manage manually if you wish to treat the current link
as an outbound domain.