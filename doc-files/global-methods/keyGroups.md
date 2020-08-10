## When.keyGroups()

args: *none*

returns: *KeyGroupsObject*

When.keyGroups() returns an object of named arrays, grouping certain kinds of key identifiers together.  The actual groups are determined by the currently loaded layout.  Check the documentation page for each layout to see what groups are available.

For example, in QWERTY, the following key groups are available:

```javascript
{
  arrowKeys: [
    'arrow_up', 'arrow_right', 'arrow_down', 'arrow_left',
  ],

  fKeys: [
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10',
    'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19',
  ],

  letters: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ],

  numbers: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  ],
}
```

The purpose of these is to make it easier to create shortcuts by iterating over a list of identifiers.

```javascript
When.keyGroups().letters.forEach((identifier) => {
  When(identifier).IsPressed().Execute(console.log);
});
```