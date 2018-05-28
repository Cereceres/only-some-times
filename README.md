# only-some-times
wrap function to be spied if called some times

# Usage

```js
const wrapper = require('only-some-times');
let called = 0;
const wrapped = wrapper(() => called++, 3);
wrapped();
wrapped();
wrapped();
wrapped();
wrapped();
assert(called === 3);
wrapped.cbIsCalled === 3 // true
```
 
