# Modes

**Modes** are one of the ways *When* allows you to enable or disable groups of shortcuts.

Shortcuts can be assigned a **mode** and will only be active if that **mode** is active.

Creating a shortcut with a **mode**:

```javascript
When.modeIs('mode1', [
  When('a').Execute(console.log),
]);
```

*When's* **mode** is `null` by default, so you must change it using [When.setMode()](../../global-methods/setMode) in order for the shortcut to be active:

```javascript
When.setMode('mode1');
```

The **mode** can be changed at any time, and even dynamically determined if necessary.

And that's it!  **Modes** are fairly simple, but can be an effect way of controlling your shortcut's scope.