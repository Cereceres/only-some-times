const validating = require('./lib/cb-with-schema');
const defaultHandlerError = (error) => {
    throw error
}
module.exports = function(cb, onlySomeTimes = 1, schema, inBadParams) {
    const self = this;
    if (typeof cb !== 'function') throw new Error('Only can wrap functions');
    if (typeof inBadParams !== 'function') inBadParams = defaultHandlerError
    if (onlySomeTimes === 0) onlySomeTimes = Infinity;
    if (schema) return validating({cb, onlySomeTimes, schema});

    const cbWrapped = (...args) => {
        if (cbWrapped.cbIsCalled >= onlySomeTimes) return;

        return cb.call(self, ...args, cbWrapped.cbIsCalled++);
    };
    cbWrapped.cbIsCalled = 0;
    cbWrapped.reset = () => {
        cbWrapped.cbIsCalled = 0;
        return cbWrapped;
    };
    return cbWrapped;
};
