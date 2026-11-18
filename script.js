// Quiz questions array (you can easily add, remove, or modify questions here)
const quizData = [
    {
        question: "What is the capital city of Kenya?",
        answers: [
            { text: "Mombasa", correct: false },
            { text: "Nairobi", correct: true },
            { text: "Kisumu", correct: false },
            { text: "Nakuru", correct: false }
        ]
    },
    {
        question: "Which programming language is primarily used for web styling?",
        answers: [
            { text: "Python", correct: false },
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which data structure operates on a Last-In, First-Out (LIFO) basis?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Array", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<code", correct: false }
        ]
    }
];

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.querySelector(".progress-bar");

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;

// Event Listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    totalQuestionsSpan.textContent = quizData.length;
    
    loadQuestion();
}

function loadQuestion() {
    resetState();
    
    const currentQuestion = quizData[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;
    
    // Update progress bar width percentage
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Dynamically insert answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn"); // Optional class for styling
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Disable all answer buttons after a choice is made to prevent multiple clicks
    Array.from(answersContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Wait 1 second so the user can see correct/incorrect feedback before loading the next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizData.length;

    // Set a custom feedback message based on the score ratio
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Outstanding job! 🎉";
    } else if (percentage >= 70) {
        resultMessage.textContent = "Great job! You know your stuff! 👏";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Good effort! Keep practicing. 👍";
    } else {
        resultMessage.textContent = "Don't give up! Try again to improve your score. 💪";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}