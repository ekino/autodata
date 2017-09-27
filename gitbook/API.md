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
    common: {
        attributePrefix: 'data-',
        tms: {
          name: 'gtm',
          parser: function(type, data) {}, // Optional
          enhancer: function (parsedTag) {}, // Optional
          sender: function(enhancedTag) {}, // Optional
        },
        plugins: {
    
        }
    }
}
```

### common
This is the default configuration that will be used, you can specify an optional configuration if needed,
please see the [Optional config](#optional-config) section to know more

### tms.name
The TMS name that you want to use

### tms.parser
This parsing function will be called whenever a tag is triggered, this is your opportunity to enhance default TMS logic or provide your own one.

This function allows you to add custom data on the already parsed tag. This could have been done by the parsing function but it is done this way in order to seperate the role of each function.

### tms.enhancer
This function allows you to add custom data on the already parsed tag. This could have been done by the parsing function but it is done this way in order to seperate the role of each function.

### tms.sender
This function allows you to change how parsed and enhanced data is sent to TMS or any tag collector system. For example, when using GTM as TMS, it pushes values in Google's dataLayer object.

## autoData.sendPageView

This method needs to be used in an SPA or in a tunnel, where there is no page reload. In this contexte, the goal is to track each views/steps as pageviews (generally called virtual pageviews).

The output sent to TMS is the same than automatic pageviews.

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

## autoData.sendVirtualPageView (deprecated)

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

This method needs to be used for "functionals tags", when data attributes is not enough and/or if the tag is computed dynamically when user interacts with the website. Also, interacted elements handled in Javascript with a preventDefault needs to be tagged with this method.

The output sent to TMS is the same than automatic tags.

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

## Optional config

If for any reason you need to use a specific configuration for autoData in a certain context, you can
with the initialization object.

By default, you will need to provide a **common** config that will be always used as a default one

```js
autoData.init({
  common: {
    tms: {
      name: 'gtm'
    },
    plugins: {
      eventTracker: {
        trigger: 'obj',
        attributes: ['act', 'desc', 'val']
      }
    }
  }
});
```

Now, let's say that you need to have a specific configuration on a page that we will name **contact**
You will need to provide this configuration and specify its use with a HTML attribute "data-autodata-config"

### Configuration
```js
autoData.init({
  common: {
    tms: {
      name: 'gtm'
    },
    plugins: {
      eventTracker: {
        trigger: 'obj',
        attributes: ['act', 'desc', 'val']
      }
    }
  },
  contact: {
    plugins: {
      eventTracker: {
        attributes: ['contact-act', 'contact-desc', 'contact-val']
      }
    }
  }
});
```

### HTML attribute
```html
<head data-autodata-config="contact" />
```

**Note**: The use of the ```<head />``` tag here is done as an example purpose,
you can choose any tag that you want on your page.

The previous example will load the contact configuration and merge it with common when autoData is loaded on a page
where **data-autodata-config** attribute is present and has the value **contact**

**Important note** : As autoData cannot be initialized multiple times, this feature won't work
on a Single Page Application.

