# Pageview plugin

This plugin is aimed to tag automatically the pageview data.

If set, it will collect all the informations on the html tag added to the page.

## Initialization and usage

pageview plugin needs to be declared to be taken into account by autoData.

```js
autoData.init({
  plugins: {
    pageviewTracker: {
      // your configuration here
      attributePrefix: '', //data atrribute prefix as string
      trigger: '', //data attribute name as string without prefix
      attributes: [], //object
      withQueryString: 0, //boolean
      hotReload: 0 //boolean
      // if not set, default configuration is applied
    }
  }
});
```

All elements are optional, so pageview plugin can be declared empty.

```js
autoData.init({
  plugins: {
    eventTracker: {}
  }
});
```

### attributePrefix (optional)

Attribute prefix used for DOM selection

### trigger (optional)

Attribute used for DOM selection by the plugin

### attributes (optional)

Set of attributes that should be collected on the trigger element in order
to build the tag

### withQueryString (optional)

Specify if you want to include the query string in the page property of the
default pageview

### hotReload (WIP)

This feature will listen for url changes by history pushState in order
to send the pageview tag again.
You will need to update the DOM in order to collect the new page information !

## Default configuration

```js
{
  attributePrefix: 'data-pageview-',
  trigger: 'page',
  attributes: ['title'],
  withQueryString: true,
  hotReload: false
}
```

Targeted DOM element have to carry data attributes, at least trigger attribute

```html
<ANY data-pageview-page="/home" data-pageview-title="Homepage" />
```

**NOTE**
By default, the "page" and "title" information will be collected from the browser information so the creation of the HTML tag is not mandatory !

```js
{
  page: location.pathname + location.search,
  title: history.state.title || document.title
}
```

### Camelized attributes
Every attribute that is picked-up will be camelized by default, please look at the following example :

```html
<ANY  data-event-obj="interacted object"
      data-event-custom-action-attribute="action"
      data-event-val="value"/>
```

**Result**
```js
{
  obj: 'interacted object',
  customActionAttribute: 'action',
  val: 'value'
}
```