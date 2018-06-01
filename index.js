const validating = require('./lib/cb-with-schema');
const withoutSchema = require('./lib/cb-without-schema');
const defaultHandlerError = (error) => {
    throw error;
};
module.exports = function(cb, onlySomeTimes = 1, schema, inBadParams) {
    if (typeof cb !== 'function') throw new Error('Only can wrap functions');
    if (typeof inBadParams !== 'function') inBadParams = defaultHandlerError;
    if (onlySomeTimes === 0 && !schema) return cb;
    if (schema) return validating.call(this, { cb, onlySomeTimes, schema });
    return withoutSchema.call(this, { cb, onlySomeTimes });
};
