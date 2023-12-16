const assert = require('node:assert');

const {part1, part2, calculateHASHvalue} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT), 1320)
    });

    it('solves part 1', () => {
        assert.strictEqual(part1(DAY_INPUT), 515210)
    })

    it('works on part 2', () => {
        assert.strictEqual(calculateHASHvalue('rn'), 0)
        assert.strictEqual(calculateHASHvalue('cm'), 0)
        assert.strictEqual(calculateHASHvalue('qp'), 1)
        assert.strictEqual(part2(EX_INPUT), 145)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 246762)
    })
})