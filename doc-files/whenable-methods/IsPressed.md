## *Whenable*.IsPressed()

args: *none*

returns: [Whenable](../../types/Whenable)

IsPressed() is used to register a [pressed](../features/events#pressed) event for the most recent identifier in a *When* chain.

```javascript
// registers a "pressed" event for the "a" key
When('a').IsPressed().Execute(console.log);
```