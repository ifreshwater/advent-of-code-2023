const SYMBOL = new RegExp("[^a-zA-Z0-9_.]")
const GEAR = new RegExp("[*]")

function part1(input){
    const map = input.split('\n').map(line => line.trim().split(''))
    // console.log(map)
    const numToSum = []
    const numsFailed = []
    var buffer = ""
    var wasAdjacent = false
    for(var y = 0; y < map.length; y++){
        for(var x = 0; x < map[y].length; x++){
            curr = map[y][x]
            console.log(curr)
            if(curr == "." || SYMBOL.test(curr)){
                console.log(`${map[y][x]} - Symbol or .`)
                if(buffer != ""){
                    if(wasAdjacent){
                        console.log(`sum ${buffer}`)
                        numToSum.push(parseInt(buffer))
                    } else {
                        console.log(`fail ${buffer}`)
                        numsFailed.push(parseInt(buffer))
                    }
                    console.log('buffer reset')
                    buffer = ""
                    wasAdjacent = false
                }
            } else {
                wasAdjacent = wasAdjacent || symbolAdjacent(x,y,map, SYMBOL)
                buffer = buffer.concat(curr)
                console.log(buffer)
            }
        }
    }
    console.log(numToSum)
    console.log(numsFailed)
    return numToSum.reduce((acc, curr) => acc + curr, 0)
}

function part2(input){
    const map = input.split('\n').map(line => line.trim().split(''))
    // console.log(map)
    const numToSum = []
    const numsFailed = []
    var buffer = ""
    var wasAdjacent = false
    var gearLocation = ""
    var gears = {
        // "3,1": [467,35]
    }
    for(var y = 0; y < map.length; y++){
        for(var x = 0; x < map[y].length; x++){
            curr = map[y][x]
            console.log(curr)
            if(curr == "." || GEAR.test(curr)){
                console.log(`${map[y][x]} - Symbol or .`)
                if(buffer != ""){
                    if(wasAdjacent){
                        if(gears.hasOwnProperty(gearLocation)){
                            gears[gearLocation].push(parseInt(buffer))
                        } else {
                            gears[gearLocation] = [parseInt(buffer)]
                        }
                    }
                    buffer = ""
                    wasAdjacent = false
                    gearLocation = ""
                }
            } else {
                isAdjacent = symbolAdjacent(x,y,map,GEAR)
                wasAdjacent = wasAdjacent || isAdjacent
                if(isAdjacent && gearLocation == ""){
                    gearLocation = locateGear(x,y,map,GEAR)
                }
                buffer = buffer.concat(curr)
                console.log(buffer)
            }
        }
    }

    // now get the gear ratios of all gears with 2 adjacents
    var ratios = []
    for(const adj in gears){
        if (gears[adj].length == 2){
            ratios.push(gears[adj][0] * gears[adj][1])
        }
    }
    
    // sum for answer
    return ratios.reduce((acc, curr) => acc + curr, 0)
}



function symbolAdjacent(x,y, arr, regex){
    const adjacent = [
        arr[y-1]?.[x-1], arr[y-1]?.[x], arr[y-1]?.[x+1],
        arr[y]?.[x-1], /*arr[y]?.[x],*/ arr[y]?.[x+1],
        arr[y+1]?.[x-1], arr[y+1]?.[x], arr[y+1]?.[x+1]
    ]
    // console.log(adjacent)
    return adjacent.some(k => regex.test(k))
}

function locateGear(x,y,arr,regex){
    var coords = [
        `${y-1},${x-1}`, `${y-1},${x}`, `${y-1},${x+1}`,
        `${y},${x-1}`, /* y,x*/  `${y},${x+1}`,
        `${y+1},${x-1}`, `${y+1},${x}`, `${y+1},${x+1}`,
    ]

    var index = [
        arr[y-1]?.[x-1], arr[y-1]?.[x], arr[y-1]?.[x+1],
        arr[y]?.[x-1], /*arr[y]?.[x],*/ arr[y]?.[x+1],
        arr[y+1]?.[x-1], arr[y+1]?.[x], arr[y+1]?.[x+1]
    ].indexOf("*")
    return coords[index]
}

function temp(input){
    const map = input.split('\n').map(line => line.trim().split(''))
    return locateGear(2,2,map,GEAR)
}

module.exports = {
    part1,
    part2,
    temp
}