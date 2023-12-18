const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    // it('works on part 1', () => {
    //     assert.strictEqual(part1(EX_INPUT), 62)
    // });

    // it('solves part 1', () => {
    //     assert.strictEqual(part1(DAY_INPUT, 292, 194), 48652)
    //     // console.log(part1(`D 4
    //     // L 6
    //     // U 2
    //     // L 2
    //     // U 2
    //     // R 4
    //     // D 2
    //     // R 2
    //     // U 2
    //     // R 2`.split("\n"),1,1))

    //     // console.log(part1(`U 20
    //     // L 40
    //     // D 20
    //     // R 20
    //     // D 20
    //     // R 60
    //     // U 40
    //     // L 20
    //     // D 20
    //     // L 20`.split('\n'), 1, 1))
    // })

    it('works on part 2', () => {
        assert.strictEqual(part2(EX_INPUT, 1,1), 952408144115)
    })

    // it('solves part 2', () => {
    //     assert.strictEqual(part2(DAY_INPUT), 8570000)
    // })
})