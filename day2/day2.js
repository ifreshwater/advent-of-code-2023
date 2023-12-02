
function gameEvaluation(game, cubeCounts){
    const [gameIdStr, gameVal] = game.split(':')
    const gameId = parseInt(gameIdStr.match(/\d+/)[0])
    const gameData = gameVal.split(';')
    return gameData.every(g => roundPossible(g,cubeCounts)) ? gameId : 0
    
}

function roundPossible(round, cubeCounts){
    const pulledCubes = round.split(',').map(e => e.trim().split(' '))
    for(const [count, color] of pulledCubes){
        if(count > cubeCounts[color]){
            return false
        }
    }
    return true
}

function part1(input, cubeCounts) {
    const games = input.split('\n')
    var validGames = 0
    for(const game of games){
        validGames += gameEvaluation(game,cubeCounts)
    }
    return validGames
}

function gamePower(game){
    const [gameId, gameVal] = game.split(':')
    const rounds = gameVal.split(';')
    const colorMins = {red: 0, green: 0, blue: 0}
    for(const round of rounds){
        const totals = round.split(',').map(e => e.trim().split(' '))
        for(const [count, color] of totals){
            const c = parseInt(count) 
            if(c > colorMins[color]){
                colorMins[color] = c
            }
        }
    }
    var power = colorMins.red * colorMins.blue * colorMins.green
    // console.log(`${gameId} - ${power} - ${JSON.stringify(colorMins)}`)

    return power
}

function part2(input) {
    const games = input.split('\n')
    var gameSum = 0
    for(const game of games){
        gameSum += gamePower(game)
    }
    return gameSum
}

module.exports = {
    part1, part2
}