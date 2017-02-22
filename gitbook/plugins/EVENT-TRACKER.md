# Event plugin

This plugin is aimed to tag automatically event data.
As soon as the user with click on the page, the eventTracker will see if the element
matches the attributes rules and then send the tag automatically.

## Initialization ans usage

```js
autoData.init({
  plugins: {
    eventTracker: {
      // your configuration here
    }
  }
});
```

```html
<ANY data-event-obj="blog" data-event-act="Open article" />
```

## Default configuration

```js
{
  attributePrefix: 'data-event-',
  trigger: 'obj',
  attributes: ['act', 'desc', 'val']
}
```

### attributePrefix (optional)

Attribute prefix used for DOM selection

### trigger (optional)

Attribute used for DOM selection by the plugin

### attributes (optional)

Set of attributes that should be collected on the trigger element in order
to build the tag