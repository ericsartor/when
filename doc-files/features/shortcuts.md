# Shortcuts

*When* is a keyboard shortcut library, and it goes to many lengths to ensure you have complete control over how you can create and manage your shortcuts.

It's all based on one function, [When()](../../whenable-methods/When), which returns what the library refers to as a [*Whenable*](../../types/Whenable).  What that actually means is that the library is based around chained functions, as you can see here:

```javascript
When('a').IsPressed().Execute(console.log);
```

Most *When* chains will culminate in a call to [Execute()](../../whenable-methods/Execute), which returns what we refer to as a [*ShortcutController*](../../types/ShortcutController).  Once you call [Execute()](../../whenable-methods/Execute), you have registered a keyboard shortcut, the properties and behaviors of which are determined by what chained methods you chose to use.

To create a shortcut, you must always start with a call to  [When()](../../whenable-methods/When):

```javascript
When();
```

To set which keys (and potentially modifiers like *ctrl*, *alt*, *shift* and *meta*) will be involved in your shortcut, you can pass them as strings to either [When()](../../whenable-methods/When) or [Then()](../../whenable-methods/Then):

**NOTE**: To see a list of all available key identifiers, check the Layout page for the layout you're using, such as [QWERTY](../../layouts/qwerty).

```javascript
When('a').IsPressed();
When('ctrl+a').IsPressed();
When('ctrl+alt+a').IsPressed();

```

[Then()](../../whenable-methods/Then) is like a stripped down version of [When()](../../whenable-methods/When) that only accepts key identifiers as strings.

In your shortcut chain, you can include things like:

- event registers
    - [IsPressed()](../../whenable-methods/IsPressed)
    - [IsReleased()](../../whenable-methods/IsReleased)
    - [IsHeldFor()](../../whenable-methods/IsHeldFor)
- time constraints
    - [Within()](../../whenable-methods/Within)
    - [Seconds()](../../whenable-methods/SecondsMilliseconds)
    - [Milliseconds()](../../whenable-methods/SecondsMilliseconds)
- focus constraints
    - [IsFocused()](../../whenable-methods/IsFocused)
- mode constraints
    - [ModeIs()](../../whenable-methods/ModeIs)

all of which are explained in detail on their own pages.

Once you call [Execute()](../../whenable-methods/Execute), you will receive a [*ShortcutController*](../../types/ShortcutController), which looks like this:

```javascript
const shortcut = When('a').IsPressed().Then('b').IsPressed().Execute(console.log);

// shortcut controller:
{

  // these are typically used after the shortcut has been created and the controller has been stored

  remove(),       // unregisters the shortcut permanently
  pause(),        // deactivates the shortcut temporarily
  unpause(),      // activates a paused shortcut
  toggle(),       // toggles between a paused and unpaused state
  trigger(),      // runs the shortcut's handler programatically

  // these are typically used as part of the initial chain to create the shortcut

  Once(),         // only allows the shortcut to be handled once
  InInput(),      // allows the shortcut to be triggered when an input/textarea/select element is active
  AllowDefault(), // allows the default browser behavior to execute for the shortcut (prevents event.preventDefault() from running)

}
```

As you can see above, the controllers include some extra methods that are uppercase, which we call [qualifiers](../../types/ShortcutController#qualifier-methods).  They control when and how the shortcut should behave, overriding some default behavior.

These are meant to be used as part of a shortcut chain, but technically can be used from the controller after initialization as well:

```javascript
// the suggested way to use qualifiers
const shortcutA = When('a').IsPressed().Execute(console.log).Once();

// technically still works, but is not recommended
const shortcutB = When('b').IsPressed().Execute(console.log);
shortcutB.Once();
```

Using shortcut controllers is one of the ways *When* gives you fine grained control over how and when your keyboard shortcuts are triggered.

For even more control, check out [groups](./groups.md), [modes](./modes.md) and [focus](./focus.md).