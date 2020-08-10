# Focus

- [Overview](#overview)
- [Focus Constraints](#focus-constraints)
    - [Element](#element)
    - [id](#id)
    - [class](#class)
- [Reacting To Focus Changes](#reacting-to-focus-changes)

## Overview

The **focus** system in *When* allows you to simulate the same experience of window/app focus that users get on their operating systems.

This means that when a user clicks on part of the page, you can control what *When* considers to be in "focus".  It's achieved using the special CSS `when-focus` class.  Simply attach that class to any element you want to enable the **focus** feature on.

When an element with the `when-focus` class name is clicked, or when one of its children are clicked, *When* considers that element to be in focus.

Generally, you would use this on the parts of your app that are clearly distinct, such as on pop-up type components, sections of your page that are visually separate from each other, or window/overlay elements.

Until an element (or child of) with the `when-focus` class is clicked, the focus is considered to be `null`.  If an element is ever clicked that doesn't have the `when-focus` class and none of it's ancestors have it, the focus is reset to `null`.  When the focus is `null`, no shortcut with a **focus** constraint will work.

This feature can be very powerful, but is made even more robust by *When* exposing a way to tie into the **focus** system itself. With this, your app can react to the focus changing.  You might use this to change your styles slightly when an element gains or loses focus, such as by altering opacity or adding a border or background color.

## Focus Constraints

### Element

One way to specify a focus constraint on a shortcut to is pass a reference to the element itself to [When()](../../whenable-methods/When).

```xml
<div class="when-focus">
  Content...
</div>
```

```javascript
const div = document.getElementsByTagName('div')[0];
When(div).IsFocused().Then('a').IsPressed().Execute((context) => {
  const content = context.focusedElement.textContent;
  console.log(content);
});
```

### id

Another way to add a focus constraint is with the `id:` selector.

Note that the target element *doesn't* have to exist at the time the shortcut is created, but *When* will log a warning in that case.  It will also log a warning if the element exists but the `when-focus` class is not present on it.

```xml
<div id="test" class="when-focus">
  Content...
</div>
```

```javascript
When('id:test').IsFocused().Then('a').IsPressed().Execute((context) => {
  const content = context.focusedElement.textContent;
  console.log(content);
});
```

### class

Finally, you can use the `class:` selector to select multiple elements.

Again, the elements need not exist at the moment you create the shortcut, but *When* will log a warning if *any* of the elements that do exist are missing the `when-focus` class.

```xml
<div class="card when-focus">
  <p>Card 1 content...<p/>
</div>
<div class="card when-focus">
  <p>Card 2 content...<p/>
</div>
<div class="card when-focus">
  <p>Card 3 content...<p/>
</div>
```

```javascript
When('class:card').IsFocused().Then('a').IsPressed().Execute((context) => {
  const content = context.focusedElement.getElementsByTagName('p')[0].textContent;
  console.log(content);
});
```

## Reacting To Focus Changes

A focus system is only really useful when the user understands which part of the page is in focus.  To facilitate this, *When* exposes the [When.focusChanges()](../../global-methods/focusChanges) utility for registering focus change handlers.

You can register multiple handlers if required, but generally only one will be necessary.

A modified version of the `class:` selector example can be seen below utilizing [When.focusChanges()](../../global-methods/focusChanges).

```css
.card {
  opacity: 0.5;
}

.focused {
  opacity: 1;
}
```

```xml
<div class="card when-focus">
  <p>Card 1 content...<p/>
</div>
<div class="card when-focus">
  <p>Card 2 content...<p/>
</div>
<div class="card when-focus">
  <p>Card 3 content...<p/>
</div>
```

```javascript
When('class:card').IsFocused().Then('a').IsPressed().Execute((context) => {
  const content = context.focusedElement.getElementsByTagName('p')[0].textContent;
  console.log(content);
});

When.focusChanges((newFocusElement, prevFocusElement) => {
  if (newFocusElement) {
    newFocusElement.classList.add('focused');
  }
  if (prevFocusElement) {
    prevFocusedElement.classList.remove('focused');
  }
});
```

## Setting Focus Explicitly

You can change the focus programmatically using [When.setFocus()](../../global-methods/setFocus).  Simply provide an `HTMLElement` as the first argument and make sure it has the `when-focus` class (it wouldn't be a valid focusable element otherwise), and the focus will be updated!

This could be used if you implement a keyboard shortcut that is meant to change focus, similar to Alt + Tab on Windows and Cmd + Tab on Mac.

**Note**: this will still trigger all your [When.focusChanges()](../../global-methods/focusChanges) handlers.

```xml
<div id="div1"></div>
<div id="div2" class="when-focus"></div>
```

```javascript
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');

// throws error
When.setFocus(div1);

// succeeds
When.setFocus(div2);
```