## *Whenable*.Within(*n*)

args:

***n***: `Number`, representing a quantity of seconds or milliseconds

returns: [*Whenable*](../../types/Whenable)

Within() is used to place a time constraint on a sequential shortcut (one involving multiple key events).

Within() should be followed by either [Seconds()](./SecondsMilliseconds) or [Milliseconds()](./SecondsMilliseconds) in order to apply the time constraint.

```javascript
// creates a shortcut for pressing "a" then "b" sequentially within 1 second of each other
When('a').IsPressed().Then('b').IsPressed().Within(1).Seconds().Execute(console.log);
```

**Note**: It is generally easier to use the [IsInput()](./IsInput.md) syntax for specifying a time constraint.