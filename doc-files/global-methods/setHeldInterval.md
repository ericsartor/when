## When.setHeldInterval(*n*)

args:

***n***: `Number`, a milliseconds value

returns: `undefined`

When.setHeldInterval() is used to change the length for the background interval that checks for [held](../../features/events/#held) events.  The default is `100`, meaning held events are only accurate to within 100 milliseconds. Increasing this will result in more accurate hold durations, but may have a performance impact.

```javascript
When.setHeldInterval(50);
```