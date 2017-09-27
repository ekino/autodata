# TMS - Tag management system

This page is aimed to help you understand how to create a new TMS driver inside the project.

autoData has been designed to work with a TMS, but cutom driver override allows sending data to any data collector with the same logic (parsing, enhancing, sending).

## Structure

A TMS is an export of 4 elements.

### config

```js
export const config = {
  eventTracker: {
    trigger: 'obj',
    attributes: ['act', 'desc', 'val']
  }
};
```

This config is plugin-dedicated, it will allow you to set a specific configuration for the plugins.
The rest of the configuration is still on charge of the final user (TMS for example).

## parser

```js
export const parser = (type, data = {}) => {
  // TMS parsing logic
};
```

The parser must return an object representing the final tag that will be sent.

## enhancer

```js
export const enhancer = (tag, type) => {
// TMS enhancing logic
// ...tag, ...window.utag_data
};
```

The enhancer must return an object representing the enriched final tag provided by parser.
The type is provided for any conditional needs

## sender

```js
export const sender = (parsedTag, type) => {
  // TMS sending logic
};
```

Sender have the parsed tag and type as arguments and it's in your charge to send it to a TMS or any data collector system.
