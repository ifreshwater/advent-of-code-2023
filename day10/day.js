const DIRECTIONS = {
    // [X, Y]
    N: [0,-1], // ^
    S: [0, 1], // V
    E: [1, 0], // =>
    W: [-1, 0] // <=
}

const OPPOSITE_DIR = {
    N: 'S',
    S: 'N',
    E: 'W',
    W: 'E'
}
const PIPES = {
    "|": [DIRECTIONS.N, DIRECTIONS.S],
    "-": [DIRECTIONS.E, DIRECTIONS.W],
    "L": [DIRECTIONS.N, DIRECTIONS.E],
    "J": [DIRECTIONS.N, DIRECTIONS.W],
    "7": [DIRECTIONS.S, DIRECTIONS.W],
    "F": [DIRECTIONS.S, DIRECTIONS.E],
    ".": [],
}
const PIPES_VISUAL = {
    "|": "|",
    "-": "-",
    "L": "⌎",
    "J": "⌏",
    "7": "⌍",
    "F": "⌌",
    ".": [],
}
const PIPES_DEBUG = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    "L": ["N", "E"],
    "J": ["N", "W"],
    "7": ["S", "W"],
    "F": ["S", "E"],
    ".": [],
}

function findS(lines){
    let y = 0
    for(y = 0; y < lines.length; y++){
        if(lines[y].includes('S')){
            return [lines[y].indexOf('S'),y]
        }
    }
    return [-1,-1]
}

function getSDirs(lines, sX, sY){
    const up = PIPES_DEBUG[lines[sY-1][sX]]
    const left = PIPES_DEBUG[lines[sY][sX-1]]
    const down = PIPES_DEBUG[lines[sY+1][sX]]
    const right = PIPES_DEBUG[lines[sY][sX+1]]
    console.log(` ${lines[sY-1][sX]} 
${lines[sY][sX-1]}S${lines[sY][sX+1]}
 ${lines[sY+1][sX]} `)
    const sDirections = []
    if(up?.includes('S')){
        sDirections.push('N')
    }
    if(down?.includes('N')){
        sDirections.push('S')
    }
    if(left?.includes('E')){
        sDirections.push('W')
    }
    if(right?.includes('W')){
        sDirections.push('E')
    }
    console.log(sDirections)
    return sDirections
}

