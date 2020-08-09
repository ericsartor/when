## When.clearMode()

args: none

returns: `undefined`

When.clearMode() is used to clear the current [mode](../../features/modes), so that any shortcuts with a mode constraint become inactive.

It is the counterpart to [When.setMode()](./setMode.md).

```javascript
// this shortcut will be active until the mode is changed or cleared
When.setMode('mode1');
When().ModeIs('mode1').Then('a').IsPressed().Execute(console.log);

// this would make the shortcut inactive
When.clearMode();
```