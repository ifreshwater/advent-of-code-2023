const assert = require('node:assert');

const {part1, part2} = require('./day5')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 5: Gear Ratios', () => {
    // it('works on part 1', () => {
    //     assert.strictEqual(part1(EX_INPUT), 35)
    // });

    // it('solves part 1', () => {
    //     assert.strictEqual(part1(DAY_INPUT), 23847)
    // })

    it('works on part 2', () => {
        assert.strictEqual(part2(EX_INPUT), 46)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 100165128)
    })
})