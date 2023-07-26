# Overview

*When* is a chainable library for creating simple or intricate keyboard shortcuts in your web apps.

A basic example might look something like this:

```javascript
When.command('copy', (context) => {
  // your logic here...
});

// a "pressed" event is assumed here
When('ctrl+c').Execute('copy');
```

whereas a more advanced example would look something like this:

```javascript
When('a').IsPressed()
  .Then('1').IsHeldFor(1).Seconds()
  .Then('a').IsReleased()
  .Execute((context) => {
    // your logic here
  }, 'a1_command')
  .Once();
```

You can also specify key sequences like this (as long as you only plan on using [pressed](../features/events/#pressed) events):

```javascript
// when the keys a, s and d are pressed consecutively within 1 second
When('a s d (1s)').Execute((context) => console.log('asd'));
```

See the [Shortcuts](./features/shortcuts.md) page for a more thorough explanation of how shortcuts/chaining works in *When*.

## Feature Summary

*When* supports many features all aimed at making managing your keyboard shortcuts easier, such as:

- [events](#events)
- [event context](#event-context)
- [registered commands](#registered-commands)
- [shortcut controllers](#shortcut-controllers)
- [sequences](#sequences)
- [qualifiers](#qualifiers)
- [modes](#modes)
- [groups](#groups)
- [focus](#focus)
- [self-documentation](#self-documentation)

### Events

Full *event* documentation [here](./features/events.md).

*When* is triggered by `keyup` and `keydown` events bound to the window key, but exposes three event types for consumption through it's API: **pressed**, **released** and **held**.  These can be combined in any way you desire!

```javascript
// triggers as soon as the keydown event fires ("pressed" event assumed)
When('a').Execute(console.log);

// triggers as soon as the keyup event fires
When('a').IsReleased().Execute(console.log);

// triggers 1 second after the keydown event fired if the keyup event has not yet fired
When('a').IsHeldFor(1).Seconds().Execute(console.log);
```

### Event Context

Full *event context* documentation [here](./types/ShortcutHandler.md#event-context).

Event handlers and [registered commands](#registered-commands) receive an **event context** object as their only argument, which contains some useful properties:

```javascript
When('a').Execute((context) => {
  console.log(context);
});

When.command('some_command', (context) => {
  /*
    context.event - the native browser event that caused the shortcut to be fulfilled (depending on what the last event is in the shortcut's sequence)

    context.shortcut - the shortcut controller for the shortcut that was triggered
    
    context.keys - array of string key identifiers involved in the shortcut's timeline

    context.focusedElement - the HTMLElement that When currently considers to be focused based on its built in focus system

    context.ctrl/alt/shift/meta - this is pulled right off of context.event for convenience, so it is only relevant to the last event in the shortcut

    context.pressDuration - on "held" events, the duration in milliseconds the key was held for (if the last event in the shortcut's sequence was a "held" event)

  */
  console.log(context);
});
```

### Registered Commands

**Commands** are *When's* way of allowing you to separate your business logic from your shortcut logic, and aids in the [self-documentation](#self-documentation) process.

```javascript
When('some_command', (context) => {
  // some logic here...
});

When('a').Execute('some_command');
```

### Shortcut Controllers

When you create a shortcut, it returns a **controller** with a few methods attached to it:

```javascript
const shortcut = When('a').Execute(console.log);
shortcut.pause();
shortcut.unpause();
shortcut.toggle();
shortcut.trigger();
shortcut.destroy();
```

These are the primitive ways you can control how and when your shortcut can be triggered programmatically.

### Sequences

Instead of specifying a shortcut as a single key (with optional modifier key), you can specify a sequence of keys in multiple ways.

```javascript
// these create the exact same shortcut, generally the shorter syntax is preferable if you only need "pressed" events"
When('1 2 3 (1s)').Execute(console.log);

When('1').IsPressed()
  .Then('2').IsPressed()
  .Then('3').IsPressed().Within(1).Seconds()
  .Execute(console.log);

// you need to use the longer syntax when using "released" or "held" events
When('1').IsPressed()
  .Then('2').IsPressed()
  .Then('1').IsReleased()
  .Then('3').IsHeldFor(1).Seconds()
  .Execute(console.log);
```

### Qualifiers

Qualifiers give you access to some of the features native DOM events provide in a more readable way.

```javascript
When('ctrl+s')
  .Execute('save')
  .AllowDefault()  // event.preventDefault() is called by default, so this qualifier allows default browser behaviour, in this case, opening a Save prompt
  .Once()          // the shortcut is destroyed after the first time it triggers
  .InInput();      // allows the shortcut to trigger while the document.activeElement is an input element (input/textarea/select)
```

### Modes

**Modes** are a way of only allowing a certain subset of shortcuts to be active at any given time.  Shortcuts that have not been assigned a **mode** will always be active by default.

```javascript
// will be active by default
When('a').Execute(console.log);

// won't be active until the mode is set to "mode1"
When.modeIs('mode1', [
  When('b').Execute(console.log),
]);

When.setMode('mode1');

When.clearMode(); // sets the mode back to "null"
```

### Groups

**Groups** are another way of controlling multiple shortcuts at a time by creating a single controller for them.  They have all the same controller methods that a shortcut controller would have.

```javascript
const group1 = When.newGroup([
  When('a').IsPressed().Execute(console.log),
  When('b').IsPressed().Execute(console.log),
  When('c').IsPressed().Execute(console.log),
]);

const shortcut1 = When('d').IsPressed().Execute(console.log);
const shortcut2 = When('e').IsPressed().Execute(console.log);
const group2 = When.newGroup([shortcut1, shortcut2]);

group1.pause();
group1.unpause();
group1.toggle();
group1.trigger();
group1.destroy();
```

### Focus

*When* includes a **focus** system, similar to the concept of focus found in operating systems. It allows you to limit shortcuts to only trigger when a certain element (or child) has been clicked on.
```xml
<div id="some-id" class="when-focus"></div>
<div class="some-class"></div>
<div class="some-class"></div>
```

```javascript
// this shortcut will only trigger when this specific element has been set as the focus target (either with When.setFocus() or by the user clicking it)
const div = document.getElementById('some-id');
When.focusIs(div, [
  When('a').Execute(console.log),
]);

// this shortcut will triger any time the focus target has the ID "some-id", even if it isn't always the same instance of the node
When.focusIs('#some-id', [
  When('b').Execute(console.log),
]);

// this shortcut will triger any time the focus target has the class name "some-class"
When.focusIs('.some-class', [
  When('c').Execute(console.log),
]);

// you can also set focus explicitly if desired
function focusBox() {
  When.setFocus(document.querySelector('#some-id'));
}
```

You can also tie into this system to make the current focus apparent to the user:

```javascript
When.focusChanges((newFocusEl, prevFocusEl) => {
  if (newFocusEl) {
    newFocusEl.classList.add('focused');
  }
  if (prevFocusEl) {
    prevFocusEl.classList.remove('focused');
  }
});
```

### Self Documentation

*When* is capable of generating documentation for all the keyboard shortcuts you've registered up the to point that you call `When.documentation()`.  It returns an array of `{ combination: string, command: string, mode: string }` representing each shortcut.

***NOTE***: This is primarily meant to be used a developer tool.  Because only the shortcuts registered so far get documented, this will not necessarily document *all* of the shortcuts your app registers in its lifetime.  Only display this information to your users if you are certain all shortcuts have been registered for the lifetime of the app.  The shortcuts output by `When.documentation()` are deduplicated from the shortcuts created over the lifetime of the app so far, and are unique based on `mode`, `combination` and `focusTarget`.

```javascript
console.log(When.documentation());

/*
  [
    {
      combination: '↓a',
      command: 'some_command',
      mode: '',
    }
  ]
*/
```