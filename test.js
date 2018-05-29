const assert = require('assert');
const wrapper = require('./index');
const joi = require('joi')
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
        assert(wrapped.cbIsCalled === 3);
    });

    it('should return a function', () => {
        try {
            wrapper({}, 3);
        } catch (error) {
            assert(error);
        }
    });

    it('should return a function', () => {
        let called = 0;
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
    });

    it('should return a function', (done) => {
        let called = 0;
        const schema  = joi.object().keys({
            0: joi.array()
        })
        const wrapped = wrapper(() => called++, 3, schema);
        try {
            wrapped('string');
        } catch (error) {
            done()
        }
    });
});
