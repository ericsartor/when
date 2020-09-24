## *Whenable*.Within(*n*)

args:

***n***: `Number` or `String`, when a number it is meant to represent either a seconds or milliseconds value.  When a string, it must be a template like `1s` or `1000ms`, similar to in [isInput()](./isInput).

returns: [*Whenable*](../../types/Whenable)

Within() is used to place a time constraint on a sequential shortcut (one involving multiple key events).

Within() should be followed by either [Seconds()](./SecondsMilliseconds) or [Milliseconds()](./SecondsMilliseconds) in order to apply the time constraint.

```javascript
// both produce the same shortcut

// creates a shortcut for pressing "a" then "b" sequentially within 1 second of each other
When('a').IsPressed().Then('b').IsPressed().Within(1).Seconds().Execute(console.log);
When('a').Then('b').Within('1s').Execute(console.log);

// can also be done as
When('a b (1s)').Execute(console.log);
```

**Note**: It is generally easier to use the [IsInput()](./IsInput.md) syntax for specifying a time constraint.