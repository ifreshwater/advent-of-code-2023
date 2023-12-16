const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT.map(l => l.split(''))), 46)
    });

    it('solves part 1', () => {
        assert.strictEqual(part1(DAY_INPUT.map(l => l.split(''))), 7608)
    })

    it('works on part 2', () => {
        assert.strictEqual(part2(EX_INPUT.map(l => l.split(''))), 51)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT.map(l => l.split(''))), 8221)
    })
})