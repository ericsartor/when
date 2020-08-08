# Events

*When* exposes three types of keyboard events built on top of the DOM `keyup` and `keydown` events: [pressed](#pressed), [released](#released) and [held](#held), which are primarily registered using the [IsPressed()](#./methods/IsPressed.md), [IsReleased()](#./methods/IsReleased.md) and [IsHeldFor()](#./methods/IsHeldFor.md) methods, in addition to [IsInput()](#./methods/IsInput.md), which is a compound way of registering **pressed** events.

## pressed

The **pressed** event is synonymous with the native DOM `keydown` event.  Each time a `keydown` event is fired for a given key, a **pressed** event is also fired for that key.

Using this *When* event will achieve similar results as using the native `keypress` event, which is fired when a key that produces a character value is pressed down (though this is [depreciated](https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event)).  Anywhere you would use `keydown` or `keypress`, **pressed** will work.

You can hook into the **pressed** event in the following ways:

[IsPressed()](#./methods/IsPressed.md)

```javascript
// here we are explicitly setting up a "pressed" handler for a single press of the "a" key
When('a').IsPressed().Execute(console.log);
```

[IsInput()](#./methods/IsInput.md)

```javascript
// here we are setting up a handler that responds to the keys "a", "b" and "c" being pressed in sequence.
// using IsInput() allows you to enter sequences of characters into When() and Then(), and assumes you want "pressed" events for each
When('a b c').IsInput().Execute(console.log);
```

## released

The **released** event is synonymous with the native DOM `keyup` event.  Each time a `keyup` event is fired for a given key, a **released** event is also fired for that key.

The **released** event can only be registered using the standard chained method:

```javascript
// here we are explicitly setting up a "released" handler for a single release of the "a" key
When('a').IsReleased().Execute(console.log);
```

## held

The **held** event is *When's* own construct.  It operates by having an interval running in the background that checks to see if a key is still pressed down.  When it detects that a key has been pressed for longer than 500ms, a **held** event is registered.  Each subsequent time that the same key is still held down, the event's `duration` property is simply updated to reflect the new duration.

A **held** event is registered using multiple chain methods:

```javascript
When('a').IsHeldFor(1).Seconds().Execute(console.log);
When('b').IsHeldFor(500).Milliseconds().Execute(console.log);
```

## Putting It All Together

All these event types and registration methods can be used together in any way you see fit:

```javascript
When('a')
  .IsPressed()
  .Then('b')
  .IsHeldFor(1).Seconds()
  .Then('a')
  .IsReleased()
  .Then('num1 num2 num3')
  .IsInput()
  .Execute(console.log);
```