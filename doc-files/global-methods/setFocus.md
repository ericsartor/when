## When.setFocus(*element*)

args: 

***element***: `HTMLElement`, the element to give focus to

returns: `undefined`

When.setFocus() is used to explicitly give focus to a given element.  That element must have the `when-focus` class, or it will throw an error.

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