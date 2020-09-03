# When

[Documentation](https://ericsartor.github.io/when/)

[Installation](#installation)

[Features](#features)

[Examples](#examples)

## Installation

Install from NPM

```bash
npm i --save when-key-events
```

Wherever you want to use it:

```javascript
import 'when-key-events';
const When = window.When;
```

or use the CDN:

```javascript
<script src="https://unpkg.com/when-key-events@latest/dist/When.js"></script>
```

### A powerful, human readable keyboard shortcut/binding library and focus system

*When* aims to make complex keyboard shortcuts arbitrary and quick to set up, understand and change, while enabling features you don't get out of the box with DOM events.  The goal is to give you granular control over when/how you react to your user's keyboard inputs, while keeping the code human readable and easy to maintain.

A "focus" system is included in *When* which facilitates the same concept of "focus" found in operating systems, so shortcuts can be specific to certain elements on your page, and you can tie into this system to make the user's focus very apparent to them in any way you see fit.

## Features

- easily set up complicated keyboard shortcuts including:
  - single or multi key shortcuts with modifier and meta key support
  - character sequence shortcuts
  - access to pressed, released and held event types
  - limit the time a shortcut must be performed within from start to end (or set it as long as you like!)
  - default behaviour prevention
  - one time shortcuts
  - chain together all these options in any way you like
- "focus" system for limiting when/how shortcuts get triggered depending on where the user last clicked
- "modes" which allow you to easily group shortcuts together and only have one set of shorcuts enabled at a time
- "groups" which allow you to pause/unpause/toggle/remove/trigger multiple shortcuts at a time
- register "commands" for re-usable event handlers addressable by strings
  - tie your features to a command name instead of using a literal function, making swapping commands out easy!
- automatically generate keyboard shortcut documentation for users and developers
- shortcuts can be programatically executed without input from the user
- shortcuts can be temporarily paused and unpaused, or completely removed programmatically
- clear errors that explain how *When* can/should be used

## Examples

Setting up a named event handler

```javascript
When.command('EXAMPLE_COMMAND', () => {
  console.log('Thanks for using When!')
});
```

A simple, single key shortcut

```javascript
When('a').Execute('EXAMPLE_COMMAND');

When('b').Execute(() => {
  console.log('You can also use function literals!');
});
```

A sequential shortcut that must be completed within a time limit

```javascript
When('ctrl+k ctrl+l (500ms)').Execute('EXAMPLE_COMMAND');
```

A shortcut combining pressed, released and held events
```javascript
When('1').IsPressed()
  .Then('2').IsHeldFor(1).Seconds()
  .Then('1').IsReleased()
  .Execute('EXAMPLE_COMMAND');
```

A shortcut implementing various behaviour modifiers
```javascript
When('ctrl+s').Execute('EXAMPLE_COMMAND')
  .Once()           // shortcut will be deleted after its first use
  .AllowDefault()   // allow default browser behaviour for any shortcuts involved in the chain (disabled by default)
  .InInput();       // allows the shortcut to work in text inputs, which is disabled by default
```

Shortcut Controllers

```javascript
const shortcut = When('a').Execute(console.log);

shortcut.pause();   // temporarily stop shortcut from triggering  
shortcut.unpause(); // re-enable shortcut if paused
shortcut.toggle();  // toggle paused state of shortcut
shortcut.trigger(); // programmatically trigger the event handler
shortcut.remove();  // stop shortcut from triggering permanently
```

Group Controllers

```javascript
const group = When.newGroup([
  When('a').Execute(console.log),
  When('b').Execute(console.log),
  When('c').Execute(console.log),
]);

group.pause();
group.unpause();
group.toggle();
group.trigger();
group.remove();
```

Modes

```javascript
When.modeIs('mode1').Register([
  When('a').Execute(console.log),
]);

// OR

When().ModeIs('mode1').Then('a').Execute(console.log);

When.setMode('mode1'); // actives all shortcuts with this mode constraint
When.clearMode();      // any shortcuts with mode constraints get disabled
```

Using the focus system to create a shortcut that only works if a certain element is focused,
and to display the focus to the user

```xml
<html>
  <head>
    <style>
      .focused {
        background: yellow;
      }
    </style>
  </head>
  <body>
    <!-- if you click within this, the shortcut works! -->
    <div id="shortcut-element" class="when-focus">
      <h1>Title</h1>
      <p>Paragraph.</p>
    </div>

    <!-- if you click within here, the shortcut will stop working -->
    <div>
      <h1>Title</h1>
      <p>Paragraph.</p>
    </div>

    <script src="dist/When.js"></script>
    <script>
      const el = document.getElementById('shortcut-element');

      When.focusIs(el).Register([
        When('enter').Execute(console.log),
      ]);

      // highlight the focused element
      When.focusChanges((newFocusEl, prevFocusEl) => {
        if (newFocusEl !== null) {
          newFocusEl.classList.add('focused');
        }
        if (prevFocusEl !== null) {
          prevFocusEl.classList.remove('focused');
        }
      });
    </script>
  </body>
</html>
```

Generate documentation

```javascript
const table = document.getElementById('doc-table');
When.documentation().forEach((shortcut) => {
  const docLine = document.createElement('tr');
  docLine.innerHTML = `<td>${shortcut.combination}</td><td>${shortcut.command}</td><td>${shortcut.mode}</td>`;
  table.appendChild(docLine);
});
```

| combination | command | mode |
|-|-|-|
| ↓a | example_command |
| ↓num1, ↓num2, ↓num3 (within 500ms) | example_command |
| ↓q, ↓w (hold 1s), ↑q | example_command |
| ↓ctrl+s | example_command |
| ↓enter | example_command |