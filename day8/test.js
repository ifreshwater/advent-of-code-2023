const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    // it('works on part 1', () => {
    //     assert.strictEqual(part1(EX_INPUT), 6)
    // });

    // it('solves part 1', () => {
    //     assert.strictEqual(part1(DAY_INPUT), 16531)
    // })

    // it('works on part 2', () => {
    //     const input = `LR

    //     11A = (11B, XXX)
    //     11B = (XXX, 11Z)
    //     11Z = (11B, XXX)
    //     22A = (22B, XXX)
    //     22B = (22C, 22C)
    //     22C = (22Z, 22Z)
    //     22Z = (22B, 22B)
    //     XXX = (XXX, XXX)`
    //     assert.strictEqual(part2(input), 6)
    // })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 8570000)
    })
})