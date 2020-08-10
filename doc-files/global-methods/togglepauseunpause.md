## When.toggle() / When.pause() / When.unpause()

args: *none*

returns: `undefined`

When.toggle() / When.pause() / When.unpause() are used to control the global active state of *When*.  When.pause() will prevent any shortcuts from being triggered, When.unpause() will re-enable shortcuts, and When.toggle() will toggle the active state.

This can be useful for when you don't want to let your users do anything, for a brief period of time.