# only-some-times
wrap function to be spied if called some times, return the same value like other function and accept the same arguments

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

// you can use the reset, to set counter to zero again
const wrapped = wrapper(() => called++, 3);
wrapped();
wrapped();
wrapped();
wrapped();
wrapped();
assert(called === 3);
assert(wrapped.cbIsCalled === 3);
wrapped.reset();
wrapped();
wrapped();
wrapped();
assert(called === 6);
assert(wrapped.cbIsCalled === 3);

// you can pass a joi schema to validate arguments
const schema  = joi.object().keys({
    0: joi.array()
})
const wrapped = wrapper(() => called++, 3, schema);
try {
    wrapped('string');
} catch (error) {
    // error is a joi error
}
```

# API onlySomeTimes(cb,[times, joiSchema, errorHandlerBadParams]) -> cbWrapped

If joiSchema is given the arguments is validated before the cb is called, if there are any error in validate params and errorHandlerBadParams is not given the error is thrown.

## onlySomeTimes.cbIsCalled -> number
number <= times
## onlySomeTimes.reset() -> onlySomeTimes
reset the cbIsCalled to zero