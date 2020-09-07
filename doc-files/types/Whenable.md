# Type: Whenable

A *Whenable* is what *When* calls an object that returns itself after executing a method on it.  This allows for [chaining](https://en.wikipedia.org/wiki/Method_chaining).

The [When()](../../whenable-methods/When) function returns a *Whenable* when called and allows you to start calling each of its methods in a chain, ultimately to register a shortcut and create a [ShortcutController](./ShortcutController) with [Execute()](../../whenable-methods/Execute) or register a [command](../../features/commands) with [Run()](../../whenable-methods/Run).

A *Whenable* contains the following methods, documented on separate pages:

- [Then()](../../whenable-methods/Then)
- [ModeIs()](../../whenable-methods/ModeIs) (depreciated)
- [IsFocused()](../../whenable-methods/IsFocused) (depreciated)
- [IsInput()](../../whenable-methods/IsInput)
- [IsPressed()](../../whenable-methods/IsPressed)
- [IsReleased()](../../whenable-methods/IsReleased)
- [IsHeldFor()](../../whenable-methods/IsHeldFor)
- [Within()](../../whenable-methods/Within)
- [Milliseconds()](../../whenable-methods/Milliseconds)
- [Seconds()](../../whenable-methods/Seconds)
- [IsExecuted()](../../whenable-methods/IsExecuted) (depreciated)
- [Run()](../../whenable-methods/Run) (depreciated)
- [Execute()](../../whenable-methods/Execute)