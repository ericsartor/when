# When

### A powerful, human readable keyboard shortcut library and focus system

*When* aims to make keyboard shortcuts arbitrary and quick to set up, understand and change, while enabling features you don't get out of the box with DOM events.

All *When* code is very human readable while maintaining a small footprint in your code base.  It enables you to write code exactly as you would explain it to a user, to the point where comments are rarely necessary in the code.

A "focus" system is included in *When* which facilitates the same concept of "focus" found in operating systems, so shortcuts can be specific to certain elements on your page, and you can tie into this system to make the user's focus very apparent to them in any way you see fit.

The library contains many features and is chainable, so you can combine these features in various ways to create the exact keyboard experience you want for your application.  It can be as simple as a single keystroke or as complicated as writing out a full word within a certain amount of time with a certain element in focus.

*When* even generates its own documentation programmatically, which you can structure, style and manipulate in any way you desire, so your users can learn your keyboard shortcuts efficiently.

We've even taken care of the cross browser and cross operating system inconsistencies, so when you want a consistent experience across different platforms, you get it with *When*!

## Features

- cross browser compatible (tested on Windows so far)
- easily set up complicated keyboard shortcuts including:
  - single or multi key shortcuts with modifier and meta key support
  - character sequence shortcuts
  - access to pressed, released and held event types
  - limit the time a shortcut must be performed within from start to end (or set it as long as you like!)
  - default behaviour prevention
  - one time shortcuts
  - chain together all these options in any way you like
- easy to use "focus" system for limiting when/how shortcuts get triggered depending on where the user last clicked
- register "commands" for re-usable event handlers addressable by strings
  - tie your features to a command name instead of using a literal function, making swapping commands out easy!
- automatically generate keyboard shortcut documentation for users and developers
- very human readable and compact
- shortcuts can be programatically executed without input from the user
- shortcuts can be temporarily paused and unpaused, or completely removed programmatically
- clear errors that explain how *When* can/should be used

## Examples

Setting up an event handler

```javascript
When('EXAMPLE_COMMAND').IsExecuted().Run((ctx) => {
  // ctx.event contains the native KeyboardEvent that triggered/fulfilled the shortcut
  // ctx.pressDuration contains the duration in milliseconds the key was held down for (if the last event was a "held" event)

  console.log('Thanks for using When!')
})
```

A simple, single key shortcut

```javascript
When('a').IsPressed().Execute('EXAMPLE_COMMAND')
```

A sequential shortcut that must be completed within a time limit

```javascript
When('num1').IsPressed()
  .Then('num2').IsPressed()
  .Then('num3').IsPressed()
  .Within(500).Milliseconds()
  .Execute('EXAMPLE_COMMAND')
```

A shortcut combining pressed, released and held events
```javascript
When('q').IsPressed()
  .Then('w').IsHeldFor(1).Seconds()
  .Then('q').IsReleased()
  .Execute('EXAMPLE_COMMAND')
```

A shortcut implementing various behaviour modifiers
```javascript
When('ctrl+s').IsPressed().PreventDefault().Execute('EXAMPLE_COMMAND').Once()
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

    <script>
      const el = document.getElementById('shortcut-element')

      When(el).IsFocused().Then('enter').IsPressed().Execute('EXAMPLE_COMMAND')

      // highlight the focused element
      When().FocusChanges((newFocusEl, prevFocusEl) => {
        if (newFocusEl !== null) {
          newFocusEl.classList.add('focused')
        }
        if (prevFocusEl !== null) {
          prevFocusEl.classList.remove('focused')
        }
      })
    </script>
  </body>
</html>
```

Generate documentation

```javascript
const table = document.getElementById('doc-table')
When.Documentation().forEach((shortcut) => {
  const docLine = document.createElement('tr')
  docLine.innerHTML = `<td>${shortcut.combination}</td><td>${shortcut.command}</td>`
  table.appendChild(docLine)
})
```

| combination | command |
|-|-|
| ↓a | example_command |
| ↓num1, ↓num2, ↓num3 (within 500ms) | example_command |
| ↓q, ↓w (hold 1s), ↑q | example_command |
| ↓ctrl+s | example_command |
| ↓enter | example_command |