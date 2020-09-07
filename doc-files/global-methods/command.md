## When.command(*commandName*, *handlerFunc*)

args: 

***commandName***: `String`, name of the command to be used in [When.Execute()](../whenable-methods/Execute.md)

***handlerFunc***: `Function`, the function to register to the command, receives an [event context](../overview.md#event-context) as first argument

returns: `undefined`

When.command() is used to register an event handler to a command name.

```javascript
When.command('some_command', (context) => {
  console.log(context);
});

When('a').Execute('some_command');
```