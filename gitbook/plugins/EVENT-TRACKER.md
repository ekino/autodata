# Event plugin

This plugin is aimed to handle automatically event type tag.

As soon as the user interact with the page (click, touch), the eventTracker plugin will see if the element
matches the attributes rules and then, send the tag automatically.

## Initialization

eventTracker plugin needs to be initialized to be taken into account by autoData.

```js
autoData.init({
  plugins: {
    eventTracker: {
      // your configuration here
      attributePrefix: '',
      trigger: '',
      attributes: []
      // if not set, default configuration is applied
    }
  }
});
```

### attributePrefix (optional)

Attribute prefix used to parse attributes of interacted DOM element.

### trigger (optional)

Attribute used for DOM selection by the plugin.

### attributes (optional)

Set of attributes that should be collected on the trigger element in order to build the tag.

## Default configuration

```js
{
  attributePrefix: 'data-event-',
  trigger: 'obj',
  attributes: ['act', 'desc', 'val']
}
```

Targeted DOM element have to carry data attributes, at least trigger attribute

```html
<ANY  data-event-obj="interacted object"
      data-event-act="action"
      data-event-desc="description"
      data-event-val="value"/>
```

Trigger attribute is required to send tag.

If DOM element doesn't have some awaited data attributes, they aren't added to the tag.

## Custom configuration example

```js
{
  attributePrefix: 'my-prefix-',
  trigger: 'trigger',
  attributes: ['val1', 'val2', 'val3','val4','val5']
}
```

```html
<!-- One event -->
<ANY  my-prefix-trigger="trigger_val1"
      my-prefix-val1="val1"
      my-prefix-val4="val4"/>
<!-- Another event -->
<ANY  my-prefix-trigger="trigger_val2"
      my-prefix-val2="val1"
      my-prefix-val3="val4"
      my-prefix-val5="val5"/>
```

## Default object sent to the parser

```js
{
  event: 'click',
  obj:   'interacted object',
  act:   'action',
  desc:  'description',
  val:   'value'
}
```
Note : prefix is not used to define each key.

## Tips

### Event name override

By default, an event key with "click" value is added to tag to handle it in tag collector.

It can be overridden by using dedicated data attribute.

```html
<ANY  data-event-event="custom_event"
      data-event-obj="interacted object"
      data-event-act="action"
      data-event-desc="description"
      data-event-val="value"/>
```

### Manual tracking

If an event cannot be tracked automatically using data attributes, it can be handled by using a dedicated function from autodata API.
See [autoData.sendEvent](API.md#autodatasendevent)
