## When.clearMode()

args: none

returns: `undefined`

When.clearMode() is used to clear the current [mode](../../features/modes), so that any shortcuts with a mode constraint become inactive.

It is the counterpart to [When.setMode()](./setMode.md).

```javascript
When.setMode('mode1');

// this shortcut will be active until the mode is changed or cleared
When.modeIs('mode1', [
  When('a').Execute(console.log),
]);

// this would make the shortcut inactive
When.clearMode();
```