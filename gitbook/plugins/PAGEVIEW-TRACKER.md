# Pageview plugin

This plugin is aimed to tag automatically the pageview data.
It will collect all the information on the html tag you will configure
inside your page.

## Initialization ans usage

```js
autoData.init({
  plugins: {
    pageviewTracker: {
      // your configuration here
    }
  }
});
```

```html
<ANY data-pageview-page="/home" data-pageview-title="Homepage" />
```

**NOTE**
By default, the "page" and "title" information will be collected from the browser
information so the creation of the HTML tag is not mandatory !

```js
{
  page: location.pathname + location.search,
  title: history.state.title || document.title
}
```

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

### attributePrefix

Attribute prefix used for DOM selection

### trigger

Attribute used for DOM selection by the plugin

### attributes

Set of attributes that should be collected on the trigger element in order
to build the tag

### withQueryString

Specify if you want to include the query string in the page property of the
default pageview

### hotReload (WIP)

This feature will listen for url changes by history pushState in order
to send the pageview tag again.
You will need to update the DOM in order to collect the new page information !