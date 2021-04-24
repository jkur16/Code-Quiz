var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timerEl = document.getElementById("#timer");

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []
var timer = 90

// questions in the quiz
var questions = [
    {
        question: 'Who originally wrote JavaScript?',
        choice1: 'Steve Jobs',
        choice2: 'Brandan Eich',
        choice3: 'Jamie Zawinski',
        choice4: 'Tim Cook',
        answer: 2,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msgBox("Hello World");',
        choice2: 'msg("Hello World");',
        choice3: 'alertBox("Hello World");',
        choice4: 'alert("Hello World");',
        answer: 4,
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        choice1: 'var colors = (1:"red", 2:"green", 3:"blue")',
        choice2: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        choice3: 'var colors = "red", "green", "blue"',
        choice4: 'var colors = ["red", "green", "blue"]',
        answer: 4,
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        choice1: 'onmouseclick',
        choice2: 'onclick',
        choice3: 'onchange',
        choice4: 'onmouseover',
        answer: 2,
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        choice1: '*',
        choice2: 'X',
        choice3: '=',
        choice4: '-',
        answer: 3,
    }
]

var SCORE_POINTS = 100
var MAX_QUESTIONS = questions.length
// Starting the game
startGame = () => {
    questionCounter = 0
    score = 0
    timer = 90
    availableQuestions = [...questions]
    getNewQuestion()
}
// Start Timer
function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || availableQuestions === questions.length) {
            clearInterval(countdown);
            setTimeout();
        }
    }, 1000);
}
// keeps track of the score
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../Code-Quiz/end.html')
    }

    // Question progress bar
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    // keep tracks of what question we're on
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    
    // Choice we select
    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']
        // Chooses CSS bases on correct/incorrect answer
        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        // increase points by 100 if correct answer is chosen
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
