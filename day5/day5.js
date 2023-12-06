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

class Range {

    constructor(start, length){
        this.start = start
        this.length = length
        this.end = start + length - 1
    }

    toString(){
        return `${this.start} - ${this.end} (${this.length})`
    }

    checkIntersection(start, length){
        const end = start + length - 1
        if(this.start <= (end) && start <= this.end){
            console.log(`${this.toString()} is in range ${start} - ${start+length} (${length})`)
            return true
        }
        return false
    }
    getOverlaps(dest, source, len){
        const start = source
        const end = source + len - 1
        const overlapEnd = Math.min(end, this.end)
        const overlapStart = Math.max(start, this.start)

        const overlapLength = overlapEnd - overlapStart + 1 

        const offset = overlapStart - source
        const destOffset = dest - source 

        const overlaps = []

        console.log(`SRC ${source} DEST ${dest} (${destOffset}) oS ${overlapStart} oE ${overlapEnd} oL (${overlapLength})`)
        
        if(this.start < overlapStart){
            const preOverlap = new Range(this.start, overlapStart - this.start)
            console.log(`PreOverlap: ${preOverlap.toString()}`)
            overlaps.push(preOverlap)
        }
        // console.log(`dest ${dest} offset ${offset} new start ${dest+offset} | overlapLength ${overlapLength} offset ${offset} new End ${overlapLength + offset}`)
        const newRange = new Range(overlapStart + destOffset, overlapLength)
        console.log(`New Range: ${newRange.toString()} - OFFSET ${offset} old Start ${source+offset} => ${source+offset+overlapLength} (${overlapLength})`)
        overlaps.push(newRange)
        if(this.end > overlapEnd){
            const postOverlap = new Range(overlapEnd+1, this.end - overlapEnd)
            console.log(`PostOverlap: ${postOverlap.toString()}`)
            overlaps.push(postOverlap)
        }
        console.log(overlaps.map(r => r.toString()))
        return overlaps
    }
}

function part2(input){
    const lines = input.split("\n").map(l => l.trim())
    const seedsStr = lines.shift()
    lines.shift() // clear blank
    const seedsRanges = seedsStr.match(/\d+/g).map(s => parseInt(s))
    var seeds = []
    for(var i = 0; i< seedsRanges.length; i = i + 2){
        var start = parseInt(seedsRanges[i])
        var len = parseInt(seedsRanges[i+1])
        seeds.push(new Range(start, len))
    }
    var currentRanges = []
    for(const line of lines){
        console.log(line);
        if(line == ""){
            const newSeedRanges = []
            for(var i=0; i < seeds.length; i++){
                var overlapped = false
                const seed = seeds[i]
                for(const [dest, source, range] of currentRanges){
                    if(seed.checkIntersection(source, range)){
                        const overlaps = seed.getOverlaps(dest,source,range)
                        for(const overlap of overlaps){
                            newSeedRanges.push(overlap)
                        }
                        overlapped = true
                        break;
                    }
                }
                if(overlapped == false){
                    console.log('no overlap')
                    newSeedRanges.push(seed)
                }
            }

            seeds = [...newSeedRanges]
            console.log(`SANITY CHECK - SEED TOTAL ${seeds.map(s => s.length).reduce((acc, cur) => acc + cur,0)}`)
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
    return Math.min(...seeds.map(s => s.start))
}

module.exports = {
    part1,
    part2
}