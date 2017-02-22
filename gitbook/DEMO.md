# Demo page

The demo page is designed to provide a full implementation of autoData in
order to test each feature and debug for development.

## Access

The page is served by webpack when the project is started by using the command

```
$ yarn start
...
> Project is running at http://localhost:8080/
```

## Assets and vendors

Assets and vendors files are only intented for demo page and should never be
imported or required by the autoData core library !

**Jwplayer**

The jwplayer library is not installed by npm, it is voluntary because its
version needs to be exactly 7.10.4+

**Retrowave.mp4**

TODO : remove it for open-sourcing
There is no rights on this video, so if the project is open-sourced one day
we will need to find an open-sourced video !