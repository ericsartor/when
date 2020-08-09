## *Whenable*.Run(*handler*)

args:

***handler***: [*ShortcutHandler*](../../types/ShorcutHandler), the function to run when the command name is used in a shortcut

returns: *none*

Run() is used in conjunction with [IsExecuted()](./IsExecuted.md) to register a handler function associated with a command (see [Commands](../../features/commands) for more details).

```javascript
// this registers a shorcut handler with the name "some_command"
When('some_command').IsExecuted().Run((context) => {
  console.log(context);
});

// this sets up a shortcut that triggers the command
When('a').IsPressed().Execute('some_command');
```