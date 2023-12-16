const DEBUG = false

// 0bUDLR
function dirToBin(dir){
    if(dir[1] == -1) return 0b1000;
    if(dir[1] ==  1) return 0b0100;
    if(dir[0] == -1) return 0b0010;
    if(dir[0] ==  1) return 0b0001;
}

function handleBeam(x, y, dir, inputMap, energizeMap){
    if (DEBUG) console.log(`(${x}, ${y})`)
    // out of bounds
    if(energizeMap[y] == undefined){
        if (DEBUG) console.log(`beam out of vertical range (${x},${y})`)
        return
    }
    if(energizeMap[y][x] == undefined){
        if (DEBUG) console.log(`beam out of horizontal range (${x},${y})`)
        return
    }

    const dirBinary = dirToBin(dir)
    // test if we've gone this dir
    if(energizeMap[y][x] & dirBinary) {
        return
    }

    // set direction
    if(energizeMap[y][x] == 0) {
        energizeMap[y][x] |= dirToBin(dir)
    } 
    
    if (DEBUG) console.log(`energized (${x}, ${y}) ${inputMap[y]?.[x]}`)

    if (DEBUG) renderMap(energizeMap)
    switch(inputMap[y][x]){
        case '|':
            if(dir[0] != 0){
                if (DEBUG) console.log('beam split |')
                handleBeam(x, y-1, [0,-1], inputMap, energizeMap)
                handleBeam(x, y+1, [0,1], inputMap, energizeMap)
                break;
            } else {
                handleBeam(x+dir[0], y+dir[1], dir, inputMap, energizeMap)
                break;
            }

        case '-':
            if(dir[1] != 0){
                if (DEBUG) console.log('beam split <=>')
                handleBeam(x-1, y, [-1,0], inputMap, energizeMap)
                handleBeam(x+1, y, [1,0], inputMap, energizeMap)
                break;
            } else {
                handleBeam(x+dir[0], y+dir[1], dir, inputMap, energizeMap)
                break;
            }
        case '/':
            if(dir[0] == 1){ // =>
                if (DEBUG) console.log(`${inputMap[y][x]} in =>  /  out ^`)
                handleBeam(x, y-1, [0,-1], inputMap, energizeMap) // Up
                break;
            } else if(dir[0] == -1){ // <=
                if (DEBUG) console.log(`${inputMap[y][x]} in <=  /  out v`)
                handleBeam(x, y+1, [0,1], inputMap, energizeMap) // Down
                break;
            } else if(dir[1] == 1) { // V
                if (DEBUG) console.log(`${inputMap[y][x]} in v  /  out <=`)
                handleBeam(x-1, y, [-1,0], inputMap, energizeMap) // Left
                break;
            } else if(dir[1] == -1) { // ^
                if (DEBUG) console.log(`${inputMap[y][x]} in ^  /  out =>`)
                handleBeam(x+1, y, [1,0], inputMap, energizeMap) // Right
                break;
            }
            break;
        case '\\':
            if(dir[0] == 1){ // =>
                if (DEBUG) console.log(`${inputMap[y][x]} in =>  \\  out v`)
                handleBeam(x, y+1, [0,1], inputMap, energizeMap) // Down
                break;
            } else if(dir[0] == -1){ // <=
                if (DEBUG) console.log(`${inputMap[y][x]} in <=  \\  out ^`)
                handleBeam(x, y-1, [0,-1], inputMap, energizeMap) // Up
                break;
            } else if(dir[1] == 1) { // V
                if (DEBUG) console.log(` in v  \\  out =>`)
                handleBeam(x+1, y, [1,0], inputMap, energizeMap) // Right
                break;
            } else if(dir[1] == -1) { // ^
                if (DEBUG) console.log(`${inputMap[y][x]} in ^  \\  out <=`)
                handleBeam(x-1, y, [-1,0], inputMap, energizeMap) // Left
                break;
            }
            break;
        case '.':
            handleBeam(x+dir[0], y+dir[1], dir, inputMap, energizeMap)
            break;
        default:
            return
    }
}

function renderMap(map){
    console.log(map.map(l => l.join('')).join('\n'))
}

function part1(input){

    const energizeMap = []
    for(const i in input){
        energizeMap.push(Array(input[0].length).fill('0'))
    }

    renderMap(input)

    console.log('\nbefore')
    renderMap(energizeMap)

    handleBeam(0,0,[1,0], input, energizeMap)

    console.log('\nafter')
    renderMap(energizeMap)

    return energizeMap.reduce((acc, cur) => acc + cur.reduce((accRow, c) => c!=0 ? accRow + 1 : accRow, 0),0)
}

function initMap(input){
    const energizeMap = []
    for(const i in input){
        energizeMap.push(Array(input[0].length).fill('0'))
    }

    return energizeMap
}

function getEnergizedCount(input, x, y, dir){
    const energizeMap = initMap(input)

    handleBeam(x,y,dir, input, energizeMap)

    if(DEBUG) console.log('\nafter')
    if(DEBUG) renderMap(energizeMap)

    return energizeMap.reduce((acc, cur) => acc + cur.reduce((accRow, c) => c!=0 ? accRow + 1 : accRow, 0),0)
}

function part2(input){
    renderMap(input)
    const counts = []
    const width = input[0].length
    const height = input.length
    // get all the edge energizations
    for(var x = 0; x < width; x++){
        counts.push(getEnergizedCount(input, x, 0, [0,1]))
        counts.push(getEnergizedCount(input, x, height-1, [0,-1]))

    }
    for(var y = 0; y < height; y++){
        counts.push(getEnergizedCount(input, 0, y, [1,0]))
        counts.push(getEnergizedCount(input, width-1, y, [-1,0]))
    }
    console.log(counts)
    return Math.max(...counts)
}

module.exports = {
    part1,
    part2
}