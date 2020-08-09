## When.loadLayout(*layoutName*)

args:

***layoutName***: `String`, the name of the keyboard layout to load

returns: `undefined`

When.loadLayout() is used to change *When's* understanding of which keys are which, according to different keyboard layout standards.

It is recommended that you either auto-detect/assume the keyboard layout for your users, or give them an option to choose their layout, if you intend to support more than one layout.

Supported layouts:

- [QWERTY](https://en.wikipedia.org/wiki/QWERTY) (with the NumPad)
    - `'qwerty'`

```javascript
When.loadLayout('qwerty');
```