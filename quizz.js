const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const feedback = document.getElementById('feedback');
const timerElement = document.getElementById('time');
const endScreen = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submit-score');

let currentQuestionIndex = 0;
let time = 60;
let timer;
const questions = [/* Your questions array remains unchanged */];

startBtn.addEventListener('click', startQuiz);
submitScoreBtn.addEventListener('click', saveHighScore);

function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    showNextQuestion();
}

function showNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtons.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    feedback.innerText = '';
}

function selectAnswer(answer) {
    if (answer.correct) {
        feedback.innerText = 'Correct!';
    } else {
        feedback.innerText = 'Wrong!';
        time -= 10; // Penalty for wrong answer
    }

    currentQuestionIndex++;
    showNextQuestion();
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    endScreen.style.display = 'flex';
    finalScoreElement.innerText = time;
}

function updateTimer() {
    time--;
    timerElement.innerText = time;
    if (time <= 0) {
        endQuiz();
    }
}

function saveHighScore() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        // Save the score and initials (you can implement this part)
        alert(`Score saved: ${time}`);
        // Optionally, you can redirect to a high score page or do other actions.
    } else {
        alert('Please enter your initials.');
    }
}
