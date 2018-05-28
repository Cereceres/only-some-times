const joi = require('joi');

module.exports = function(cb, onlySomeTimes, schema) {
    const self = this;
    const cbWrapped = (...args) => {
        if (cbWrapped.cbIsCalled >= onlySomeTimes) return;

        const { error } = joi.validate(args, schema);

        if (error) throw error;

        cb.call(self, ...args, cbWrapped.cbIsCalled++);
    };
    cbWrapped.cbIsCalled = 0;

    return cbWrapped;
};
