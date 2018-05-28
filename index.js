const validate = require('./lib/cb-with-schema');

module.exports = function(cb, onlySomeTimes = 1, schema) {
    const self = this;
    if (typeof cb !== 'function') throw new Error('Only can wrap functions');

    if (schema) return validate(cb, onlySomeTimes, schema);
    const cbWrapped = function(...args) {
        if (cbWrapped.cbIsCalled >= onlySomeTimes) return;

        cb.call(self, ...args, cbWrapped.cbIsCalled++);
    };
    cbWrapped.cbIsCalled = 0;
    return cbWrapped;
};
