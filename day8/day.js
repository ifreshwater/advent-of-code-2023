function part1(input){
    const lines = input.split("\n")
    const rawInstructions = lines.shift()
    lines.shift() //whitespace
    const netMap = {}

    for(const line of lines){
        console.log(line)
        const [node, left, right] = line.match(/\w{3}/g)
        netMap[node] = [left, right]
    }

    console.log(netMap)
    const instLength = rawInstructions.length
    var currentNode = "AAA"
    var steps = 0
    while (currentNode != "ZZZ"){
        const dir = rawInstructions[steps % instLength] == 'L' ? 0 : 1
        currentNode = netMap[currentNode][dir]
        steps++
    }

    return steps
}

function gcd(a,b){
    if(b==0)
        return a;
    
        return gcd(b,a %b)
}

function findLcm(arr){
    const n = arr.length
    let ans = arr[0]
    for(let i = 1; i < n; i++){
        ans = ((arr[i] * ans) / 
        (gcd(arr[i], ans)));
    }
    return ans;
}

function part2(input){
    const lines = input.split("\n")
    const rawInstructions = lines.shift()
    lines.shift() //whitespace
    const netMap = {}

    for(const line of lines){
        console.log(line)
        const [node, left, right] = line.match(/\w{3}/g)
        netMap[node] = [left, right]
    }

    console.log(netMap)
    const instLength = rawInstructions.length
    const ghosts = Object.keys(netMap).filter(f => f[2] == 'A')
    const ghostLen = ghosts.length
    console.log(ghosts)
    const ghostSteps = []

    for(const [idx, ghost] of ghosts.entries()){
        var steps = 0
        var ghostState = ghost
        while(ghostState[2] != 'Z'){
            const dir = rawInstructions[steps % instLength] == 'L' ? 0 : 1
            ghostState = netMap[ghostState][dir]
            steps++
        }
        ghostSteps.push(steps)
        console.log(`ghost ${ghosts[idx]} took ${steps} steps`)
    }

    console.log(ghostSteps)
    return findLcm(ghostSteps.sort())
}

module.exports = {
    part1,
    part2
}