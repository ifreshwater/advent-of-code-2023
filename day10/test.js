const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 4: Gear Ratios', () => {
    // it('works on part 1', () => {
    //     const shortLoop = `-L|F7
    //     7S-7|
    //     L|7||
    //     -L-J|
    //     L|-JF`.split("\n").map(l => l.trim())
    //     const complexLoop = `7-F7-
    //     .FJ|7
    //     SJLL7
    //     |F--J
    //     LJ.LJ`.split("\n").map(l => l.trim())
    //     assert.strictEqual(part1(shortLoop), 4)
    //     assert.strictEqual(part1(complexLoop), 8)
    // });

    // it('solves part 1', () => {
    //     assert.strictEqual(part1(DAY_INPUT), 23847)
    // })

    it('works on part 2', () => {
        const map3 = `...........
        .S-------7.
        .|F-----7|.
        .||.....||.
        .||.....||.
        .|L-7.F-J|.
        .|..|.|..|.
        .L--J.L--J.
        ...........`.split('\n').map(l => l.trim())
        assert.strictEqual(part2(map3), 4)
        
        const map4 = `.F----7F7F7F7F-7....
        .|F--7||||||||FJ....
        .||.FJ||||||||L7....
        FJL7L7LJLJ||LJ.L-7..
        L--J.L7...LJS7F-7L7.
        ....F-J..F7FJ|L7L7L7
        ....L7.F7||L7|.L7L7|
        .....|FJLJ|FJ|F7|.LJ
        ....FJL-7.||.||||...
        ....L---J.LJ.LJLJ...`.split('\n').map(l => l.trim())
        assert.strictEqual(part2(map4), 8)
    })

    // it('solves part 2', () => {
    //     assert.strictEqual(part2(DAY_INPUT), 407)
    // })
})