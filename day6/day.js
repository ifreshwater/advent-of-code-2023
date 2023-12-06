function part1(input){
    const lines = input.split("\n")
    const timesStr = lines.shift()
    const recordsStr = lines.shift()
    const times = timesStr.match(/\d+/g)
    const records = recordsStr.match(/\d+/g)

    if(times.length != records.length){
        throw 'oops'
    }
    const winCounts = []
    for(var idx = 0; idx < times.length; idx++){
        const raceTime = times[idx]
        const waysToWin = []
        for(var t=0; t < raceTime; t++){
            const remainingTime = raceTime-t
            if(remainingTime * t > records[idx]){
                waysToWin.push(t)
            }
        }
        console.log(waysToWin)
        winCounts.push(waysToWin.length)
    }
    return winCounts.reduce((acc, cur) => acc * cur)
}

function part2(input){
    const lines = input.split("\n")
    const timesStr = lines.shift()
    const recordsStr = lines.shift()
    const time = parseInt(timesStr.match(/\d+/g).join(''))
    const record = parseInt(recordsStr.match(/\d+/g).join(''))
    console.log(`${time} ${record}`)
    const waysToWin = []
    for(var t=0; t < time; t++){
        const remainingTime = time-t
        if(remainingTime * t > record){
            waysToWin.push(t)
        }
    }
    // console.log(waysToWin)
    
    return waysToWin.length
}

module.exports = {
    part1,
    part2
}