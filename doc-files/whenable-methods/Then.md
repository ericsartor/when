## *Whenable*.Then(*identifier*)

args:

***identifier***: `String`, a key identifier (or sequence of key identifiers, see [IsInput()](./IsInput.md))

returns: [*Whenable*](../../types/Whenable)

Then() is a stripped down version of [When()](./When.md) that only accepts the *identifier* argument.

It's used to register a subsequent event in a *Whenable* chain for multi-key shortcuts where events other than [pressed](../features/events.md#pressed) are required.

```javascript
// creates a shortcut for pressing "a" then "b" consecutively with no time constraint
When('a').IsPressed()
  .Then('b').IsHeldFor(1).Seconds()
  .Then('a').IsReleased()
  .Execute(console.log);
```