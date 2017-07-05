# Media query plugin

This plugin is aimed to tag the viewport changes on your website.

## Initialization and usage

```js
autoData.init({
  plugins: {
    mediaQueryTracker: {
      // your configuration here
    }
  }
});
```

## Default configuration

```js
{
  mediaQueryDefinitions: false,
  mediaQueryChangeTemplate: this.changeTemplate,
  mediaQueryChangeTimeout: 1000
}
```

### mediaQueryDefinitions (mandatory)

Set of media-queries that should be spied by the browser in order to
tag it when a change occurs.

The configuration must match the following example :

```js
{
  mediaQueryDefinitions: [
    {
      name: 'Breakpoint',
      dimensionIndex: 1,
      items: [
        {name: 'sm', media: 'all'},
        {name: 'md', media: '(min-width: 30em)'},
        {name: 'lg', media: '(min-width: 48em)'}
      ]
    }
  ]
}
```

In this case, a tag with the name of "Breakpoing" will be dispatched whenever
one of the given mediaQueries in **items** is active

### mediaQueryChangeTemplate (optional)

Let you define the template for value of the changes, by default it is as follow

```js
oldValue + ' => ' + newValue
```

### mediaQueryChangeTimeout (optional)

**NOTE** This value is in milliseconds

The tag will be debounced to this value in order to prevent performance issues
It is recommended to set a value around 1 second.
