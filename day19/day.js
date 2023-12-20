class Workflow {
    constructor(info){
        const [_, name, rulesStr] = info.match(/(\w+)\{(.*)}/)
        this.name = name
        this.rules = rulesStr.split(',').map((r) => {
            const parts = r.split(':')
            if(parts.length == 2){
                const [_, category, comparitor, value] = parts[0].match(/([xmas])([<>])(\d+)/)
                return {
                    category,
                    comparitor,
                    value: parseInt(value),
                    queue: parts[1]
                }
            } else {
                return {
                    queue: parts[0]
                }

            }
        })
    }

    evaluateRules(part){
        for(const rule of this.rules){
            console.log(rule)
            switch(rule.comparitor){
                case '>':
                    if(part[rule.category] > rule.value){
                        console.log(`${this.name} - ${rule.category} (${part[rule.category]}) ${rule.comparitor} ${rule.value} `)
                        return rule.queue
                    }
                    break;
                case '<':
                    if(part[rule.category] < rule.value){
                        console.log(`${this.name} - ${rule.category} (${part[rule.category]}) ${rule.comparitor} ${rule.value} `)
                        return rule.queue
                    }
                    break;
                default:
                    console.log(`${this.name} - DEFAULTED ${rule.queue} `)
                    return rule.queue
            }
        }
    }
}

class Part {
    constructor(info){
        const [_, x, m, a, s] = info.match(/{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}/)
        this.x = parseInt(x)
        this.m = parseInt(m)
        this.a = parseInt(a)
        this.s = parseInt(s)
    }

    toString(){
        return `{x=${this.x}, m=${this.m}, a=${this.a}, s=${this.s}}`
    }

    value(){
        return this.x + this.m + this.a + this.s
    }
}

function part1(input){
    const workflows = new Map()
    const parts = []
    for(const line of input){
        if(line[0] == "{"){ // part
            parts.push(new Part(line))
        } else if(line.length > 0) {
            const workflow = new Workflow(line)
            workflows.set(workflow.name, workflow)
        }
    }

    console.log(workflows)
    console.log(parts)

    const accepted = []
    const rejected = []

    for(const part of parts){
        var resQueue = 'in'
        console.log(part.toString())
        while (!(resQueue == "A" || resQueue =="R")){
            console.log(resQueue);
            const currWorkflow = workflows.get(resQueue)
            resQueue = currWorkflow.evaluateRules(part)
            
        }

        switch(resQueue){
            case "A": 
                console.log(`ACCEPT - Part ${part.toString()}`)
                accepted.push(part)
                break;
            case "R":
                console.log(`REJECT - Part ${part.toString()}`)
                rejected.push(part)
                break;
            default:
                throw `somethin got fucked up ${resQueue}`
        }
    }

    console.log(accepted)

    return accepted.reduce((acc, cur) => acc + cur.value(), 0)

}
class PartRange {
    constructor(x,m,a,s,history){
        this.x = x
        this.m = m
        this.a = a
        this.s = s
        this.history = history
    }

    size(){
        return this.rangeSize(this.x) * this.rangeSize(this.m) * this.rangeSize(this.a) * this.rangeSize(this.s)
    }

    rangeSize(range){
        return range[1] - range[0]
    }

    toString(){
        return `${this.x[0]}<=x<${this.x[1]}, ${this.m[0]}<=m<${this.m[1]}, ${this.a[0]}<=a<${this.a[1]}, ${this.s[0]}<=s<${this.s[1]} => ${this.history.join('->')} = ${'xmas'.split('').map(c => this[c][1] - this[c][0]).join(',')} ${this.size()}`
    }
}

function newPartRangeFrom(p){
    return new PartRange([...p.x], [...p.m], [...p.a], [...p.s], [...p.history])
}

function part2(input){
    const workflows = new Map()
    for(const line of input){
        console.log(line)
        if(line[0] != "{" && line.length > 0){ // part
            const workflow = new Workflow(line)
            workflows.set(workflow.name, workflow)
        }
    }
    workflows.set('A', new Workflow('A{}'))
    workflows.set('R', new Workflow('R{}'))
    console.log(workflows)
    
    const accepted = []

    function acceptedParts(partRange, workflow){
        // console.log(`EVALUATING ${workflow.name} => ${partRange.toString()}`)
        if(workflow.name == "R") return 0
        
        partRange.history.push(workflow.name)
        
        if(workflow.name == "A"){
            accepted.push(partRange)
            return partRange.size()
        }
        // console.log(workflow)
        for(const rule of workflow.rules){
            const range = partRange[rule.category]
            switch(rule.comparitor){
                case '>':
                    if(range[0] > rule.value){
                        // all
                        return acceptedParts(partRange, workflows.get(rule.queue))
                    } else if (range[1] > rule.value) {
                        // partial
                        console.log(`${workflow.name} - ${rule.category} > ${rule.value} [${range[0]}, ${rule.value + 1}) ![${rule.value + 1}, ${range[1]})! ${partRange.history.join(',')}`)
                        const matchHalf = newPartRangeFrom(partRange)
                        matchHalf[rule.category][0] = rule.value + 1
                        const leftoverHalf = newPartRangeFrom(partRange)
                        leftoverHalf[rule.category][1] = rule.value + 1 
                        console.log(`${workflow.name} MATCH ${matchHalf.size()} + LEFT ${leftoverHalf.size()} = ${matchHalf.size() + leftoverHalf.size()} ${matchHalf.size() + leftoverHalf.size() == partRange.size()}`)
                        partRange = leftoverHalf
                        acceptedParts(matchHalf, workflows.get(rule.queue))
                    }
                    break;
                case '<':
                    if(range[1] < rule.value){
                        // all
                        return acceptedParts(partRange, workflows.get(rule.queue))
                    } else if (range[0] <= rule.value) {
                        // partial
                        console.log(`${workflow.name} - ${rule.category} < ${rule.value} ![${range[0]}, ${rule.value})! [${rule.value}, ${range[1]}) ${partRange.history.join(',')}`)
                        const matchHalf = newPartRangeFrom(partRange)
                        matchHalf[rule.category][1] = rule.value
                        const leftoverHalf = newPartRangeFrom(partRange)
                        leftoverHalf[rule.category][0] = rule.value
                        console.log(`${workflow.name} MATCH ${matchHalf.size()} + LEFT ${leftoverHalf.size()} = ${matchHalf.size() + leftoverHalf.size()} ${matchHalf.size() + leftoverHalf.size() == partRange.size()}`)
                        partRange = leftoverHalf
                        acceptedParts(matchHalf, workflows.get(rule.queue))
                    }
                    break;
                default:
                    // no comparison, all pass
                    return acceptedParts(partRange, workflows.get(rule.queue))
    
            }
        }
    }

    acceptedParts(new PartRange([1,4001],[1,4001],[1,4001],[1,4001],[]), workflows.get('in'))

    console.log(accepted.map(a => a.toString()).join('\n'))

    return accepted.reduce((acc, curr) => acc + curr.size(), 0)
}

module.exports = {
    part1,
    part2
}