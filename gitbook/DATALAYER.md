# Data layer page

autoData has been designed to work with a data layer if needed, which can enhance each tag with shared values, provided in the web page.

## Introduction

If some tags on the page needs to be populated with shared datas (like a product id), data layer usage prevents writing these datas in many places.

Basically, data layer is a JSON object. autoData merge the parsed tag with data layer datas or part of it, based on configuration.

## Initialization and usage

```js
  my_data_layer = {
    key1: "value1",
    key2: "value2"
  };
  autoData.init({
    tms: {
      //data layer configuration
      enhancer: (tag) => ({
        ...tag,
        // Add all key/value pairs from data layer
        ...my_data_layer,
      })
    }
  });
```

Result for an basic event

```js
{
    "event":   "click",
    "obj":     "My interacted object",
    "key1":    "value1",
    "key2":    "value2"
}
```

**Note** : data layer needs to be instanced and populated before autoData initialization or API usage. Updated values in the data layer are taken into account at each send.

## Custom selection

By default, all elements from data layer object are merged to sent tag.

If needed, it is possible to declare a list of elements to extract from data layer before merging it with tag.

Here is an example of key selection on datalayer.
```js
  my_data_layer = {
    key1: "value1",
    key2: "value2",
    key3: "value3"
  };
  autoData.init({
    tms: {
      //data layer configuration
      enhancer: (tag) => {
        switch (tag.event) {
          case 'click':
          case 'pageview':
            return {
              ...tag,
              // Add key1 and key3 from data layer for 'click' or 'pageview' events
              key1: my_data_layer.key1,
              key3: my_data_layer.key3
            }
          }
          default:
            return tag;
        }
      }
    }
  });
```

Switch usage is just for example, it shows a way to enhance tag on 'click' or 'pageview' name of event. In other cases, the tag is not enhanced.

```js
{
    "event":   "click",
    "obj":     "My interacted object",
    "key1":    "value1",
    "key3":    "value3"
}
```
