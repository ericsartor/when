# Type: ShortcutHandler

ShortcutHandlers are functions that react to shortcuts.  They are registered with a *command name* through [When.command()](../../global-methods/command), or set with [Execute()](../../whenable-methods/Execute) as an unregistered handler.

```javascript
// registration for re-use
When.command('some_command', (context) => {
  console.log(context);
});
When('a').Execute('some_command');

// one-time use
When('a').Execute((context) => {
  console.log(context);
});
```

## Event Context

Shortcut handlers are provided with a *context* object that contains multiple useful properties that allow you to make very generalized handlers:

```typescript
{
  event: KeyboardEvent,               // the native browser event that triggered the shortcut
                                      // (if it was a multi-key shortcut, it's the last event in the sequence)
  
  shortcut: ShortcutController,       // contains the useful shortcut.keys Array which you can use to see what
                                      // keys were involved in the shortcut that triggered the handler

  focusedElement: HTMLElement | null, // the currently focused element, if you are utilizing the Focus system

  pressDuration?: number,             // the exact millisecond value of the duration of a held event,
                                      // which will differ slightly from the value it was registered with

  keys: string[]                      // array of string key identifiers involved in the shortcut's timeline

  ctrl: boolean,                      // these are pulled right off of context.event for convenience,
  alt: boolean,                       // so it is only relevant to the last event in the shortcut
  shift: boolean,
  meta: boolean,

}
```

Using the *context* object allows you to create generalized commands, such as this:

```javascript
const vowels = ['a', 'e', 'i', 'o', 'u'];
When.command('log_letter_type', (context) => {
  const key = context.keys[0];
  if (vowels.includes(key)) {
    console.log('vowel');
  } else {
    console.log('consonant');
  }
});

When.keyGroups().letters.forEach((letter) => {
  When(letter).Execute('log_letter_type');
});
```