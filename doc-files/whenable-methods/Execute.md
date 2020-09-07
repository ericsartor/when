## *Whenable*.Execute(*handler* | *commandName*[, *docName*])

args:

***handler***: [*ShortcutHandler*](../../types/ShortcutHandler) *or* ***commandName***: `String`, the name of a command registered via [Run()](./Run)

***docName***: *optional* `String`, the name that will show up as the command in [When.documentation()](../../global-methods/documentation)

Execute() defines which [*ShortcutHandler*](../../types/ShortcutHandler) should be used for the shortcut, either by specifying one explicitly or providng a command name for a previously registered handler.

```javascript
When.command('some_command', (context) => {
  console.log(context);
});

// in When.documentation(), this shortcut will have a "command" property value of 'some_command'
When('a').Execute('some_command');

// in When.documentation(), this shortcut will have a "command" property value of ''
When('b').Execute(console.log);

// in When.documentation(), this shortcut will have a "command" property value of 'log',
// even though 'log' is not a registered command name
When('c').Execute(console.log, 'log');
```