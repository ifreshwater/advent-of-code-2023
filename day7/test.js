const assert = require('node:assert');

const {part1, part2} = require('./day')
const {EX_INPUT, DAY_INPUT} = require('./inputs')

describe('Day 7: Camel Cards', () => {
    it('works on part 1', () => {
        assert.strictEqual(part1(EX_INPUT), 6440)
    });

    it('solves part 1', () => {
        assert.strictEqual(part1(DAY_INPUT), 250898830)
    })

    it('works on part 2', () => {
        assert.strictEqual(part2(EX_INPUT), 5905)
    })

    it('solves part 2', () => {
        assert.strictEqual(part2(DAY_INPUT), 252127335)
    })
})