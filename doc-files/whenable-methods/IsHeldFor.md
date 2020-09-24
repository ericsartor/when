## *Whenable*.IsHeldFor(*n*)

args:

***n***: `Number` or `String`, when a number it is meant to represent either a seconds or milliseconds value.  When a string, it must be a template like `1s` or `1000ms`, similar to in [isInput()](./isInput).

returns: [Whenable](../../types/Whenable)

IsHeldFor() is used in conjunction with [Seconds()](./Seconds) and [Milliseconds()](./Milliseconds) to register a [held](../features/events#held) event for the most recent identifier in a *When* chain.

```javascript
// both of these register the same shortcut

// registers a "held" event for the "a" key that triggers after "a" is held for 1 second
When('a').IsHeldFor(1).Seconds().Execute(console.log);
When('a').IsHeldFor('1s').Execute(console.log);
```