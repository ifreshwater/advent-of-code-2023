const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT,2), 374)
    });

    it('solves part 1', () => {
        assert.strictEqual(part1(DAY_INPUT,2), 9795148)
    })

    it('works on part 2', () => {
        assert.strictEqual(part1(EX_INPUT,10), 1030)
        assert.strictEqual(part1(EX_INPUT,100), 8410)
    })

    it('solves part 2', () => {
        assert.strictEqual(part1(DAY_INPUT,1000000), 8570000)
    })
})