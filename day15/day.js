function calculateHASHvalue(unit){
    let value = 0
    for(const char of unit){
        value += char.charCodeAt()
        value *= 17
        value = value % 256
    }
    return value
}

function part1(input){
    const sequence = input.join('').split(',')
    return sequence.map(unit => calculateHASHvalue(unit)).reduce((acc, cur) => acc + cur, 0)
}
function part2(input){
    const sequence = input.join('').split(',')
    const boxes = Array(256)

    for(const unit of sequence){
        const [_, label, op, lens] = unit.match(/(\w+)([-=])(\d?)/)
        const hashVal = calculateHASHvalue(label)
        if(boxes[hashVal] == undefined){
            boxes[hashVal] = new Map()
        }
        if(op == "="){
            boxes[hashVal].set(label, parseInt(lens))
        } else {
            boxes[hashVal].delete(label)
        }
    }
    var focusPower = 0
    for(const i in boxes){
        if(boxes[i]){
            var slot = 1
            console.log(`box ${i}`)
            boxes[i].forEach((v, k, m) => {
                const power = ((parseInt(i)+1) * slot * v)
                focusPower += power
                console.log(`v ${v} k ${k} power ${power} slot ${slot} focus ${focusPower}`)
                slot++
            })           
        }
    }
    return focusPower
}

module.exports = {
    part1,
    part2,
    calculateHASHvalue
}