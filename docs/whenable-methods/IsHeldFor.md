## *Whenable*.IsHeldFor(*n*)

args:

***n***: `Number`, meant to represent either a seconds or milliseconds value

IsHeldFor() is used in conjunction with [Seconds()](./Seconds) and [Milliseconds()](./Milliseconds) to register a [held](../features/events.md#held) event for the most recent identifier in a *When* chain.

```javascript
// registers a "held" event for the "a" key that triggers after "a" is held for 1 second
When('a').IsHeldFor(1).Seconds().Execute(console.log);
```