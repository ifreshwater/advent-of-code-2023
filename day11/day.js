function part1(input, expansion){

    spaceMap = input.map(l => l.split(''));
    const SPACE_EXPANSION = expansion

    const spaceX = Array(spaceMap[0].length)
    const spaceY = Array(spaceMap.length)

    const galaxies = []
    // get spaceY values
    spaceMap.forEach((row, rowY) => {
        if(row.includes('#')){
            spaceY[rowY] = 1
            let galaxyX = row.indexOf('#')
            while (galaxyX !== -1){
                galaxies.push([galaxyX, rowY])
                galaxyX = row.indexOf('#', galaxyX + 1)
            }
        } else {
            spaceY[rowY] = SPACE_EXPANSION
        }
    })

    for(var colX = 0; colX < spaceX.length; colX++){
        const col = spaceMap.map(r => r[colX])
        spaceX[colX] = col.includes("#") ? 1 : SPACE_EXPANSION
    }

    // console.log(galaxies)

    function scaledAxis(axis){
        var total = 0
        return axis.map(e =>{
            total += e
            return total
        })
    }

    const scaledX = scaledAxis(spaceX)
    const scaledY = scaledAxis(spaceY)

    // console.log(scaledX)
    // console.log(scaledY)

    const galaxyPairs = galaxies.flatMap((g1, i)=> galaxies.slice(i+1).map(g2=> [g1, g2]))

    console.log(`galaxies ${galaxies.length} galaxyPairs: ${galaxyPairs.length}`)

    function galaxyDistance(g1, g2){
        const xDist = Math.abs(scaledX[g2[0]] - scaledX[g1[0]])
        const yDist = Math.abs(scaledY[g2[1]] - scaledY[g1[1]])
        return xDist+yDist
    }

    return galaxyPairs.reduce((acc, pair) => {
        return acc + galaxyDistance(...pair)
    }, 0)
}

function part2(input){

}

module.exports = {
    part1,
    part2
}