## When.documentation()

args: none

returns: `Array` of `Object` that look like `{ combination: String, command: String, mode: String }`

When.documentation() generates objects that can be used to document the keyboard shortcuts in your app.

**NOTE**: This method is meant to be used for development purposes, such as to assist in creating shortcut documentation, and not for use in your app itself.  It only documents keyboard shortcuts that are **currently** registered, meaning shortcuts that are created dynamically will likely not be documented. However, if you app creates all required shortcuts immediately/statically, this method *could* be used to display documentation in your app.

```javascript
When('a').IsPressed().Execute(console.log, 'console log');

console.log(When.documentation());

// would produce:
[
  {
    combination: '↓a',
    command: 'console log',
    mode: '',
  }
]
```

You might use this in your app like this:

```javascript
const tableBody = document.querySelector('tbody')[0];
When.documentation().forEach((shortcut) => {
  tableBody.innerHTML += `<tr>
    <td>${shortcut.combination}</td>
    <td>${shortcut.command}</td>
    <td>${shortcut.mode}</td>
  </tr>`;
})
```

or simply call it from the DevTools in your browser for reference.