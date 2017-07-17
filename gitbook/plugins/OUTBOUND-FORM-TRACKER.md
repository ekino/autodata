# Outbound form plugin

This plugin is aimed to send a tag whenever a form is posted
to a outbound link.

## Initialization and usage

Outbound form plugin needs to be declared to be taken into account by autoData.

```js
autoData.init({
  plugins: {
    outboundFormTracker: {
      // your configuration here
    }
  }
});
```

### shouldTrackOutboundForm (optional)

This function let you manage manually if you wish to treat the current form as an outbound link.

## Default configuration

```js
{
  shouldTrackOutboundForm: this.shouldTrackOutboundForm
}
```
