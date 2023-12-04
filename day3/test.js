const assert = require('node:assert');

const {part1, part2, temp} = require('./day3')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 3: Gear Ratios', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT), 4361)
    });

    it('solves part 1', () => {

        assert.strictEqual(part1(DAY_INPUT), 530495)
    })

    it('works on part 2', () => {
        assert.strictEqual(part2(EX_INPUT), 467835)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 75561)
    })
})