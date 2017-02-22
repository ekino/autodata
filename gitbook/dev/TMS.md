# TMS - Tag management system

This page is aimed to help you understand how to create a new driver inside the project

## Structure

A tms is an export of 3 elements.

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
The rest of the configuration is still on charge of the final user (tms for example)

## parser

```js
export const parser = (type, data = {}) => {
  // tms parsing logic
};
```

The parser must return an object representing the final tag that will be sent

## sender

```js
export const sender = (parsedTag) => {
  // tms sending logic
};
```

Sender have the parsed tag as an argument and it's in your charge to send it