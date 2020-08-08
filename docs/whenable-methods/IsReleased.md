## *Whenable*.IsReleased()

args:

*none*

`IsReleased()` is used to register a [released](../features/events.md#released) event for the most recent identifier in a *When* chain.

```javascript
// registers a "released" event for the "a" key
When('a').IsReleased().Execute(console.log);
```