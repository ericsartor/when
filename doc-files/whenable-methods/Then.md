## *Whenable*.Then(*identifier*)

args:

***identifier***: `String`, a key identifier (or sequence of key identifiers, see [IsInput()](./IsInput.md))

returns: [*Whenable*](../../types/Whenable)

Then() is a stripped down version of [When()](./When.md) that only accepts the *identifier* argument.

It's used to register a subsequent event in a *Whenable* chain for multi-key shortcuts, and for specifying the initial identifier after a call to [*Whenable*.ModeIs()](./ModeIs.md) or [*Whenable*.IsFocused()](./IsFocused.md).

```javascript
// creates a shortcut for pressing "a" then "b" consecutively with no time constraint
When('a').IsPressed().Then('b').IsPressed().Execute(console.log);

// create a shortcut with a focus constaint for pressing "a"
When('id:some-id').IsFocused().Then('a').IsPressed().Execute(console.log);

// create a shortcut with a mode constaint for pressing "a"
When().ModeIs('mode1').Then('a').IsPressed().Execute(console.log);
```