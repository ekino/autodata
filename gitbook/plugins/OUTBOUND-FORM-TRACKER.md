# Outbound form plugin

This plugin is aimed to send a tag whenever a form is posted
to a outbound link.

## Initialization and usage

```js
autoData.init({
  plugins: {
    outboundFormTracker: {
      // your configuration here
    }
  }
});
```

## Default configuration

```js
{
  shouldTrackOutboundForm: this.shouldTrackOutboundForm
}
```

### shouldTrackOutboundForm (optional)

This function let you manage manually if you wish to treat the current form
as an outbound link.