# Implementation

autoData implementation needs to be added to project respecting some rules.

## Implementation rules

autoData implementation is based on library loading and its initialization (see [Initialization](API.md#init) and plugins configuration)

autoData needs to be instanced as soon as possible, whether it is on HEAD tag or BODY tag, and after TMS to prevent possible analytics data loss. In this context, Google Tag Manager usage has no asynchronous problems, dataLayer object (from GTM) can be populated by autoData before GTM loading and will be taken account after.

## Script inclusion

Basic but effective implementation of autoData is :
- HTML script synchronous inclusion in HEAD or BODY tag (CDN or locally)
- autoData initialization after script loading

## TMS

autoData can be easily loaded using a TMS.

Script inclusion then initialization script can be written inside a custom Javascript tag, fired on all pages.

Otherwise, script inclusion can be done on application side, and initialization on TMS side. This approach is recommended for analytics performance : autoData is loaded before TMS and initialized after TMS loading, which prevents asynchronous problems and data loss.

## NPM (WIP)
