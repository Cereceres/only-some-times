const joi = require('joi');

module.exports = function({cb, onlySomeTimes, schema, inBadParams}) {
    const self = this;
    const cbWrapped = (...args) => {
        if (cbWrapped.cbIsCalled >= onlySomeTimes) return;

        const { error } = joi.validate(args, schema);

        if (error) return inBadParams(error, ...args);

        return cb.call(self, ...args, cbWrapped.cbIsCalled++);
    };
    cbWrapped.cbIsCalled = 0;

    return cbWrapped;
};
