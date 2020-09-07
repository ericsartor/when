# When()

args:

***identifier*** / ***focusTarget*** / ***commandName*** / ***undefined***: `String` / `HTMLElement`, this argument can mean a few different things depending on what methods are called next on the [*Whenable*](../../types/Whenable) that When() returns:

- ***identifier***: a `String` key identifier used to register one or more keyboard events with [IsPressed()](./IsPressed), [IsReleased()](./IsReleased), [IsHeldFor()](./IsHeldFor) or [IsInput()](./IsInput)
- ***focusTarget*** (depreciated): either a `String` `id:` / `class:` target string, or an `HTMLElement` [focus](../../features/Focus) target
- ***commandName*** (depreciated): a `String` command name used for registering a [command](../../features/Commands)
- ***undefined*** (depreciated): When() may not be passed an argument, for example when using [modes](../../features/Modes)

returns: [*Whenable*](../../types/Whenable)

When() is the starting point for everything you will do in *When*.

## Use In Shortcut Chains

Used as a function (with `()`), it returns a [*Whenable*](../../types/Whenable) that can be used to create a keyboard shortcut:

```javascript
// here, the argument is an "identifier" used to register a "pressed" event
When('a').Execute(console.log);
```

## Methods

When() also has its own methods that can be accessed to do global actions:

- [When.command()](../../global-methods/command)
- [When.modeIs()](../../global-methods/modeIs)
- [When.setMode()](../../global-methods/setMode)
- [When.clearMode()](../../global-methods/clearMode)
- [When.newGroup()](../../global-methods/newGroup)
- [When.quiet()](../../global-methods/quiet)
- [When.toggle() / When.parse() / When.unpause()](../../global-methods/togglepauseunpause)
- [When.loadLayout()](../../global-methods/loadLayout)
- [When.keyGroups()](../../global-methods/keyGroups)
- [When.focusIs()](../../global-methods/focusIs)
- [When.setFocus()](../../global-methods/setFocus)
- [When.focusChanges()](../../global-methods/focusChanges)
- [When.setHeldInterval()](../../global-methods/setHeldInterval)
- [When.documentation()](../../global-methods/documentation)