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
const questions = [
    {
        question: 'What is the purpose of the `let` keyword in JavaScript?',
        answers: [
            { text: 'To declare a constant variable', correct: false },
            { text: 'To declare a variable with block scope', correct: true },
            { text: 'To declare a variable with function scope', correct: false },
            { text: 'To declare a global variable', correct: false }
        ]
    },
    {
        question: 'What is an example of a falsy value in JavaScript?',
        answers: [
            { text: '0', correct: true },
            { text: 'true', correct: false },
            { text: 'undefined', correct: false },
            { text: 'null', correct: true }
        ]
    },
    {
        question: 'What does the `typeof` operator in JavaScript return for an array?',
        answers: [
            { text: 'Array', correct: false },
            { text: 'Object', correct: true },
            { text: 'String', correct: false },
            { text: 'Number', correct: false }
        ]
    },
    {
        question: 'In JavaScript, what is the purpose of the `this` keyword?',
        answers: [
            { text: 'To refer to the current function being executed', correct: false },
            { text: 'To refer to the global object', correct: false },
            { text: 'To refer to the object that is executing the current function', correct: true },
            { text: 'To declare a new variable', correct: false }
        ]
    },
    {
        question: 'What is an example of an arrow function in JavaScript?',
        answers: [
            { text: 'function myFunction() { }', correct: false },
            { text: 'var myFunction = function() { }', correct: false },
            { text: 'var myFunction = () => { }', correct: true },
            { text: 'def myFunction():', correct: false }
        ]
    },
    {
        question: 'How do you check if a variable is an array in JavaScript?',
        answers: [
            { text: 'typeof myArray === "array"', correct: false },
            { text: 'myArray instanceof Array', correct: true },
            { text: 'Array.isArray(myArray)', correct: true },
            { text: 'myArray.isArray()', correct: false }
        ]
    },
    {
        question: 'What is the purpose of the `map` function in JavaScript?',
        answers: [
            { text: 'To iterate over the elements of an array and modify them', correct: true },
            { text: 'To filter the elements of an array based on a condition', correct: false },
            { text: 'To create a new array by applying a function to each element', correct: true },
            { text: 'To sort the elements of an array', correct: false }
        ]
    },
    {
        question: 'What is the difference between `let` and `const` in JavaScript?',
        answers: [
            { text: '`let` is used for constant variables, and `const` is used for variables that can be reassigned.', correct: false },
            { text: '`let` has block scope, and `const` has function scope.', correct: false },
            { text: '`let` allows variable reassignment, while `const` does not.', correct: true },
            { text: '`const` is used for constant variables, and `let` is used for variables that can be reassigned.', correct: true }
        ]
    },
    {
        question: 'What is the purpose of the `JSON.stringify()` function in JavaScript?',
        answers: [
            { text: 'To parse a JSON string into a JavaScript object', correct: false },
            { text: 'To convert a JavaScript object into a JSON string', correct: true },
            { text: 'To compare two JSON objects for equality', correct: false },
            { text: 'To format a JSON string for readability', correct: false }
        ]
    },
    {
        question: 'What is the concept of "hoisting" in JavaScript?',
        answers: [
            { text: 'It refers to the process of bringing all variables to the top of the file.', correct: false },
            { text: 'It refers to the process of automatically promoting variable and function declarations to the top of their containing scope.', correct: true },
            { text: 'It refers to the process of rearranging the order of statements in a program.', correct: false },
            { text: 'It refers to the process of minimizing the memory footprint of a program.', correct: false }
        ]
    }
   ];

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

