function part1(input){
    const cards = input.split("\n").map(card => card.split(":"))
    const cardScores = []
    for(const [cardId, values] of cards){
        cardScores.push(evaluateCard(values))
    }
    return cardScores.reduce((acc,cur) => acc+ cur, 0)
}

function evaluateCard(card){
    const [wins, picks] = card.split("|")
    console.log(`${picks}`)
    const winsList = [...(wins.match(/\d+/g))]
    console.log(winsList)
    const picksList = [...(picks.match(/\d+/g))]
    var score = 0
    for(const winNum of winsList){
        if(picksList.includes(winNum)){
            score++
        }
    }
    if(score>0){
        return (1 * 2**(score-1))
    }
    return 0
}

function part2(input){

}

module.exports = {
    part1,
    part2
}