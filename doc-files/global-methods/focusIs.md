## When.focusIs(*focusTarget*, *shortcuts*)

args: 

***focusTarget***: `String` or `HTMLElement`, the focus constraint to apply on the shortcuts

***shortcuts***: `Array`, the shortcuts to apply the focus constraint on

returns: `Array` of shortcuts that were passed in

When.focusIs() is used to register one or more shortcuts with a focus contraint.

```javascript
const el = document.getElementById('some-id');
When.focusIs(el, [
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);

When.focusIs('#some-id', [
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);

When.focusIs('.some-class', [
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);
```