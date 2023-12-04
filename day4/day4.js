function part1(input){
    const cards = input.split("\n").map(card => card.split(":"))
    const cardScores = []
    for(const [cardId, values] of cards){
        cardScores.push(evaluatePoints(values, true))
    }
    return cardScores.reduce((acc,cur) => acc+ cur, 0)
}

function evaluatePoints(card, double){
    const [wins, picks] = card.split("|")
    // console.log(`${picks}`)
    const winsList = [...(wins.match(/\d+/g))]
    // console.log(winsList)
    const picksList = [...(picks.match(/\d+/g))]
    var score = 0
    for(const winNum of winsList){
        if(picksList.includes(winNum)){
            score++
        }
    }
    if(score>0){
        if(double){
            return (2**(score-1))
        } else {
            return score
        }
    }
    return 0
}

function part2(input){
    const cards = input.split("\n").map(card => card.split(":"))
    const cardCounts = Array(cards.length).fill(1,0);
    for(var cardIdx = 0; cardIdx < cards.length; cardIdx++){
        const [cardId, card] = cards[cardIdx]
        // console.log(`${card}, ${cardIdx}`)
        const gainedCards = evaluatePoints(card, false)
        if(gainedCards > 0){
            for(var i = 0; i < gainedCards; i++){
                cardCounts[cardIdx + i + 1] += cardCounts[cardIdx]
            }
        }
    }
    // console.log(cardCounts)
    
    return cardCounts.reduce((acc,cur) => acc+ cur, 0) 
}

module.exports = {
    part1,
    part2
}