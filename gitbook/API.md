# Autodata API

# Init

```js
autoData.init({
    // settings
});
```

## Settings

```js
{
    attributePrefix: 'data-',
    tms: {
      name: 'gtm',
      parser: function(type, data) {}, // Optional
      sender: function(parsedTag) {}, // Optional
      enhancer: function (parsedTag) {}, // Optional
    },
    plugins: {

    }
}
```

### name
The tms name that you want to use

### parser
This parsing function will be called whenever a tag is triggered, this is your opportunity
to enhance default tms logic or provide your own one

### enhancer
This function allows you to add custom data on the already parsed tag. This could have been done
by the parsing function but it is done this way in order to seperate the role of each function.

## autoData.sendPageView

Usage

```js
autoData.sendPageView({
    page: '', // optional
    title: '', // optional
});
```

Result

```json
{
    "event": "pageview",
    "page": "relative_url",
    "title": "meta_title"
}
```

## autoData.sendVirtualPageView

Usage

```js
autoData.sendVirtualPageView({
    page: '', // optional
    title: '', // optional
});
```

Result

```js
{
    "event": "virtualpageview",
    "page": "relative_url",
    "title": "meta_title"
}
```

## autoData.sendEvent

Usage

```js
autoData.sendEvent({
    foo: true,
    bar: false,
    baz: true
});
```

Result

```json
{
    "event":  "click",
    "foo":    true,
    "bar":    false,
    "baz":    true
}
```

Event name can be overridden if put in the object passed in parameter.

```js
autoData.sendEvent({
    event:'custom_event'
    foo: true,
    bar: false,
    baz: true
});
```

Result

```js
{
    "event":  "custom_event",
    "foo":    true,
    "bar":    false,
    "baz":    true
}
```
