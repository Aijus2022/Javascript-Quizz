const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz');
const questionContainer = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const feedback = document.getElementById('feedback');
const timerElement = document.getElementById('time');
const endScreen = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submit-score');

let currentQuestionIndex = 0;
let time = 90;
let timer;
const questions = [
    {
        question: 'What is the purpose of the `typeof` operator in JavaScript?',
        answers: [
            { text: 'To declare a constant variable', correct: false },
            { text: 'To declare a variable with block scope', correct: false },
            { text: 'To determine the type of a value or variable', correct: true },
            { text: 'To declare a global variable', correct: false }
        ]
    },
    {
        question: 'What is an example of a method in JavaScript?',
        answers: [
            { text: 'console.log', correct: true },
            { text: 'if statement', correct: false },
            { text: 'for loop', correct: false },
            { text: 'let keyword', correct: false }
        ]
    },
    {
        question: 'How do you declare a function in JavaScript?',
        answers: [
            { text: 'function myFunction() { }', correct: true },
            { text: 'var myFunction = function() { }', correct: false },
            { text: 'const myFunction = () => { }', correct: false },
            { text: 'def myFunction():', correct: false }
        ]
    },
    {
        question: 'What does the term "scope" refer to in JavaScript?',
        answers: [
            { text: 'The visibility of a variable', correct: true },
            { text: 'A data type in JavaScript', correct: false },
            { text: 'A built-in function', correct: false },
            { text: 'The process of defining a function', correct: false }
        ]
    },
    {
        question: 'How do you access the value of a property in a JavaScript object?',
        answers: [
            { text: 'Using dot notation', correct: true },
            { text: 'Using square bracket notation', correct: true },
            { text: 'Using parentheses', correct: false },
            { text: 'Using backticks', correct: false }
        ]
    },
    {
        question: 'What is the purpose of the `Array.map` function in JavaScript?',
        answers: [
            { text: 'To filter the elements of an array based on a condition', correct: false },
            { text: 'To iterate over the elements of an array and modify them', correct: true },
            { text: 'To create a new array by applying a function to each element', correct: false },
            { text: 'To sort the elements of an array', correct: false }
        ]
    },
    {
        question: 'Which keyword is used to define a constant in JavaScript?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: false },
            { text: 'const', correct: true },
            { text: 'def', correct: false }
        ]
    },
    {
        question: 'What does the term "hoisting" refer to in JavaScript?',
        answers: [
            { text: 'The process of bringing all variables to the top of the file', correct: false },
            { text: 'The process of automatically promoting variable and function declarations to the top of their containing scope', correct: true },
            { text: 'The process of rearranging the order of statements in a program', correct: false },
            { text: 'The process of minimizing the memory footprint of a program', correct: false }
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
        question: 'What is the purpose of the `Array.reduce` function in JavaScript?',
        answers: [
            { text: 'To filter the elements of an array based on a condition', correct: false },
            { text: 'To combine the elements of an array into a single value', correct: true },
            { text: 'To create a new array by applying a function to each element', correct: false },
            { text: 'To sort the elements of an array', correct: false }
        ]
    }
];


startBtn.addEventListener('click', startQuiz);
submitScoreBtn.addEventListener('click', saveHighScore);

function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';
    timer = setInterval(updateTimer, 1500);
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

