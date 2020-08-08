# When()

args:

***identifier*** / ***focusTarget*** / ***commandName*** / ***undefined***: `String` / `HTMLElement`, this argument can mean a few different things depending on what methods are called next on the [*Whenable*](../../types/Whenable.md) that When() returns:

- ***identifier***: a `String` key identifier used to register one or more keyboard events with [IsPressed()](../methods/IsPressed.md), [IsReleased()](../methods/IsReleased.md), [IsHeldFor()](../methods/IsHeldFor.md) or [IsInput()](../methods/IsInput.md)
- ***focusTarget***: either a `String` `id:` / `class:` target string, or an `HTMLElement` [focus](../../features/Focus.md) target
- ***commandName***: a `String` command name used for registering a [command](../../features/Commands.md)
- ***undefined***: When() may not be passed an argument, for example when using [modes](../../features/Modes.md)

returns: [*Whenable*](../../types/Whenable.md)

When() is the starting point for everything you will do in *When*.

## Use In Shortcut Chains

Used as a function (with `()`), it returns a [*Whenable*](../../types/Whenable.md) that can be used to create a keyboard shortcut:

```javascript
// here, the argument is an "identifier" used to register a "pressed" event
When('a').IsPressed().Execute(console.log);

// here, the argument is a "focusTarget" used to apply a "focus" constarint on the shortcut
const el = document.getElementById('some-id');
When(el).IsFocused().Then('a').IsPressed().Execute(console.log);

// here, the argument is a "command" name, used to register a command
When('some_command').IsExecuted().Run(console.log);

// here, the argument is undefined, in order to use a "mode" constraint on the shortcut
When().ModeIs('mode1').Then('a').IsPressed().Execute(console.log);
```

## Methods

When() also has its own methods that can be accessed to do global actions:

- [When.setMode()](../../methods/setMode.md)
- [When.clearMode()](../../methods/clearMode.md)
- [When.newGroup()](../../methods/newGroup.md)
- [When.quiet()](../../methods/quiet.md)
- [When.loadLayout()](../../methods/loadLayout.md)
- [When.focusChanges()](../../methods/focusChanges.md)
- [When.documentation()](../../methods/documentation.md)