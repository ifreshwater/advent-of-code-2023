const assert = require('node:assert');

const {part1, part2} = require('./day2')
const {EX_INPUT, DAY_INPUT} = require('./inputs')


describe('Day 2: Cube Conundrum', () => {
    it('works on part 1', () => {
        const cubes = {red: 12, green: 13, blue: 14}

        assert.strictEqual(part1(EX_INPUT, cubes), 8)
    });

    it('solves part 1', () => {
        const cubes = {red: 12, green: 13, blue: 14}
        
        assert.strictEqual(part1(DAY_INPUT, cubes), 2795)
    })

    it('works on day 2', () => {
        assert.strictEqual(part2(EX_INPUT), 2286)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 75561)
    })
})