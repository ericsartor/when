# Type: ShortcutController

ShortcutControllers are what [*Whenable*.Execute()](../../whenable-methods/Execute) returns, and are used to control shortcuts (who'd've guessed?) after they've been created.  They also contain read-only properties related to the actual shortcut.

They are used as such:

```javascript
const controller = When('a').Execute(console.log);

controller.toggle();
controller.pause();
controller.unpause();
controller.trigger();
controller.remove();
```

These controllers contain two different kinds of methods: [controller methods](#controller-methods) and [qualifier methods](#qualifier-methods).

## Controller Methods

Controller Methods are meant to used after the shortcut as been created and the controller stored in a variable.  They include:

- [toggle()](#toggle)
- [pause()](#pause)
- [unpause()](#unpause)
- [trigger()](#trigger)
- [remove()](#remove)

### toggle

*ShortcutController*.toggle() is used to toggle the active state for a given shortcut.  A shortcut that is active will be triggered any time all of its constraints are met (keys being pressed/released/held, certain elements being in focus, mode constraints, etc).  An inactive shortcut cannot be triggered other than by [*ShortcutController*.trigger()](#trigger).

### pause

*ShortcutController*.pause() explicitly sets a shortcut's active state to `false`.

### unpause

*ShortcutController*.unpause() explicitly sets a shortcut's active state to `true`.

### trigger

*ShortcutController*.trigger() programmatically executes a shortcut's handler/command.  This can be used even if the shortcut's active state is `false`.  However, the `context` object that is provided to handler will **not** receive an `event` property, as it normally would when triggered by a real keyboard event.

### remove

*ShortcutController*.remove() permanently unregisters a shortcut so that it cannot be triggered again.  This generally should be used when you are tying shortcuts to specific DOM elements, so that when the element gets removed from the DOM, the keyboard shortcut is as well.

## Qualifier Methods

Qualifier methods are meant to be used as part of a shortcut chain, after the call to [*Whenable*.Execute()](../../whenable-methods/Execute).

This is partially for semantic reasons, but also because they modify the entire shortcut, rather than just a portion of it.

They include:

- [AllowDefault()](#allowdefault)
- [InInput()](#ininput)
- [Once()](#once)

### AllowDefault

*ShortcutController*.AllowDefault() overrides *When's* behavior of calling [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault).  Most of the time you won't want to use this, but if you have a specific reason for wanting to allow default browser behavior for a conflicting shortcut, this is how you'd do it.

```javascript
// this shortcut would trigger both its handler and the default browser behavior of
// opening a "save" prompt for the page
When('ctrl+s').Execute(console.log).AllowDefault();

// this shortcut would follow When's default behavior of calling KeyboardEvent.preventDefault(),
// this preventing the save prompt from opening
When('ctrl+s').Execute(console.log);
```

### InInput

*ShortcutController*.InInput() overrides *When's* default behavior which prevents the user from triggering shortcuts while in an input element, such as a `input`, `textarea` or `select`.

```javascript
// this shortcut would trigger even if the user was trying to type the letter "a" in a textarea
When('a').Execute(console.log).InInput();

// this shortcut will only trigger if the user is not trying to type/use a select dropdown
When('a').Execute(console.log);
```

### Once

*ShortcutController*.Once() limits the shortcut to only being triggered one time, then it is permanently removed.  This is similar to the native `{ once: true }` option that can be provided to native event handlers, but is implemented in a different way.

```javascript
// this shortcut is removed after the first time it is triggered
When('a').Execute(console.log).Once();

// this shortcut triggers any time its constraints are met and it is active
When('a').Execute(console.log);
```