# Autodata

- [Overview](#overview)
- [Browser support and compatibilities](#browser-support-and-compatibilities)
- [Plugins](#plugins)
- [Installation and usage](#installation-and-usage)
- [Advanced configuration](#advanced-configuration)
- [License](#License)

## Overview

autoData is an agnostic Javascript Library which simplify analytics tags implementation and automatize data sending to Tag Management System (TMS).

Its original purpose was to keep automatic tracking logic from the library [autotrack](https://github.com/googleanalytics/autotrack) but open its possibilities to work with any Tag Management System (TMS), not exclusively Google Analytics.

Generally, each developer needs to write their tracking code using specific syntax, provided by the TMS. Also, each tag needs generally a listener and a dedicated Javascript code, particularly on a lot of simple events of user interaction. autoData is here to simplify these tasks by using a simple approach, the use of HTML data attributes and, if needed, a data object (i.e. data layer).

This library is simple to use, but not limited : developer can configure default parameters and override easily how data is parsed, enhanced or sent to TMS (which can become any data collector).

TMS taken into account by autoData :
- Google Tag Manager
- Tealium
- Custom tag collector (see [TMS](/dev/TMS.md))

Global documentation is hosted here : https://github.com/ekino/autodata

In this documentation you will find every information about the library
- Its demo page
- Core library API description and explanation
- Plugins description and explanation
- Development rules if you want to contribute

## Browser support and compatibilities

Like autotrack, autoData will safely run in any browser without errors, as feature detection is always used with any potentially unsupported code. However, autoData will only track features supported in the browser running it. For example, a user running Internet Explorer 8 will not be able to track media query usage, as media queries themselves aren't supported in Internet Explorer 8.

All autotrack plugins are tested in the following browsers :
- Chrome
- Firefox
- Safari 6+
- IE Edge
- IE9+
- Opera

autoData could be integrated on a hybrid mobile app with some tricks but was not designed for.

## Plugins

The autodata.min.js built file is small (25ko) and comes with all plugins included. The following table briefly explains what each plugin does, their usage is detailled [here](https://ekino.github.io/autodata/PLUGINS.html) :

| Plugin name        | Plugin description |
|---------------------|------------------------------------------------------------------------|
| **eventTracker**        | Enables declarative event tracking, via HTML attributes in the markup. |
| **pageviewTracker**    | Enables automatic/overridden pageview tracking.                        |
| **mediaQueryTracker**   | Enables tracking media query matching and media query changes.         |
| **outboundFormTracker** | Automatically tracks form submits to external domains.                 |
| **outboundLinkTracker** | Automatically tracks link clicks to external domains.                  |
| **jwplayerTracker**     | Automatically tracks events from [jwplayer](https://www.jwplayer.com)  |

## Installation and usage

To add autoData to your site, you have to do two things:

- Load the autodata.min.js built script file on your page

```html
<script type='text/javascript' src='/path-to/autodata.min.js'></script>
```

- Initialize autoData with needed plugins

```js
autoData.init({
  plugins: {
    eventTracker: {},
    pageviewTracker: {}
  }
});
```

See documentation for more details : https://ekino.github.io/autodata/

## Advanced configuration

autoData comes with a default configuration for tms and plugins. It can be overriden if needed. Also, autoData can be customized easily to fit with tag implementation needs. See documentation to learn how : https://ekino.github.io/autodata/

## License

autoData is initially a forked version of  [googleanalytics/autotrack](https://github.com/googleanalytics/autotrack).

It inherits the same Apache license, Version 2.0

You may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
