# Debug

autoData can be debugged easily to check data parsing to data sending.

This can be done by setting the following property in the initial configuration :

```js
autoData.init({
    debug: 'debug', // 'warn' by default
    // ... rest of the configuration
});
```

After that, every debug, info, warning or error will be visible in the browser's console.
This value is set to "warn" by default.

Here are the different levels of log that you can configure :

|Value|Description|
|-----|------------|
|debug|all logs from debug to errors|
|info|won't log debug and log from info to errors|
|warn|won't log debug, info and log from warn to errors|
|error|only errors|
|none|disable all logs|

## Debug context

Actually, not minified version of autoData allow developer to see final tag before sending it to TMS on browser console.

In this context, nothing is sent to TMS.

## Know my configuration

Initial configuration object
Version of autoData
