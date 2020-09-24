## *Whenable*.Times(*n*)

args:

- ***n***: `Number`, the number of times the previous event in the chain needs to be triggered

returns: [*Whenable*](../../types/Whenable)

Times() lets you specify that a key event must triggered `n` times for the shortcut to be trigger.  It must be called **after** an event has been registered with [IsPressed()](./IsPressed), [IsReleased()](./IsReleased), [IsHeldFor()](./IsHeldFor) or [IsInput()](./IsInput), or immediately after [When()](./When) or [Then()](./Then).

```javascript
// both of these create a shortcut that triggers after the "a" is pressed 5 times within 1 second
When('a').IsPressed().Times(5).Within('1s').Execute(console.log);
When('a (1s)').Times(5).Execute(console.log);
```