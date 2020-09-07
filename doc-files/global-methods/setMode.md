## When.setMode(*modeName*)

args:

***modeName***: `String`, name of the mode to switch to

returns: `undefined`

When.setMode() is used to change the [mode](../../features/modes), so that any shortcuts registered with that mode constraint will become active.

It is the counterpart to [When.clearMode()](./clearMode.md).

```javascript
// this shortcut is inactive by default
When.modeIs('mode1', [
  When('a').Execute(console.log),
]);

// the shortcut is now active
When.setMode('mode1');
```