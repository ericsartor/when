## When.modeIs(*modeName*, *shortcuts*)

args: 

***modeName***: `String`, the name of the mode to register shortcuts for

***shortcuts***: `Array`, the shortcuts to apply the mode constraint on

returns: `undefined`

When.modeIs() is used to register one or more shortcuts with a mode contraint.

```javascript
When.modeIs('mode1', [
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);
```