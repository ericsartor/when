## *Whenable*.IsExecuted()

args: *none*

returns: [*Whenable*](../../types/Whenable)

IsExecuted() is used to specify that the identifier passed to [When()](./When.md) is a command name, not a key identifier (see [Commands](../../features/commands) for more details).

It is used in conjunction with [Run()](./Run.md) to associate a command name with a shortcut handler.

```javascript
// this registers a shorcut handler with the name "some_command"
When('some_command').IsExecuted().Run((context) => {
  console.log(context);
});

// this sets up a shortcut that triggers the command
When('a').IsPressed().Execute('some_command');
```