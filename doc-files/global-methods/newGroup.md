## When.newGroup(*shortcuts*)

args:

***shortcuts***: `Array`, an array of [ShortcutControllers](../../types/ShortcutController)

returns: [ShortcutGroup](../../types/ShortcutGroup)

When.newGroup() is used to create a [ShortcutGroup](../../types/ShortcutGroup) from an array of [ShortcutControllers](../../types/ShortcutController).  This allows you to control a set of shortcuts as one unit, as covered in the section on [Groups](../../features/groups).

```javascript
// groups can be created in two ways, as long as you're passing ShortcutControllers

// create the controllers directly in the group assignment
const group1 = When.newGroup([
  When('a').IsPressed().Execute(console.log),
  When('b').IsPressed().Execute(console.log),
  When('c').IsPressed().Execute(console.log),
]);

// store the individual controllers then create a group from them
const shortcut1 = When('a').IsPressed().Execute(console.log);
const shortcut2 = When('b').IsPressed().Execute(console.log);
const shortcut3 = When('c').IsPressed().Execute(console.log);
const group2 = When.newGroup([
  shortcut1,
  shortcut2,
  shortcut3,
]);
```