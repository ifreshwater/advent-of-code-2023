const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT), 19114)
    });

    it('solves part 1', () => {
        assert.strictEqual(part1(DAY_INPUT), 398527)
    })

    it('works on part 2', () => {
        // assert.strictEqual(part2(["in{x>2000:gx,A}", "gx{A}"]), 4000**4)
        assert.strictEqual(part2(EX_INPUT), 167409079868000)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 133973513090020)
    })
})