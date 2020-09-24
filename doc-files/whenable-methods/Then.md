## *Whenable*.Then(*identifier*)

args:

- ***identifier***: a `String` key identifier used to register one or more keyboard events with [IsPressed()](./IsPressed), [IsReleased()](./IsReleased), [IsHeldFor()](./IsHeldFor) or [IsInput()](./IsInput)

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