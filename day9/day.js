function part1(input){
    console.log(input)
    const nexts = []
    for(const line of input){
        console.log(line)
        const steps= []
        var history = line.match(/-?\d+/g).map(i => parseInt(i))
        console.log(history)
        steps.push([...history])
        while(!history.every(v => v == 0)){
            history = history.reduce((acc, curr, idx) => {
                if(idx == 0) return []
                acc.push(curr - history[idx-1])
                return acc
            }, [])
            steps.push([...history])
        }
        console.log(steps)
        for(const stage in steps){
            // console.log(stage)
            const idx = steps.length-1-stage
            // console.log(steps[idx])
            if(idx == 0) continue
            // console.log(`stage ${stage} idx ${idx} ${steps[idx].at(-1)} ${steps[idx-1].at(-1)}`)
            steps[idx-1].push(steps[idx].at(-1) + steps[idx-1].at(-1))
        }
        console.log(steps)
        console.log(`final number ${steps[0].at(-1)}`)
        nexts.push(steps[0].at(-1))
    }
    console.log(nexts)
    return nexts.reduce((acc, cur) => acc + cur)

}
function part2(input){
    console.log(input)
    const nexts = []
    for(const line of input){
        console.log(line)
        const steps= []
        var history = line.match(/-?\d+/g).map(i => parseInt(i))
        console.log(history)
        steps.push([...history])
        while(!history.every(v => v == 0)){
            history = history.reduce((acc, curr, idx) => {
                if(idx == 0) return []
                acc.push(curr - history[idx-1])
                return acc
            }, [])
            steps.push([...history])
        }
        console.log(steps)
        for(const stage in steps){
            // console.log(stage)
            const idx = steps.length-1-stage
            // console.log(steps[idx])
            if(idx == 0) continue
            if(stage == 0) steps[idx].unshift(0)
            // console.log(`stage ${stage} idx ${idx} ${steps[idx].at(-1)} ${steps[idx-1].at(-1)}`)
            steps[idx-1].unshift(steps[idx-1][0] - steps[idx][0])
        }
        console.log(steps)
        console.log(`final number ${steps[0][0]}`)
        nexts.push(steps[0][0])
    }
    console.log(nexts)
    return nexts.reduce((acc, cur) => acc + cur)
}

module.exports = {
    part1,
    part2
}