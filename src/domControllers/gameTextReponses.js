const listOfResponses = {
    computerTurn: [
        'Your AI enemy is contemplating how to destroy you...'.toUpperCase(),
        'AI is calculating a devastating shot...'.toUpperCase(),
        'The computer is thinking about how to ruin your fleet...'.toUpperCase(),
        'Beep. Boop. Calculating deadly blow...'.toUpperCase()
    ],
    computerMiss: [
        'AI misses!',
        'Oof, tough break for the computer, that\'s a miss!'.toUpperCase(),
        'Miss! This whole AI thing is not living up to the hype.'.toUpperCase()
    ],
    playerMiss: [
        'Miss! Do better.'.toUpperCase(),
        'That was embarassing.'.toUpperCase(),
        'Wow, great job not hitting your enemy.'.toUpperCase(),
        'That was a horrendous shot.'.toUpperCase(),
        'Great shot! Not.'.toUpperCase(),
        'And the award for worst shot of all time goes too... you.'.toUpperCase(),
        'Quick question... Are you trying to do a bad job?'.toUpperCase(),
        'Swing and a miss!'.toUpperCase(),
        'Reminder, you do not score points for missing your enemy.'.toUpperCase(),
        'One thing is clear, the enemy is not where you just shot.'.toUpperCase()
    ],
}

export const responses = {
    playerResponses: {
        turn: (player) => { return `YOUR MOVE, COMMANDER ${player.name.toUpperCase()}` },
        hit: (ship) => { return `Hit! You\'ve damaged the enemy\'s ${ship.type}`.toUpperCase() },
        miss: () => { 
            const randIndex = Math.floor(Math.random() * listOfResponses.playerMiss.length)
            return listOfResponses.playerMiss[randIndex]
        },
        sunk: 'tbd sunk text'
    },
    
    computerResponses: {
        turn: () => { 
            const randIndex = Math.floor(Math.random() * listOfResponses.computerTurn.length)
            return listOfResponses.computerTurn[randIndex]
        },
        hit: (ship) => { return `AI hits your ${ship.type.toUpperCase()}! How does that make you feel?` },
        miss: () => {
            const randIndex = Math.floor(Math.random() * listOfResponses.computerMiss.length)
            return listOfResponses.computerMiss[randIndex]
        },
        sunk: 'tbd sunk text'
    }
}

export const gameTextTrigger = {
    turn: 'turn',
    hit: 'hit',
    miss: 'miss',
    sunk: 'sunk'
}