!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.when=t():e.when=t()}(window,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=9)}([function(e,t,n){"use strict";var i,r=this&&this.__extends||(i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.warnAboutChainOrder=t.warn=t.setQuiet=t.quiet=t.WhenError=void 0;var s=function(e){function t(t,n){var i=this;return n&&(t+="\n\nLast succesful chain call: "+n.lastCalledFunctionName),(i=e.call(this,t)||this).name="WhenError",i.whenData=n||null,i}return r(t,e),t}(Error);t.WhenError=s,t.quiet=!1,t.setQuiet=function(){t.quiet=!0},t.warn=function(e,n){t.quiet||(e="WhenWarning: "+e,n&&(e+="\n\nLast succesful chain call: "+n.lastCalledFunctionName),console.warn(e),console.trace())},t.warnAboutChainOrder=function(e,n,i){i.includes(n.lastCalledFunctionName)||t.warn(e+" should not be called after "+n.lastCalledFunctionName+", though it may still work as intended.",n)}},function(e,t,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.heldInterval=t.shouldCheckEvents=t.When=t.commands=void 0;var r=n(2),s=n(4),o=n(3),a=n(0),u=n(7),d=n(13),c=n(8),l=n(14),h=n(15);function f(e){if(null===this.n)throw new a.WhenError("n value was null",this);var t=e*this.n;switch(this.nType){case"held":if(null===this.identifier)throw new a.WhenError("identifier value was null",this);var n=l.getKeyFromIdentifier(this.identifier,this);r.validateKeyName(n);var i=h.getModifiersFromIdentifier(this.identifier);if(null===r.keys)throw new a.WhenError("A layout has not been loaded yet.");if(t<500)throw new a.WhenError("Held events cannot have a hold duration of less than 500 milliseconds, but "+t+" were provided.",this);this.events.push({type:"pressed",key:r.keys[n.toLowerCase()],identifier:n.toLowerCase(),rawIdentifier:this.identifier,timestamp:0,modifiers:i}),this.events.push({type:"held",key:r.keys[n.toLowerCase()],identifier:n.toLowerCase(),rawIdentifier:this.identifier,timestamp:0,duration:t,modifiers:i}),this.eventsFromLastIdentifier=this.events.slice(this.events.length-2),this.identifier=null;break;case"constraint":if(null!==this.timeConstraint)throw new a.WhenError("Only one time constraint be placed on a shortcut.",this);this.timeConstraint=t}}function m(e){if(void 0!==e&&"string"!=typeof e&&!(e instanceof HTMLElement))throw new a.WhenError("When() must be passed either a string identifier for a key (optionally with modifiers), a string name for a command or an HTMLElement for focus related functionality.  Instead, a value of type ["+typeof e+"] was receieved: "+e);return{identifier:"string"!=typeof e?null:e,element:"string"==typeof e?null:e,events:[],timeConstraint:null,focusRequired:!1,focusTarget:null,mode:null,isCommand:!1,preventDefault:!1,n:null,nType:null,once:!1,inInput:!1,shortcut:null,lastCalledFunctionName:"When()",eventsFromLastIdentifier:null,IsInput:function(){var e=this;if(a.warnAboutChainOrder("IsInput()",this,["When()","Then()"]),"string"!=typeof this.identifier)throw new a.WhenError("IsInput() must be called after a string key identifier sequence has been passed to When()/Then(), but currently the identifier is of type ["+typeof this.identifier+"]: "+this.identifier,this);var t=this.identifier.split(" ");return this.eventsFromLastIdentifier=[],t.forEach((function(t){var n=t.match(/id:[\w_-]+|class:[\w_-]+|\.[\w_-]+|#[\w_-]+/),i=t.match(/^\((\d+)(s|ms)\)$/);if(n){if(null!==e.focusTarget)throw new a.WhenError("Only one focus constraint be placed on a shortcut.",e);e.focusRequired=!0,e.focusTarget=t}else if(i){if(null!==e.timeConstraint)throw new a.WhenError("Only one time constraint be placed on a shortcut.",e);var s=Number(i[1])*("s"===i[2]?1e3:1);e.timeConstraint=s}else{if(null===r.keys)throw new a.WhenError("A layout has not been loaded yet.");var o=l.getKeyFromIdentifier(t,e),u=h.getModifiersFromIdentifier(t);r.validateKeyName(o,e),e.events.push({type:"pressed",key:r.keys[o.toLowerCase()],identifier:o.toLowerCase(),rawIdentifier:t,timestamp:0,modifiers:u}),null===e.eventsFromLastIdentifier&&(e.eventsFromLastIdentifier=[]),e.eventsFromLastIdentifier.push(e.events[e.events.length-1]),e.identifier=null}})),this.lastCalledFunctionName="IsInput()",this},Then:function(e){if(a.warnAboutChainOrder("Then()",this,["When()","ModeIs()","IsFocused()","IsPressed()","IsReleased()","Seconds()","Milliseconds()","Times()"]),null!==this.identifier&&this.IsInput(),"string"!=typeof e)throw new a.WhenError("Then() must be called with a string key identifier (optionally with modifiers).",this);return this.identifier=e,this.eventsFromLastIdentifier=null,this.lastCalledFunctionName="Then()",this},ModeIs:function(e){if(a.warnAboutChainOrder("ModeIs()",this,["When()"]),void 0===e)throw new a.WhenError("ModeIs() was called without a string argument.  A mode name is required as the first and only argument.",this);if("string"!=typeof e)throw new a.WhenError("ModeIs() was called with a "+typeof e+" argument instead of a string: "+e,this);return this.mode=e,this.lastCalledFunctionName="ModeIs()",this},IsFocused:function(){if(a.warnAboutChainOrder("IsFocused()",this,["When()"]),this.identifier){if(!o.validateFocusTarget(this.identifier))throw new a.WhenError('IsFocused() was called but the string identifier provided to When() was neither an "id:" or a "class:" selector',this)}else{if(!this.element)throw new a.WhenError('IsFocused() cannot be called until When() has received an HTMLElement or a "id:"/"class:" selector',this);this.element.classList&&this.element.classList.contains("when-focus")||a.warn('IsFocused() was called, but the element provided to When() did not have the "when-focus" class assigned to it.',this)}return this.focusRequired=!0,this.identifier?this.focusTarget=this.identifier:this.element&&(this.focusTarget=this.element),this.lastCalledFunctionName="IsFocused()",this},IsExecuted:function(){if(a.warnAboutChainOrder("IsExecuted()",this,["When()"]),null===this.identifier)throw new a.WhenError("IsExecuted() cannot be called before a string command name has been passed to When().",this);return this.isCommand=!0,this.lastCalledFunctionName="IsExecuted()",this},IsPressed:function(){if(a.warnAboutChainOrder("IsPressed()",this,["When()","Then()"]),null===this.identifier)throw new a.WhenError("IsPressed() cannot be called before a string key identifier has been passed to When() or Then()",this);if(null===r.keys)throw new a.WhenError("A layout has not been loaded yet.");var e=l.getKeyFromIdentifier(this.identifier,this);r.validateKeyName(e);var t=h.getModifiersFromIdentifier(this.identifier);return this.events.push({type:"pressed",key:r.keys[e.toLowerCase()],identifier:e.toLowerCase(),rawIdentifier:this.identifier,timestamp:0,modifiers:t}),null===this.eventsFromLastIdentifier&&(this.eventsFromLastIdentifier=[]),this.eventsFromLastIdentifier.push(this.events[this.events.length-1]),this.identifier=null,this.lastCalledFunctionName="IsPressed()",this},IsReleased:function(){if(a.warnAboutChainOrder("IsReleased()",this,["When()","Then()"]),null===this.identifier)throw new a.WhenError("IsReleased() cannot be called before a string key identifier has been passed to When() or Then()",this);if(null===r.keys)throw new a.WhenError("A layout has not been loaded yet.");var e=l.getKeyFromIdentifier(this.identifier,this);r.validateKeyName(e);var t=h.getModifiersFromIdentifier(this.identifier);return this.events.push({type:"released",key:r.keys[e.toLowerCase()],identifier:e.toLowerCase(),rawIdentifier:this.identifier,timestamp:0,modifiers:t}),null===this.eventsFromLastIdentifier&&(this.eventsFromLastIdentifier=[]),this.eventsFromLastIdentifier.push(this.events[this.events.length-1]),this.identifier=null,this.lastCalledFunctionName="IsReleased()",this},IsHeldFor:function(e){if(a.warnAboutChainOrder("IsHeldFor()",this,["When()","Then()"]),null===this.identifier)throw new a.WhenError("IsHeldFor() cannot be called before a string key identifier has been passed to When() or Then()",this);if("string"!=typeof e&&"number"!=typeof e||e<1)throw new a.WhenError('IsHeldFor() expects to receive a number greater than 0 or a string like "1s" or "1000ms", but received a value of type ['+typeof e+"]: "+e,this);if(r.validateKeyName(l.getKeyFromIdentifier(this.identifier,this)),this.nType="held",this.lastCalledFunctionName="IsHeldFor()","number"==typeof e)return this.n=e,this;var t=e.match(/(\d)(s|ms)/);if(null===t)throw new a.WhenError('IsHeldFor() received a string but it didn\'t match the template "1s" or "1000ms"',this);switch(this.n=Number(t[1]),t[2]){case"s":return this.Seconds();case"ms":return this.Milliseconds();default:throw new a.WhenError('IsHeldFor() received a string that did not contain "s" or "ms"',this)}},Within:function(e){if(a.warnAboutChainOrder("Within()",this,["Then()","IsPressed()","IsReleased()","Seconds()","Milliseconds()","Times()"]),"string"!=typeof e&&"number"!=typeof e||e<1)throw new a.WhenError('Within() expects to receive a number greater than 0 or a string like "1s" or "1000ms", but received a value of type ['+typeof e+"]: "+e,this);if(this.nType="constraint",this.lastCalledFunctionName="Within()","number"==typeof e)return this.n=e,this;var t=e.match(/(\d)(s|ms)/);if(null===t)throw new a.WhenError('Within() received a string but it didn\'t match the template "1s" or "1000ms"',this);switch(this.n=Number(t[1]),t[2]){case"s":return this.Seconds();case"ms":return this.Milliseconds();default:throw new a.WhenError('Within() received a string that did not contain "s" or "ms"',this)}},Milliseconds:function(){if(a.warnAboutChainOrder("Milliseconds()",this,["IsHeldFor()","Within()"]),!this.n)throw new a.WhenError("Milliseconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()",this);return f.call(this,1),this.lastCalledFunctionName="Milliseconds()",this},Seconds:function(){if(a.warnAboutChainOrder("Seconds()",this,["IsHeldFor()","Within()"]),!this.n)throw new a.WhenError("Seconds() cannot be called before a number greater than 0 has been passed to IsHeldFor() or Within()",this);return f.call(this,1e3),this.lastCalledFunctionName="Seconds()",this},Times:function(e){var t;if(a.warnAboutChainOrder("Times()",this,["When()","Then()","IsPressed()","IsReleased()","Seconds()","Milliseconds()"]),"number"!=typeof e||e<2)throw new a.WhenError("Times() expects to receive a number greater than 1, ' +\n\t\t\t\t\t\t'but a "+typeof e+" value was received: "+e,this);if(null!==this.identifier&&this.IsInput(),null===this.eventsFromLastIdentifier)throw new a.WhenError("Times() cannot be called if the current identifier hasn't registered any events yet",this);for(var n=0;n<e-1;n++)(t=this.events).push.apply(t,this.eventsFromLastIdentifier);return this.lastCalledFunctionName="Times()",this},Execute:function(e,n){a.warnAboutChainOrder("Execute()",this,["When()","Then()","IsPressed()","IsReleased()","Seconds()","Milliseconds()","PreventDefault()","IsInput()","Times()"]),null!==this.identifier&&this.IsInput();var o=typeof e;if("string"!==o&&"function"!==o)throw new a.WhenError("Execute() must be called with either a string command name or a handler function as the only argument, but a value of type ["+o+"] was received: "+e,this);if("string"==typeof e&&void 0===t.commands[e])throw new a.WhenError("Execute() was called with a command name not yet registered by a call to When([command_name]).IsExecuted().Run([function]): "+e,this);if(this.events.some((function(e){return e.identifier>="0"&&e.identifier<="9"}))){var u=this.events.map((function(e){return e.identifier>="0"&&e.identifier<="9"?i(i({},e),{identifier:"num"+e.identifier,key:r.keys["num"+e.identifier]}):e})),d=this.events.map((function(e){return e.identifier>="0"&&e.identifier<="9"?i(i({},e),{identifier:"numpad"+e.identifier,key:r.keys["numpad"+e.identifier]}):e}));return new s.Shortcut({timeline:d,command:"string"==typeof e?e:n||"",handler:"function"==typeof e?e:null,mode:this.mode,timeConstraint:this.timeConstraint,focusTarget:this.focusRequired?this.focusTarget:null}),this.lastCalledFunctionName="Execute()",new s.Shortcut({timeline:u,command:"string"==typeof e?e:n||"",handler:"function"==typeof e?e:null,mode:this.mode,timeConstraint:this.timeConstraint,focusTarget:this.focusRequired?this.focusTarget:null})}return this.lastCalledFunctionName="Execute()",new s.Shortcut({timeline:this.events,command:"string"==typeof e?e:n||"",handler:"function"==typeof e?e:null,mode:this.mode,timeConstraint:this.timeConstraint,focusTarget:this.focusRequired?this.focusTarget:null})},Run:function(e){if(a.warnAboutChainOrder("Run()",this,["IsExecuted()"]),null===this.identifier)throw new a.WhenError("Run() cannot be called before a string key identifier has been passed to When().",this);if("function"!=typeof e)throw new a.WhenError("Run() must be called with a function as its first and only argument.",this);if(!this.isCommand)throw new a.WhenError("Run() must be called after a call to IsExecuted().",this);t.commands[this.identifier]=e,this.lastCalledFunctionName="Run()"}}}t.commands={},t.When=m,m.setMode=u.setMode,m.clearMode=u.clearMode,m.newGroup=d.newGroup,m.quiet=a.setQuiet,m.loadLayout=r.loadLayout,m.documentation=c.documentation,m.setFocus=o.setFocus,t.shouldCheckEvents=!0,m.toggle=function(){t.shouldCheckEvents=!t.shouldCheckEvents},m.pause=function(){t.shouldCheckEvents=!1},m.unpause=function(){t.shouldCheckEvents=!0},t.heldInterval=100,m.setHeldInterval=function(e){if("number"!=typeof e)throw new a.WhenError("When.setHeldInterval() expects to receive a numberic milliseconds value as the first an only argument, but a ["+typeof e+"] was provided.");t.heldInterval=e},m.focusChanges=function(e){if("function"!=typeof e)throw new a.WhenError("When.focusChanges() expects to receive a function as the first an only argument, but a ["+typeof e+"] was provided.");o.focusHandlers.push(e)},m.focusIs=function(e,t){if(!1===Array.isArray(t))throw new a.WhenError("When.focusIs() must receive an array of shortcuts as its second argument, but a "+typeof t+" was received: "+t);e instanceof HTMLElement==!0&&((e=e).classList&&e.classList.contains("when-focus")||a.warn('The element provided to When.focusIs() did not have the "when-focus" class assigned to it.')),t.forEach((function(t){t.focusTarget=e}))},m.modeIs=function(e,t){if(!1===Array.isArray(t))throw new a.WhenError("When.modeIs() must receive an array of shortcuts as its second argument, but a "+typeof t+" was received: "+t);t.forEach((function(t){t.mode=e}))},m.command=function(e,n){if("string"!=typeof e)throw new a.WhenError("When.command did not receive a string command name as the first argument");if("function"!=typeof n)throw new a.WhenError("When.command did not receive a function as the second argument");t.commands[e]=n},m.keyGroups=function(){return r.keyGroups},m.loadLayout("qwerty")},function(e,t,n){"use strict";var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n),Object.defineProperty(e,i,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),r=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.hasOwnProperty.call(e,n)&&i(t,e,n);return r(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.loadLayout=t.validateKeyName=t.keyToString=t.keyStatus=t.keyGroups=t.modifierKeys=t.keys=t.layouts=void 0;var o=n(0),a=s(n(11));t.layouts={qwerty:a},t.keys=null,t.modifierKeys=null,t.keyGroups=null,t.keyStatus={};var u=null;t.keyToString=function(e){var n=[];for(var i in t.keys)t.keys[i]===e&&n.push(i);return n.reduce((function(e,t){return Math.min(e.length,t.length)?e:t}),n[0])||null},t.validateKeyName=function(e,n){if(null!==t.keys&&null!==u){if(!(e>="0"||e<="9"||void 0!==t.keys[e])){var i=u(e);if(i)throw new o.WhenError(""+i,n)}}else console.log("validateKeyName() was called before a layout was loaded")},t.loadLayout=function(e){var n=t.layouts[e];if(!n)throw new o.WhenError("Attempted to load non-existant layout: "+e);t.keys=n.keys,u=n.keySuggestions,t.modifierKeys=n.modifierKeys,t.keyGroups=n.keyGroups,t.keyStatus={},Object.keys(t.keys).forEach((function(e){t.keyStatus[t.keys[e]]={pressed:!1,timestamp:null}}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validateFocusTarget=t.setFocus=t.focusedElement=t.focusHandlers=void 0;var i=n(0);t.focusHandlers=[],t.focusedElement=null,t.setFocus=function(e){if(!e||e instanceof HTMLElement==!1)throw new i.WhenError("When.setFocus() was not provided an HTMLElement as its first argument, received: "+typeof e);if(!1===e.classList.contains("when-focus"))throw new i.WhenError('When.setFocus() was provided an HTMLElement that did not have the "when-focus" class.');var n=t.focusedElement;t.focusedElement=e,t.focusedElement!==n&&t.focusHandlers.forEach((function(e){return e(t.focusedElement,n)}))},window.addEventListener("mousedown",(function(e){if(null!==e.target){var n=t.focusedElement,i=e.target;if(i.classList&&i.classList.contains("when-focus"))t.focusedElement=i;else{for(t.focusedElement=i.parentNode;t.focusedElement&&t.focusedElement.classList&&!t.focusedElement.classList.contains("when-focus");)t.focusedElement=t.focusedElement.parentNode;t.focusedElement&&t.focusedElement.classList||(t.focusedElement=null)}t.focusedElement!==n&&t.focusHandlers.forEach((function(e){return e(t.focusedElement,n)}))}})),t.validateFocusTarget=function(e){var t=0===e.indexOf("id:"),n=0===e.indexOf("class:"),i=0===e.indexOf("#"),r=0===e.indexOf(".");return t||n||i||r}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Shortcut=void 0;var i=n(5),r=n(6),s=n(1),o=n(0),a=n(16),u=n(8),d=function(){function e(t){var n=t.timeline,s=t.command,o=t.handler,d=t.mode,c=t.once,l=t.inInput,h=t.timeConstraint,f=t.focusTarget;this.lastTriggeredEventId=null,this.active=!0,this.preventDefault=!0,this.once=!1,this.inInput=!1,this.timeConstraint=null,this.focusTarget=null,this.id=e.idCounter++,e.map.set(this.id,this),this.timeline=n,this.command=s,this.handler=o,this.mode=d,this.once=c||this.once,this.inInput=l||this.inInput,this.timeConstraint=h||this.timeConstraint,this.focusTarget=f||this.focusTarget,this.combination=a.createCombinationString(this),this.keys=this.timeline.map((function(e){return e.identifier})),this.timeline.forEach((function(e){var t=r.generateEventKeyString(e);if(i.preventDefaultShortcuts.has(t)){var n=i.preventDefaultShortcuts.get(t);i.preventDefaultShortcuts.set(t,n+1)}else i.preventDefaultShortcuts.set(t,1)})),u.addDocumentedShortcut(this)}return e.prototype.remove=function(){e.map.delete(this.id),this.preventDefault&&this.timeline.forEach((function(e){var t=r.generateEventKeyString(e);if(i.preventDefaultShortcuts.has(t)){var n=i.preventDefaultShortcuts.get(t);i.preventDefaultShortcuts.set(t,n-1)}}))},e.prototype.pause=function(){this.active=!1},e.prototype.unpause=function(){this.active=!0},e.prototype.toggle=function(){this.active=!this.active},e.prototype.trigger=function(){if(this.handler)this.handler(void 0);else if(this.command){if("function"!=typeof s.commands[this.command])throw new o.WhenError('command "'+this.command+"\" hasn't been been registered as a function with When([command_name]).Run([function])");s.commands[this.command](void 0)}},e.prototype.Once=function(){return this.once=!0,this},e.prototype.InInput=function(){return this.inInput=!0,this},e.prototype.AllowDefault=function(){return this.timeline.forEach((function(e){var t=r.generateEventKeyString(e);if(i.preventDefaultShortcuts.has(t)){var n=i.preventDefaultShortcuts.get(t);i.preventDefaultShortcuts.set(t,n-1)}})),this.preventDefault=!1,this},e.idCounter=0,e.map=new Map,e}();t.Shortcut=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkPreventDefault=t.preventDefaultShortcuts=void 0;var i=n(6);t.preventDefaultShortcuts=new Map,t.checkPreventDefault=function(e,n){var r=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(!["textarea","input","select","button"].includes(r)){var s=i.generateEventKeyString(e);if(t.preventDefaultShortcuts.has(s))t.preventDefaultShortcuts.get(s)>0&&n.preventDefault()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.generateEventKeyString=void 0,t.generateEventKeyString=function(e){var t=e.modifiers;return(t.alt?"alt":"")+(t.ctrl?"ctrl":"")+(t.meta?"meta":"")+(t.shift?"shift":"")+e.key}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.clearMode=t.setMode=t.currentMode=void 0;var i=n(0);t.currentMode=null,t.setMode=function(e){if("string"!=typeof e)throw new i.WhenError("When.setMode did not receive a string its first argument, received: "+typeof e);t.currentMode=e},t.clearMode=function(){t.currentMode=null}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.documentation=t.addDocumentedShortcut=t.documentedShortcuts=void 0,t.documentedShortcuts=[];var i={};t.addDocumentedShortcut=function(e){var n,r=null===(n=e.focusTarget||"")||void 0===n?void 0:n.toString(),s=e.mode||"";i[e.combination]&&i[e.combination][r]&&i[e.combination][r][s]||(i[e.combination]={}||i[e.combination],i[e.combination][r]={}||i[e.combination][r],i[e.combination][r][s]=!0,t.documentedShortcuts.push(e))},t.documentation=function(){var e=[];return t.documentedShortcuts.forEach((function(t){e.push({mode:t.mode||"",combination:t.combination,command:t.command?t.command:t.handler?"anon func":""})})),e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(10);var i=n(1);t.default=i.When,window.When=i.When},function(e,t,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var i=Array(e),r=0;for(t=0;t<n;t++)for(var s=arguments[t],o=0,a=s.length;o<a;o++,r++)i[r]=s[o];return i};Object.defineProperty(t,"__esModule",{value:!0}),t.emitEvent=t.addNewEvent=t.eventHistory=void 0;var s=n(0),o=n(4),a=n(1),u=n(5),d=n(2),c=n(3),l=n(17),h=n(18),f=n(7),m=0;t.eventHistory=[],t.addNewEvent=function(e){var n=m++;t.eventHistory.push(i(i({},e),{id:n}))};var p=null,y=null;t.emitEvent=function(e){void 0!==e&&t.addNewEvent(e),o.Shortcut.map.forEach((function(e){if(e.active&&(!e.mode||f.currentMode===e.mode)&&h.shortcutFocusIsFulfilled(e)){var n=document.activeElement?document.activeElement.tagName.toLowerCase():"";if(e.inInput||!["textarea","input","select","button"].includes(n)){for(var i=!1,o=r(e.timeline),u=[],d=0;d<t.eventHistory.length&&u.length!==e.timeline.length;d++){var m=o[o.length-1],v=t.eventHistory[t.eventHistory.length-1-d];if(e.lastTriggeredEventId===v.id){i=!0;break}if(0===d){if(!l.checkEventMatch(m,v)){i=!0;break}u.unshift(v),o.pop()}else{var w=u[u.length-1].timestamp-v.timestamp;if(null!==e.timeConstraint&&e.timeConstraint>0&&w>e.timeConstraint){i=!0;break}var g=v.type===m.type;if(g&&l.checkEventMatch(m,v)){u.unshift(v),o.pop();continue}if(g){i=!0;break}}}if(!i&&u.length===e.timeline.length){if(null!==e.timeConstraint&&e.timeConstraint>0){var b=u[0],E=u[u.length-1];if(void 0!==E&&void 0!==b&&E.timestamp-b.timestamp>e.timeConstraint&&(i=!0),i)return}var k=u[u.length-1],I=k.type,_="released"===I?y:p,W={event:_,alt:_.altKey,ctrl:_.ctrlKey,shift:_.shiftKey,meta:_.metaKey,shortcut:e,keys:e.keys,focusedElement:c.focusedElement,pressDuration:"held"===I?k.duration:void 0};if(e.handler)e.handler(W);else if(e.command){if("function"!=typeof a.commands[e.command])throw new s.WhenError('command "'+e.command+"\" hasn't been been registered as a function with When([command_name]).Run([function])");a.commands[e.command](W)}e.once&&e.remove(),e.lastTriggeredEventId=u[u.length-1].id}}}}))},window.addEventListener("keydown",(function(e){if(a.shouldCheckEvents&&null!==d.keys&&null!==d.modifierKeys){var n={type:"pressed",key:e.which,identifier:"",rawIdentifier:"",timestamp:performance.now(),modifiers:{shift:e.shiftKey,alt:e.altKey,ctrl:e.ctrlKey,meta:e.metaKey}};u.checkPreventDefault(n,e),!0!==d.keyStatus[e.which].pressed&&(d.modifierKeys.includes(e.which)||(p=e,t.emitEvent(n)),d.keyStatus[e.which].pressed=!0,d.keyStatus[e.which].timestamp=performance.now())}})),window.addEventListener("keyup",(function(e){if(a.shouldCheckEvents&&null!==d.keys&&null!==d.modifierKeys&&!1!==d.keyStatus[e.which].pressed)if(d.modifierKeys.includes(e.which))d.keyStatus[e.which].pressed=!1,d.keyStatus[e.which].timestamp=null;else{var n={type:"released",key:e.which,identifier:"",rawIdentifier:"",timestamp:performance.now(),modifiers:{shift:e.shiftKey,alt:e.altKey,ctrl:e.ctrlKey,meta:e.metaKey}};y=e,t.emitEvent(n),d.keyStatus[e.which].pressed=!1,d.keyStatus[e.which].timestamp=null}})),function e(){if(null===d.keys)throw new s.WhenError("A layout has not been loaded yet.");a.shouldCheckEvents&&Object.keys(d.keyStatus).forEach((function(e){if(e=Number(e),d.keyStatus[e].pressed&&null!==d.keyStatus[e].timestamp){var n=performance.now()-d.keyStatus[e].timestamp;if(!(n<500)){if(null===d.keys)throw new s.WhenError("A layout has not been loaded yet.");for(var i={shift:d.keyStatus[d.keys.shift].pressed,alt:d.keyStatus[d.keys.alt].pressed,ctrl:d.keyStatus[d.keys.ctrl].pressed,meta:d.keyStatus[d.keys.left_meta].pressed||d.keyStatus[d.keys.right_meta].pressed},r=null,o=t.eventHistory.length-1;o>=0;o--){var a=t.eventHistory[o];if(a.timestamp<d.keyStatus[e].timestamp)break;if(a.key===e)if("held"===a.type)if(a.modifiers.shift===i.shift&&a.modifiers.ctrl===i.ctrl&&a.modifiers.alt===i.alt&&a.modifiers.meta===i.meta){r=o;break}}null!==r?(t.eventHistory[r].duration=n,t.emitEvent()):t.emitEvent({type:"held",key:Number(e),identifier:"",rawIdentifier:"",duration:n,timestamp:performance.now(),modifiers:i})}}})),setTimeout(e,a.heldInterval)}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.keyGroups=t.modifierKeys=t.keySuggestions=t.keys=void 0;var i=n(12);t.keys={ctrl:17,alt:18,shift:16,left_meta:91,meta:91,right_meta:92,escape:27,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,f13:124,f14:125,f15:126,f16:127,f17:128,f18:129,f19:130,scroll_lock:145,pause_break:19,context_menu:93,"`":192,"~":192,grave_accent:192,tilde:192,num1:49,num2:50,num3:51,num4:52,num5:53,num6:54,num7:55,num8:56,num9:57,num0:48,_:189,hyphen:189,underscore:189,"=":187,plus:187,equals:187,backspace:8,tab:9,caps_lock:20,space:32,"[":219,"{":219,left_square_bracket:219,left_curly_bracket:219,"]":221,"}":221,right_square_bracket:221,right_curly_bracket:221,"\\":220,"|":220,backslash:220,pipe:220,";":186,":":186,colon:186,semicolon:186,"'":222,'"':222,apostrophe:222,quote:222,",":188,"<":188,comma:188,less_than:188,">":190,period:190,greater_than:190,"?":191,forward_slash:191,question_mark:191,enter:13,insert:45,home:36,page_up:33,delete:46,end:35,page_down:34,arrow_up:38,up:38,arrow_right:39,right:39,arrow_down:40,down:40,arrow_left:37,left:37,num_lock:144,numpad_divide:111,numpad_multiply:106,numpad_subtract:109,clear:12,numpad_add:107,numpad_decimal:110,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90},i.isFirefox?(t.keys.hyphen=173,t.keys._=173,t.keys.underscore=173,t.keys["="]=61,t.keys["+"]=61,t.keys.equals=61,t.keys.plus=61,t.keys[";"]=59,t.keys[":"]=59,t.keys.semicolon=59,t.keys.colon=59,t.keys.right_meta=91):i.isEdge?t.keys.clear=101:i.isEdgeChromium||i.isIE||i.isOpera||i.isChrome,t.keySuggestions=function(e){switch(e){case".":return'Instead of ".", you must use either "period" or "numpad_decimal", as these are interpreted as two different keys';case"-":return'Instead of "-", you must either use "hyphen" or "numpad_subtract", as these are interpreted as two different keys';case"/":return'Instead of "/", you must either use "forward_slash" or "numpad_divide", as these are interpreted as two different keys';case"*":return'Instead of "*", you must use numpad_multiply, unless you meant to use "num8"';case"+":return'Instead of "+", you must use numpad_add, unless you meant to use "="';case"!":case"@":case"#":case"$":case"%":case"^":case"&":case"(":case")":return'The character "'+e+'" is not recognized, you probably meant to use the other character on that key';default:return'Unrecognized key identifier "'+e+'"'}},t.modifierKeys=[t.keys.alt,t.keys.ctrl,t.keys.left_meta,t.keys.right_meta,t.keys.shift],t.keyGroups={arrowKeys:["arrow_up","arrow_right","arrow_down","arrow_left"],fKeys:["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14","f15","f16","f17","f18","f19"],letters:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],numbers:["1","2","3","4","5","6","7","8","9","0"]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isEdgeChromium=t.isChrome=t.isEdge=t.isIE=t.isSafari=t.isFirefox=t.isOpera=void 0,t.isOpera=!!window.opr&&!!opr.addons||!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,t.isFirefox="undefined"!=typeof InstallTrigger,t.isSafari=/constructor/i.test(window.HTMLElement)||"[object SafariRemoteNotification]"===(!window.safari||"undefined"!=typeof safari&&safari.pushNotification).toString(),t.isIE=!!document.documentMode,t.isEdge=!t.isIE&&!!window.StyleMedia,t.isChrome=!(!window.chrome||!window.chrome.webstore&&!window.chrome.runtime),t.isEdgeChromium=t.isChrome&&-1!=navigator.userAgent.indexOf("Edg")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.newGroup=t.groups=void 0;var i=n(0);t.groups=[],t.newGroup=function(e){if(!1===Array.isArray(e))throw new i.WhenError("When.newGroup() expects to receive an array of shortcuts as its first and only argument, but a ["+typeof e+"] was provided.");return{shortcuts:e,remove:function(){e.forEach((function(e){return e.remove()}))},pause:function(){e.forEach((function(e){return e.pause()}))},unpause:function(){e.forEach((function(e){return e.unpause()}))},toggle:function(){e.forEach((function(e){return e.toggle()}))},trigger:function(){e.forEach((function(e){return e.trigger()}))}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getKeyFromIdentifier=void 0;var i=n(0);t.getKeyFromIdentifier=function(e,t){var n=e.split("+").filter((function(e){return!["shift","alt","ctrl","meta","left_meta","right_meta"].includes(e)}));if(n.length>1)throw new i.WhenError("When: identifier for key contained more than one non-modifier key",t);return n[0]}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getModifiersFromIdentifier=void 0,t.getModifiersFromIdentifier=function(e){var t=e.split("+");return{shift:t.includes("shift"),alt:t.includes("alt"),ctrl:t.includes("ctrl"),meta:t.includes("meta")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createCombinationString=void 0;var i=n(2);t.createCombinationString=function(e){var t=e.timeline.map((function(e){var t=e.modifiers,n=(t.alt?"alt+":"")+(t.ctrl?"ctrl+":"")+(t.meta?"meta+":"")+(t.shift?"shift+":"");switch(e.type){case"pressed":return", ↓"+n+i.keyToString(e.key);case"released":return", ↑"+n+i.keyToString(e.key);case"held":return" (hold "+e.duration/1e3+"s)"}})).join("").slice(2);e.timeConstraint&&(e.timeConstraint<1e3?t+=" (within "+e.timeConstraint+"ms)":t+=" (within "+(e.timeConstraint/1e3).toFixed(2)+"s)");return t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkEventMatch=void 0;var i=n(0);t.checkEventMatch=function(e,t){if(e.key!==t.key||e.type!==t.type)return!1;if(e.modifiers.shift!==t.modifiers.shift||e.modifiers.meta!==t.modifiers.meta||e.modifiers.alt!==t.modifiers.alt||e.modifiers.ctrl!==t.modifiers.ctrl)return!1;if("held"===e.type){if(void 0===t.duration||void 0===e.duration)throw new i.WhenError('"held" event had undefined "duration" property');return!(t.duration<e.duration)}return!0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.shortcutFocusIsFulfilled=void 0;var i=n(3);t.shortcutFocusIsFulfilled=function(e){var t=e.focusTarget;if(null===t)return!0;if(null===i.focusedElement)return!1;if("string"!=typeof t)return t===i.focusedElement;if(t.includes("id:")||t.includes("#")){var n=t.replace("id:","").replace("#","");return i.focusedElement&&i.focusedElement.id===n}if(t.includes("class:")||t.includes(".")){var r=t.replace("class:","").replace(".","");return i.focusedElement&&i.focusedElement.classList&&i.focusedElement.classList.contains(r)}}}])}));