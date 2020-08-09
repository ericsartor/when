# Type: ShortcutHandler

ShortcutHandlers are functions that react to shortcuts.  They are registered either through [Run()](../../whenable-methods/Run) in association with a [command](../../features/Command), or through [Execute()](../../whenable-methods/Execute) as an unregistered handler.

They are provided with a *context* object that contains multiple useful properties that allow you to make very generalized handlers:

```typescript
{
  event: KeyboardEvent,               // the native browser event that triggered the shortcut
                                      // (if it was a multi-key shortcut, it's the last event in the sequence)
  
  shortcut: ShortcutController,       // contains the useful shortcut.keys Array which you can use to see what
                                      // keys were involved in the shortcut that triggered the handler

  focusedElement: HTMLElement | null, // the currently focused element, if you are utilizing the Focus system

  pressDuration?: number,             // the exact millisecond value of the duration of a held event,
                                      // which will differ slightly from the value it was registered with
}
```

Using the *context* object allows you to create generalized commands, such as this:

```javascript
const vowels = ['a', 'e', 'i', 'o', 'u'];
When('log_letter_type').IsExecuted().Run((context) => {
  const key = context.shortcut.keys[0];
  if (vowels.includes(key)) {
    console.log('vowel');
  } else {
    console.log('consonant');
  }
});

['a', 'b', 'c', 'd'].forEach((letter) => {
  When(letter).IsPressed().Execute('log_letter_type');
});
```