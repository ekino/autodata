# Debug

autoData can be debugged easily to check data parsing to data sending.

This can be done by setting the following flag in the initial configuration :

```js
autoData.init({
    debug: true, // false by default
    // ... rest of the configuration
});
```

After that, every log, warning or error will be visible in the browser's console.
This value is setted to "false" by default.

## Debug context

Actually, not minified version of autoData allow developer to see final tag before sending it to TMS on browser console.

In this context, nothing is sent to TMS.

## Know my configuration

Initial configuration object
Version of autoData
