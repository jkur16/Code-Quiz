var username = document.querySelector('#username')
var saveScoreBtn = document.querySelector('#saveScoreBtn')
var finalScore = document.querySelector('#finalScore')
var mostRecentScore = localStorage.getItem('mostRecentScore')

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

var MAX_HIGH_SCORES = 5
// Final score
finalScore.innerText = mostRecentScore
// Re-enable save function
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
// Click save button
saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}