# Data layer page

autoData has been designed to work with a data layer if needed, which can enhance each tag with shared values, provided in the web page.

## Introduction

If some tags on the page needs to be populated with shared datas (like a product id), data layer usage prevents writing these datas in many places.

Basically, data layer is a JSON object. autoData merge the parsed tag with data layer data or part of it, based on configuration.

## Initialization and usage

```js
  my_data_layer = {
    key1: "value1",
    key2: "value2"
  };
  autoData.init({
    tms: {
      //data layer configuration
      //TODO
    }
  });
```

**Note** : data layer needs to be populated before autoData initialization or API usage.

## Custom selection

By default, all elements from data layer object are merged to sent tag.

If needed, it is possible to declare a list of elements to extract from data layer before merging it with tag.

```js
  my_data_layer = {
    key1: "value1",
    key2: "value2",
    key3: "value3"
  };
  autoData.init({
    tms: {
      //data layer configuration
      //TODO - select only key1 and key3 in configuration
    }
  });
```
