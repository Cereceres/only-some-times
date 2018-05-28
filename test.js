const assert = require('assert');

const wrapper = require('./index');

describe('test to wrapper', () => {
    it('should return a function', () => {
        let called = 0;
        const wrapped = wrapper(() => called++, 3);
        wrapped();
        wrapped();
        wrapped();
        wrapped();
        wrapped();
        assert(called === 3);
    });

    it('should return a function', () => {
        try {
            wrapper({}, 3);
        } catch (error) {
            assert(error);
        }
    });
});
