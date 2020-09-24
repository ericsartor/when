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
When('a');
When('ctrl+a');
When('ctrl+alt+a');
```

In your shortcut chain, you can include things like:

- event registers
    - [IsPressed()](../whenable-methods/IsPressed.md)
    - [IsInput()](../whenable-methods/IsInput.md)
    - [IsReleased()](../whenable-methods/IsReleased.md)
    - [IsHeldFor()](../whenable-methods/IsHeldFor.md)
- multipliers
	  - [Times()](../whenable-methods/Times.md)
- time constraints
    - [Within()](../whenable-methods/Within.md)
    - [Seconds()](../whenable-methods/SecondsMilliseconds.md)
    - [Milliseconds()](../whenable-methods/SecondsMilliseconds.md)
- focus constraints
    - [IsFocused()](../whenable-methods/IsFocused.md) (depreicated, see [When.focusIs()](../global-methods/focusIs.md))
- mode constraints
    - [ModeIs()](../whenable-methods/ModeIs.md) (depreicated, see [When.modeIs()](../global-methods/modeIs.md))

all of which are explained in detail on their own pages.

Once you call [Execute()](../../whenable-methods/Execute), you will receive a [*ShortcutController*](../../types/ShortcutController), which looks like this:

```javascript
const shortcut = When('a').IsPressed()
  .Then('b').IsReleased()
  .Execute(console.log);

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

## Implicit "pressed" Events

Most of the time, you will be registering simple [pressed](../features/events.md#pressed) events as opposed to [released](../features/events.md#released) or [held](../features/events.md#held) events.  Because of this, *When* gives you a more concise way to specify these shortcuts without having to call [IsPressed()](../whenable-methods/IsPressed.md) or [IsInput()](../whenable-methods/IsInput.md):

```javascript
// registers a pressed handler for the "a" key
When('a').Execute(console.log);

// registers a shortcut that responds to for when the keys "a" then "b" then "c" are pressed in sequence within 1 second
When('a').Then('b').Then('c').Within('1s').Execute(console.log);

// does the same as above with a more compact syntax
When('a b c (1s)').Execute(console.log);

// for when you need non-pressed events as well

// when "a" is pressed then "b" is held for 1 second
When('a').Then('b').IsHeldFor('1s').Execute(console.log);
```

In these cases, because a either [Execute()](../whenable-methods/Execute.md) was called or a new identifier was registered with [Then()](../whenable-methods/Then.md) before the previous one registered an event (with [IsPressed()](../whenable-methods/IsPressed.md), [IsReleased()](../whenable-methods/IsReleased.md), [IsHeldFor()](../whenable-methods/IsHeldFor.md) or [IsInput()](../whenable-methods/IsInput.md)), [IsInput()](../whenable-methods/IsInput.md) is called implicitly for you.