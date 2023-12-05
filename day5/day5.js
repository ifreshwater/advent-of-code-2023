function part1(input){
    const lines = input.split("\n")
    const seedsStr = lines.shift()
    const seeds = seedsStr.match(/\d+/g).map(s => parseInt(s))
    const seedLen = seeds.length

    var currentRanges = []
    for(const line of lines){
        if(line == ""){
            for(var i=0; i < seedLen; i++){
                for(const [dest, source, range] of currentRanges){
                    const seed = seeds[i]
                    if(seed >= source && seed <= (source + range)){
                        const offset = seed - source
                        seeds[i] = dest + offset
                        break;
                    }
                }
            }
            currentRanges = []
        } else {
            const ranges = line.match(/(\d+) (\d+) (\d+)/)
            if(ranges == null) {
                // start of segement
                continue
            }
            const [_, dest, source, range] = ranges
            currentRanges.push([parseInt(dest), parseInt(source), parseInt(range)])
        }
    }
    console.log(seeds)
    return Math.min(...seeds)
}

function part2(input){
    const lines = input.split("\n")
    const seedsStr = lines.shift()
    const seedsRanges = seedsStr.match(/\d+/g).map(s => parseInt(s))
    const seeds = []
    for(var i = 0; i< seedsRanges.length; i = i + 2){
        var start = parseInt(seedsRanges[i])
        var len = parseInt(seedsRanges[i+1])
        console.log(`${start} ${len}`)
        for(var idx = 0; idx < len; idx++){
            seeds.push(start+idx)
        }
    }
    // console.log(seeds)
    const seedLen = seeds.length

    var currentRanges = []
    for(const line of lines){
        if(line == ""){
            for(var i=0; i < seedLen; i++){
                for(const [dest, source, range] of currentRanges){
                    const seed = seeds[i]
                    if(seed >= source && seed <= (source + range)){
                        const offset = seed - source
                        seeds[i] = dest + offset
                        break;
                    }
                }
            }
            currentRanges = []
        } else {
            const ranges = line.match(/(\d+) (\d+) (\d+)/)
            if(ranges == null) {
                // start of segement
                continue
            }
            const [_, dest, source, range] = ranges
            currentRanges.push([parseInt(dest), parseInt(source), parseInt(range)])
        }
    }
    // console.log(seeds)
    return Math.min(...seeds)
}

module.exports = {
    part1,
    part2
}