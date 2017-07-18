# Initial tag

autoData allow tags send at document initialization.

## Introduction

In some cases, it is needed to send a stack of tags at document initialization. autoData provide a simple way to do this.

## Initialization and usage

```html
<script data-initial-tags type="autoData/initialTags">
[
  {
    "event": "click",
    "obj": "object",
    "act": "action",
    "desc": "label",
    "val": 0
  }, {
    "event": "pageview",
    "page": "/my_path",
    "title": "my title"
  }, {
    "event": "custom_event",
    "elt1": "custom elt 1",
    "elt2": "custom elt 2"
  }
]
</script>
```

**NOTE** : pageview tag is still sent at document initialization if pageview plugin is activated (see [pageviewTracker](./plugins/PAGEVIEW-TRACKER.md)), despite an event labelled "pageview" is set in initial tags.

(WIP) Define a specific Javascript Objet to have another way to launch initial tags (instead script tag).
