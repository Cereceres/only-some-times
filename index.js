module.exports = (cb, onlySomeTimes = 1) => {
    if (typeof cb !== 'function') throw new Error('Only can wrap functions');
    const cbWrapped = (...args) => {
        if (cbWrapped.cbIsCalled >= onlySomeTimes) return;

        cb(...args);
        cbWrapped.cbIsCalled++;
    };
    cbWrapped.cbIsCalled = 0;

    return cbWrapped;
};
