## *Whenable*.IsReleased()

args: *none*

returns: [Whenable](../../types/Whenable)

IsReleased() is used to register a [released](../features/events#released) event for the most recent identifier in a *When* chain.

```javascript
// registers a "released" event for the "a" key
When('a').IsReleased().Execute(console.log);
```