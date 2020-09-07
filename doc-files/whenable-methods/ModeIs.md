## *Whenable*.ModeIs(*modeName*)

*depreciated*: prefer [When.modeIs()](../global-methods/modeIs.md)

args:

***modeName***: `String`, name of the mode for the constraint

returns: [*whenable*](../../types/Whenable)

ModeIs() is the method through which you apply a [mode](../../features/modes) constraint.  A shortcut with this constraint will only trigger if the mode specified matches the current mode at the time the event is fired.

```javascript
// creates a shortcut for pressing "a" while the mode is "mode1"
When().ModeIs('mode1').Then('a').IsPressed().Execute(console.log);
```