## *Whenable*.IsPressed()

args:

*none*

`IsPressed()` is used to register a [pressed](../features/events.md#pressed) event for the most recent identifier in a *When* chain.

```javascript
// registers a "pressed" event for the "a" key
When('a').IsPressed().Execute(console.log);
```