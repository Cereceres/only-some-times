const joi = require('joi');

module.exports = function({ cb, onlySomeTimes }) {
    const self = this;
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
