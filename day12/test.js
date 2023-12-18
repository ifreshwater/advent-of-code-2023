const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(`#.#.### 1,1,3
        .#...#....###. 1,1,3
        .#.###.#.###### 1,3,1,6
        ####.#...#... 4,1,1
        #....######..#####. 1,6,5
        .###.##....# 3,2,1`.split("\n").map(l => l.trim())), 13)
    });

    // it('solves part 1', () => {
    //     assert.strictEqual(part1(DAY_INPUT), 23847)
    // })

    // it('works on part 2', () => {
    //     assert.strictEqual(part2(EX_INPUT), 30)
    // })

    // it('solves part 2', () => {
    //     assert.strictEqual(part2(DAY_INPUT), 8570000)
    // })
})