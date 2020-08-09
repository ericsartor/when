## *Whenable*.IsFocused()

args: *none*

returns: [*Whenable*](../../types/Whenable)

IsFocused() registers the focus target provided to [When()](./When.md) as a [focus](../../features/focus) constraint on a shortcut.  That target must be focused in order for the shortcut to fire.

```javascript
// creates a shortcut for pressing "a" then will only fire if an element with id "some-id" is focused
When('id:some-id').IsFocused().Then('a').IsPressed().Execute(console.log);
```