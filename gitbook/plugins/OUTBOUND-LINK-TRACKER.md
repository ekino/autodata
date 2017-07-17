# Outbound link plugin

This plugin is aimed to send a tag whenever an outbound link is visited.

## Initialization and usage

Outbound link plugin needs to be declared to be taken into account by autoData.

```js
autoData.init({
  plugins: {
    outboundLinkTracker: {
      // your configuration here
    }
  }
});
```

### shouldTrackOutboundLink (optional)

This function let you manage manually if you wish to treat the current link as an outbound domain.

## Default configuration

```js
{
  shouldTrackOutboundLink: this.shouldTrackOutboundLink
}
```