function part1(input){
    var modifiedMap = input.map(l => l.split(''))
    modifiedMap[0][0]= "W"
    const [sX, sY] = findS(input)
    console.log(`${sX}, ${sY}`)
    if(sX == -1 && sY == -1) throw "S not found"
    var [dir1, dir2] = getSDirs(input, sX, sY)

    let steps = 1
    let d1x = sX + DIRECTIONS[dir1][0]
    let d1y = sY + DIRECTIONS[dir1][1]
    let d2x = sX + DIRECTIONS[dir2][0]
    let d2y = sY + DIRECTIONS[dir2][1]
    modifiedMap[d1y][d1x] = steps
    modifiedMap[d2y][d2x] = steps
    console.log(`D1: ${input[d1y][d1x]} (${d1x}, ${d1y}) D2: ${input[d2y][d2x]} (${d2x}, ${d2y})`)
    dir1 = PIPES_DEBUG[input[d1y][d1x]].find(d => d != OPPOSITE_DIR[dir1])
    dir2 = PIPES_DEBUG[input[d2y][d2x]].find(d => d != OPPOSITE_DIR[dir2])
    console.log(`dir1: ${dir1} dir2: ${dir2}`)
    while(!(d1x == d2x && d1y == d2y)){
        d1x = d1x + DIRECTIONS[dir1][0]
        d1y = d1y + DIRECTIONS[dir1][1]
        d2x = d2x + DIRECTIONS[dir2][0]
        d2y = d2y + DIRECTIONS[dir2][1]
        modifiedMap[d1y][d1x] = steps % 10
        modifiedMap[d2y][d2x] = steps % 10
        console.log(`D1: ${input[d1y][d1x]} (${d1x}, ${d1y}) D2: ${input[d2y][d2x]} (${d2x}, ${d2y})`)
        dir1 = PIPES_DEBUG[input[d1y][d1x]].find(d => d != OPPOSITE_DIR[dir1])
        dir2 = PIPES_DEBUG[input[d2y][d2x]].find(d => d != OPPOSITE_DIR[dir2])
        console.log(`dir1: ${dir1} dir2: ${dir2}`)
        steps++
    }
    console.log(`END D1: ${input[d1y][d1x]} (${d1x}, ${d1y}) D2: ${input[d2y][d2x]} (${d2x}, ${d2y})`)
    console.log((d1x != d2x) && (d1y != d2y))

    console.log(modifiedMap.map(l => l.join('')).join("\n"))
    return steps

}
function part2(input){
    var modifiedMap = input.map(l => l.split(''))
    var visualizedMap = input.map(l => l.split(''))
    const [sX, sY] = findS(input)
    console.log(`${sX}, ${sY}`)
    if(sX == -1 && sY == -1) throw "S not found"
    var [dir1, dir2] = getSDirs(input, sX, sY)

    if(dir1 == 'N' || dir2 == 'N'){
        modifiedMap[sY][sX] = '!'
    } else {
        modifiedMap[sY][sX] = '_'
    }

    let steps = 0
    let d1x = sX
    let d1y = sY
    let d2x = sX
    let d2y = sY
    while(!(d1x == d2x && d1y == d2y && d1x != sX)){
        d1x = d1x + DIRECTIONS[dir1][0]
        d1y = d1y + DIRECTIONS[dir1][1]
        d2x = d2x + DIRECTIONS[dir2][0]
        d2y = d2y + DIRECTIONS[dir2][1]
        modifiedMap[d1y][d1x] = PIPES_DEBUG[input[d1y][d1x]].includes('N') ? '!' : '_'
        modifiedMap[d2y][d2x] = PIPES_DEBUG[input[d2y][d2x]].includes('N') ? '!' : '_'
        visualizedMap[d1y][d1x] = PIPES_VISUAL[input[d1y][d1x]]
        visualizedMap[d2y][d2x] = PIPES_VISUAL[input[d2y][d2x]]
        console.log(`D1: ${input[d1y][d1x]} (${d1x}, ${d1y}) D2: ${input[d2y][d2x]} (${d2x}, ${d2y})`)
        dir1 = PIPES_DEBUG[input[d1y][d1x]].find(d => d != OPPOSITE_DIR[dir1])
        dir2 = PIPES_DEBUG[input[d2y][d2x]].find(d => d != OPPOSITE_DIR[dir2])
        console.log(`dir1: ${dir1} dir2: ${dir2}`)
    }
    console.log(`END D1: ${input[d1y][d1x]} (${d1x}, ${d1y}) D2: ${input[d2y][d2x]} (${d2x}, ${d2y})`)
    console.log((d1x != d2x) && (d1y != d2y))

    console.log(modifiedMap.map(l => l.join('')).join("\n"))
    console.log()
    var inSpace = 0
    modifiedMap.forEach((line, mapIdx) => {
        line.forEach((curr, idx) => {
            if (curr == '!' || curr == "_"){
                // nothing
            } else {
                const bookends = line.slice(0,idx).filter(c => c == '!').length
                if ( bookends % 2 == 1) {
                    modifiedMap[mapIdx][idx] = "I"
                    visualizedMap[mapIdx][idx] = '.'
                    inSpace += 1
                } else {
                    visualizedMap[mapIdx][idx] = ' '
                }
            }
        }, 0)
    })
    console.log()
    console.log(modifiedMap.map(l => l.join('')).join("\n"))
    console.log()
    console.log(visualizedMap.map(l => l.join('')).join("\n"))
    
    return inSpace
}

module.exports = {
    part1,
    part2
}