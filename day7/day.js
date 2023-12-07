const CARD_VALS = ['2','3','4','5','6','7','8','9','T', 'J', 'Q', 'K', 'A']
const CARD_VALS_J = ['J','2','3','4','5','6','7','8','9','T', 'J', 'Q', 'K', 'A']


function cardValue(c, jokers){
    if(jokers) {
        return CARD_VALS_J.indexOf(c)
    } else {
        return CARD_VALS.indexOf(c)
    }
    
}

function mode(arr){
    
    const freqs = arr.filter(l => l != 'J')
        .sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    );
        
    return freqs[freqs.length -1] || 'K';
}

class Hand{
    constructor(hand, bid, jokers = false){
        this.hand = hand
        this.cards = this.hand.split('')
        this.bid = parseInt(bid)
        this.jokers = jokers
        this.cardValues = this.cards.map(c => cardValue(c, jokers))
    }

    toString(){
        return `${this.hand} - ${this.bid}`
    }

    getRank(){
        var letters
        if(this.jokers && this.hand.includes('J')){
            const mostFreq = mode(this.cards)
            const hand = this.hand.replaceAll("J", mostFreq)
            letters = hand.split('')
            // console.log(`J replace (${mostFreq}): ${this.hand} => ${hand}`)
        } else {
            letters = this.cards
        }
        const counts = {}
        Array.from(new Set(letters)).forEach(letter => {
            counts[letter] = letters.filter(l => l == letter).length
        })
        //console.log(counts)
        const countValues = Object.values(counts)
        const unique = countValues.length

        var highPairCount = Math.max(...countValues)

        switch(highPairCount){
            case 5:
                return "Five of a Kind"
            case 4:
                return "Four of a Kind"
            case 3:
                if (unique == 2){
                    return "Full House"
                } else {
                    return "Three of a Kind"
                }
            case 2:
                if(unique == 3){
                    return "Two Pair"
                } else {
                    return "One Pair"
                }
            case 1:
                // if(unique == 5){
                    return "High Card"
                // }
                // throw "something fucky"
            default:
                return "something hella fucky"
        }
    }
}

function sortHands(a,b){
    for(var i = 0; i < 5; i++){
        if(a.cardValues[i] < b.cardValues[i]) {
            //console.log(`${a.cardValues[i]} (${a.hand[i]}) < ${b.cardValues[i]} (${b.hand[i]})`)
            return 1;
        }
        if(a.cardValues[i] > b.cardValues[i]) {
            //console.log(`${a.cardValues[i]} (${a.hand[i]}) > ${b.cardValues[i]} (${b.hand[i]})`)
            return -1;
        }
    }
    return 0
}

function printRanks(ranks){
    return Object.keys(ranks).map(key => [key, ranks[key].map(h => h.toString())])
}

function part1(input){
    const handBids = input.split("\n").map(l =>{
        const [hand, bid] = l.split(" ")
        return new Hand(hand, bid)
    })

    const ranks = { "Five of a Kind": [], "Four of a Kind": [], "Full House": [], "Three of a Kind": [], "Two Pair": [], "One Pair": [], "High Card": []}
    for(const hand of handBids){    
        const rank = hand.getRank()
        ranks[rank].push(hand)
    }
    //console.log(ranks)
    const sorted = Object.values(ranks).map(chunk => chunk.sort(sortHands)).flat()
    // console.log(sorted)
    return sorted.reduce((acc, curr, idx, arr) => {
        acc += curr.bid * (sorted.length - idx)
        return acc
    }, 0)
}
function part2(input){
    const handBids = input.split("\n").map(l =>{
        const [hand, bid] = l.trim().split(" ")
        return new Hand(hand, bid, true)
    })
    const ranks = { "Five of a Kind": [], "Four of a Kind": [], "Full House": [], "Three of a Kind": [], "Two Pair": [], "One Pair": [], "High Card": []}
    for(const hand of handBids){    
        const rank = hand.getRank()
        // console.log(`${hand.hand} - ${rank}`)
        ranks[rank].push(hand)
    }
    // console.log(ranks)
    // console.log(printRanks(ranks))
    const sorted = Object.values(ranks).map(chunk => chunk.sort(sortHands))
    // console.log(sorted.map(r => r.map(h => h.toString())))
    const flat = sorted.flat()
    // console.log(flat)
    return flat.reduce((acc, curr, idx, arr) => {
        acc += curr.bid * (flat.length - idx)
        return acc
    }, 0)
}

module.exports = {
    part1,
    part2
}