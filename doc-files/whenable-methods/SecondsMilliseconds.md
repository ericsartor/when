## *Whenable*.Milliseconds() / *Whenable*.Seconds()

args: *none*

returns: [*Whenable*](../../types/Whenable)

Milliseconds() and Seconds() are used to either apply a time constraint (in conjunction with [Within()](./Within.md)) or add a [held](../../events/#held) event (in conjunction with [IsHeldFor()](./IsHeldFor)) to a shortcut chain, using the `Number` passed to Within()/IsHeldFor() as the quantity of time.

```javascript
// creates a shortcut for the "a" key being held for 500 milliseconds
When('a').IsHeldFor(500).Milliseconds().Execute(console.log);

// creates a shortcut for the "b" key being held for 1000 milliseconds
When('b').IsHeldFor(1).Seconds().Execute(console.log);
```