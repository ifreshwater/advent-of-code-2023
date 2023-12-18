function isArrangementValid(springList, groups){
    const listGroups = springList.match(/(#+)/g)
    console.log(listGroups)
    var valid = true
    listGroups.forEach((v, i) => {
        if(v.length != groups[i]){
            valid = false
        }
    })

    return valid
}

function arrangements(springList, groups){
    
    
}

function part1(input){
    let total = 0
    for(const line of input){
        console.log(line)
        const [springList, groupsList] = line.split(' ')
        const groups = groupsList.split(',').map(c => parseInt(c))
    
        console.log(`${springList} ${isArrangementValid(springList, groups)}`)
    }
    
}
function part2(input){

}

module.exports = {
    part1,
    part2
}