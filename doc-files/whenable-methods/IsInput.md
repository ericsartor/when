## *Whenable*.IsInput()

args: *none*

returns: [Whenable](../../types/Whenable)

IsInput() is used to register one or more [pressed](../features/events#pressed) events for the most recent identifier sequence in a *When* chain.

It allows you to create simple multi key shortcuts without having to create a long chain.

The string identifier you provide must have valid key identifiers separated by spaces, with an optional time constraint at the end in penthesis in the form of `([Number]s)` or `([Number]ms)`

```javascript
// creates a shortcut that registers three pressed events for keys "a", "b" and "c"
// to be pressed in sequence within 1 second
When('a b c (1s)').IsInput().Execute(console.log);

// this is the equivalent "long" way to achieve the same thing
When('a').IsPressed()
  .Then('b').IsPressed()
  .Then('c').IsPressed()
  .Within(1).Seconds()
  .Execute(console.log);
```