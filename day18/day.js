// Function that returns true if
// the given pixel is valid
function isValid(screen, m, n, x, y, prevC, newC)
{
    if(x<0 || x>= m || y<0 || y>= n || screen[x][y]!= prevC
        || screen[x][y]== newC)
        return false;
    return true;
}


// FloodFill function
function floodFill(screen, m, n, x, y, prevC, newC)
{
    let queue = [];

    // Append the position of starting
    // pixel of the component
    queue.push([x, y]);

    // Color the pixel with the new color
    screen[x][y] = newC;

    // While the queue is not empty i.e. the
    // whole component having prevC color
    // is not colored with newC color
    while(queue.length > 0)
    {
        // Dequeue the front node
        currPixel = queue[queue.length - 1];
        queue.pop();

        let posX = currPixel[0];
        let posY = currPixel[1];

        // Check if the adjacent
        // pixels are valid
        if(isValid(screen, m, n, posX + 1, posY, prevC, newC))
        {
            // Color with newC
            // if valid and enqueue
            screen[posX + 1][posY] = newC;
            queue.push([posX + 1, posY]);
        }

        if(isValid(screen, m, n, posX-1, posY, prevC, newC))
        {
            screen[posX-1][posY]= newC;
            queue.push([posX-1, posY]);
        }

        if(isValid(screen, m, n, posX, posY + 1, prevC, newC))
        {
            screen[posX][posY + 1]= newC;
            queue.push([posX, posY + 1]);
        }

        if(isValid(screen, m, n, posX, posY-1, prevC, newC))
        {
            screen[posX][posY-1]= newC;
            queue.push([posX, posY-1]);
        }
    }
}



function drawMapFromVertices(vertices){
    const minX = Math.min(...vertices.map(v => v[0]))
    const maxX = Math.max(...vertices.map(v => v[0]))
    const minY = Math.min(...vertices.map(v => v[1]))
    const maxY = Math.max(...vertices.map(v => v[1]))

    console.log(`X: ${minX} => ${maxX}\nY: ${minY} => ${maxY}`)
    const offsetY = 0-minY
    const offsetX = 0-minX


    const theMap = new Array(maxY-minY+1).fill(0).map(() => new Array(maxX-minX+1).fill('.'));

    console.log(`width: ${theMap[0].length} height: ${theMap.length}`)
    console.log(`offset: x ${offsetX} y ${offsetY}`)

    for(var idx = 1; idx < vertices.length; idx++){
        const v1 = vertices[idx-1]
        const v2 = vertices[idx]
        if(v1[0] == v2[0]){ //Y traversal
            const x = v1[0]+offsetX
            const yStart = Math.min(v1[1], v2[1])+offsetY
            const yEnd = Math.max(v1[1], v2[1])+offsetY
            console.log(`${v1} ${v2} => painting Y from ${yStart} to ${yEnd} along ${x}`)
            for(var y = yStart; y <= yEnd; y++){
                theMap[y][x] = "#"
            }
        }
        if(v1[1] == v2[1]){ //X traversal
            const y = v1[1]+offsetY
            const xStart = Math.min(v1[0], v2[0])+offsetX
            const xEnd = Math.max(v1[0], v2[0])+offsetX
            console.log(`${v1} ${v2} => painting X from ${xStart} to ${xEnd} along ${y}`)
            for(var x = xStart; x <= xEnd; x++){
                theMap[y][x] = "#"
            }
        }
    }

    return theMap
}

function areaCalc(theMap){
    var area = 0
    theMap.forEach((line, y) => {
        area += line.filter(c => c == "#" || c == "x").length
    })
    return area
}

function renderMap(map){
    console.log(map.map(l => l.join('')).join('\n'))
    console.log()
}

function part1(input, fillx, filly){
    const vertices = [[0,0]]
    var currentCoords = [0,0]
    for(const line of input){
        const [_, dir, lenStr] = line.match(/([UDLR]) (\d+)/)
        const len = parseInt(lenStr)
        switch(dir){
            case 'U':
                currentCoords = [currentCoords[0], currentCoords[1]-len]
                vertices.push([...currentCoords])
                break;
            case 'D':
                currentCoords = [currentCoords[0], currentCoords[1]+len]
                vertices.push([...currentCoords])
                break;
            case 'L':
                currentCoords = [currentCoords[0]-len, currentCoords[1]]
                vertices.push(currentCoords)
                break;
            case 'R':
                currentCoords = [currentCoords[0]+len, currentCoords[1]]
                vertices.push(currentCoords)
                break;
            default:
                throw `Unknown direction ${dir}`
        }

    }
    console.log(vertices)
    const theMap = drawMapFromVertices(vertices)
    // renderMap(theMap)
    
    floodFill(theMap, theMap.length, theMap[0].length, fillx, filly, '.', 'x')
    renderMap(theMap)

    const area = areaCalc(theMap)
    return area
}

// this isnt happening
// representation not compatible with the huge ass new numbers as expected
function part2(input){
    const vertices = [[0,0]]
    var currentCoords = [0,0]
    for(const line of input){
        const [_, lenStr, dir] = line.match(/.*\(#([a-f0-9]{5})([0-3])/)
        const len = parseInt(lenStr, 16)
        switch(dir){
            case '3': //U
                currentCoords = [currentCoords[0], currentCoords[1]-len]
                vertices.push([...currentCoords])
                break;
            case '1': //D
                currentCoords = [currentCoords[0], currentCoords[1]+len]
                vertices.push([...currentCoords])
                break;
            case '2': // L
                currentCoords = [currentCoords[0]-len, currentCoords[1]]
                vertices.push(currentCoords)
                break;
            case '0': // R
                currentCoords = [currentCoords[0]+len, currentCoords[1]]
                vertices.push(currentCoords)
                break;
            default:
                throw `Unknown direction ${dir}`
        }

    }
    // console.log(vertices)
    const theMap = drawMapFromVertices(vertices)
    // renderMap(theMap)
    
    floodFill(theMap, theMap.length, theMap[0].length, fillx, filly, '.', 'x')
    // renderMap(theMap)

    const area = areaCalc(theMap)
    return area
}

module.exports = {
    part1,
    part2
}