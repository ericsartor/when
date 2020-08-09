## When.quiet()

args: none

returns: `undefined`

When.quiet() prevents any console warnings from appearing.  It will still allow errors to show up, however.  It should be used before creating any shortcuts for optimal effect.

Warnings are logged when something may produce unexpected results, but will still technically run without error.

```javascript
When.quiet();
```