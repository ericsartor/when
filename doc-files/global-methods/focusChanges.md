## When.focusChanges(*focusChangeHandler*)

args:

***focusChangeHandler***: `Function`, a function that will be called any time [focus](../../features/focus) changes within your app, which will be provided two arguments, `newFocusElement` and `previousFocusElement`, both of type `HTMLElement | null`

returns: `undefined`

When.focusChanges() is used to register a handler function for when focus changes within your app, as discussed in the [Focus](../../features/focus) section.  It allows you to tie into the focus system and make visual changes to your app to reflect the new focus target if you so choose.

```javascript
// add/remove a CSS class that will make the focus apparent to the user
When.focusChanges((newFocusEl, prevFocusEl) => {
  if (newFocusEl) {
    newFocusEl.classList.add('focused');
  }
  if (prevFocusEl) {
    prevFocusEl.classList.remove('focused');
  }
})
```