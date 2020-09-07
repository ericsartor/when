# Groups

**Groups** enable you to control groups of shortcuts as one.

When you create a shortcut with [When()](../../whenable-methods/When), you get back a [ShortcutController](../../types/ShortcutController) for that shortcut that allows you to do things like `toggle()`, `trigger()` or `delete()` that shortcut.

With **groups**, you can create [ShortcutController](../../types/ShortcutController) that control multiple shortcuts at once:

```javascript
const group = When.newGroup([
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);

// turns all the shortcuts in the group off
group.pause();
```

These group controllers have all the same features as [ShortcutController](../../types/ShortcutController), and are simply an easier way of executing these controller methods on multiple shortcuts at a time.

You can still access each shortcut's controllers if you save a reference to them before creating the group, but this is rarely a wise thing to do:

```javascript
const shortcutA = When('a').Execute(console.log); // active by default
const shortcutB = When('b').Execute(console.log); // active by default
const shortcutC = When('c').Execute(console.log); // active by default

shortcutB.toggle(); // shortcutB is now inactive

const group = When.newGroup([
  shortcutA,
  shortcutB,
  shortcutC,
]);

group.toggle();

// shortcutA and shortcutC are now inactive,
// but shortcutB is active because it was already toggled separately
```

In this case, the shortcuts will become out of sync with each other, and it could lead to unexpected results.  Take care when using this approach.