# When()

args:

***identifier*** / ***focusTarget*** / ***commandName*** / ***undefined***: `String` / `HTMLElement`, this argument can mean a few different things depending on what methods are called next on the [*Whenable*](../../types/Whenable) that When() returns:

- ***identifier***: a `String` key identifier used to register one or more keyboard events with [IsPressed()](./IsPressed), [IsReleased()](./IsReleased), [IsHeldFor()](./IsHeldFor) or [IsInput()](./IsInput)
- ***focusTarget***: either a `String` `id:` / `class:` target string, or an `HTMLElement` [focus](../../features/Focus) target
- ***commandName***: a `String` command name used for registering a [command](../../features/Commands)
- ***undefined***: When() may not be passed an argument, for example when using [modes](../../features/Modes)

returns: [*Whenable*](../../types/Whenable)

When() is the starting point for everything you will do in *When*.

## Use In Shortcut Chains

Used as a function (with `()`), it returns a [*Whenable*](../../types/Whenable) that can be used to create a keyboard shortcut:

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

- [When.setMode()](../../global-methods/setMode)
- [When.clearMode()](../../global-methods/clearMod)
- [When.newGroup()](../../global-methods/newGrou)
- [When.quiet()](../../global-methods/quie)
- [When.loadLayout()](../../global-methods/loadLayou)
- [When.focusChanges()](../../global-methods/focusChange)
- [When.documentation()](../../global-methods/documentation)