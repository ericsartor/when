# QWERTY Layout

This layout is the default layout for *When*, and can be explicitly loaded with:

```javascript
When.loadLayout('qwerty');
```

## Key Groups

See: [When.keyGroups()](../../global-methods/keyGroups)

```javascript
{
  arrowKeys: [
    'arrow_up', 'arrow_right', 'arrow_down', 'arrow_left',
  ],

  fKeys: [
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10',
    'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19',
  ],

  letters: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  ],

  numbers: [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  ],
}
```

## Modifiers

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
|ctrl|17|
|alt|18|
|shift|16|
|left_meta<br>meta|91|
|right_meta|92|not many browsers support two separate meta buttons, you should use "meta"|

## F Keys

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
f1|112|
f2|113|
f3|114|
f4|115|
f5|116|
f6|117|
f7|118|
f8|119|
f9|120|
f10|121|
f11|122|
f12|123|
f13|124|
f14|125|
f15|126|
f16|127|
f17|128|
f18|129|
f19|130|

## Control Keys

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
escape|27|
scroll_lock|145|
pause_break|19|
context_menu|93|
backspace|8|
tab|9|
caps_lock|20|
space|32|
enter|13|
insert|45|
home|36|
page_up|33|
delete|46|
end|35|
page_down|34|

## Arrow Keys

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
arrow_up|38|
arrow_right|39|
arrow_down|40|
arrow_left|37|

## Numbers

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
|0|48<br>96|both number row and numpad|
|1|49<br>97|both number row and numpad|
|2|50<br>98|both number row and numpad|
|3|51<br>99|both number row and numpad|
|4|52<br>100|both number row and numpad|
|5|53<br>101|both number row and numpad|
|6|54<br>102|both number row and numpad|
|7|55<br>103|both number row and numpad|
|8|56<br>104|both number row and numpad|
|9|57<br>105|both number row and numpad|
|num0|48|number row|
|num1|49|number row|
|num2|50|number row|
|num3|51|number row|
|num4|52|number row|
|num5|53|number row|
|num6|54|number row|
|num7|55|number row|
|num8|56|number row|
|num9|57|number row|
|num_lock|144|num pad|
|numpad_divide|111|num pad|
|numpad_multiply|106|num pad|
|numpad_subtract|109|num pad|
|clear|12|num pad|
|numpad_add|107|num pad|
|numpad_decimal|110|num pad|
|numpad0|96|num pad|
|numpad1|97|num pad|
|numpad2|98|num pad|
|numpad3|99|num pad|
|numpad4|100|num pad|
|numpad5|101|num pad|
|numpad6|102|num pad|
|numpad7|103|num pad|
|numpad8|104|num pad|
|numpad9|105|num pad|

## Symbols

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
|`<br>~<br>grave_accent<br>tilde|192|
|[<br>{<br>left_square_bracket<br>left_curly_bracket|219|
|]<br>}<br>right_square_bracket<br>right_curly_bracket|221|
|\\<br>\|<br>backslash<br>pipe|220|
|;<br>:<br>colon<br>semicolon|186|
|'<br>"<br>apostrophe<br>quote|222|
|,<br><<br>comma<br>less_than|188|
|><br>period<br>greater_than|190|"." cannot be used as it conflicts with the numpad_decimal character|
|?<br>forward_slash<br>question_mark|191|"/" cannot be used as it conflicts with the numpad_divide character|
|_<br>hyphen<br>underscore|189|"-" cannot be used as it conflicts with the numpad_subtract character|
|=<br>plus<br>equals|187|"+" cannot be used as it conflicts with the numpad_add character|

## Letters

| Identifiers | Which | Notes |
|-------------|:-----:|-------|
a|65|
b|66|
c|67|
d|68|
e|69|
f|70|
g|71|
h|72|
i|73|
j|74|
k|75|
l|76|
m|77|
n|78|
o|79|
p|80|
q|81|
r|82|
s|83|
t|84|
u|85|
v|86|
w|87|
x|88|
y|89|
z|90|