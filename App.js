// JavaScript code for a simple quiz application
// Array of questions
import { updateUser, getUsers } from "./updateLeaderBoard.js";
document.getElementById("startQuiz").addEventListener("click", startQuiz);
let userName;
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Jane Austen"],
        answer: "Harper Lee"
    }
];

let currentQuestionIndex = 0;
let score = 0;

//function to start quiz
function startQuiz() {
    userName = document.getElementById("userName").value;
    if (userName == undefined || userName == "") {
        alert("Please enter user name");
    }
    else {
        document.getElementById("userLoggedIn").innerHTML = "Welcome " + userName;
        document.getElementById("start").classList.add("hidden");
        displayQuestion();
    }
}
// Function to display a question
function displayQuestion() {
    let interval;
    let timer = 10;
    document.getElementById("timer").innerHTML = "Time: " + timer;
    document.getElementById("timer").classList.remove("red");
    clearInterval(interval);
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerHTML = "Time: " + timer;
        if (timer <= 3)
            document.getElementById("timer").classList.add("red");
        if (timer <= 0) {
            clearInterval(interval);
            nextQuestion();
        }
    }, 1000);
    document.getElementById("quiz").classList.remove('hidden');
    // document.getElementById("submit").classList.remove('hidden');
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const currentQuestion = quizQuestions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => checkAnswer(option, interval));
        optionsContainer.appendChild(button);
    });
}

// Function to check the answer
function checkAnswer(selectedOption, interval) {
    clearInterval(interval);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        alert('Correct!');
    } else {
        alert(`Wrong! The correct answer is ${currentQuestion.answer}`);
    }
    nextQuestion();
}

//function for next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length)
        displayQuestion();
    else
        showResults();
}

// Function to show results
function showResults() {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');

    questionContainer.textContent = `Quiz Over! Your score is ${score} out of ${quizQuestions.length}.`;
    optionsContainer.innerHTML = '';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Quiz';
    restartButton.addEventListener('click', restartQuiz);
    optionsContainer.appendChild(restartButton);
    const leaderboardBtn = document.createElement('button');
    leaderboardBtn.textContent = 'LeaderBoard';
    leaderboardBtn.addEventListener('click', getLeaderBoard);
    optionsContainer.appendChild(leaderboardBtn);
}

async function getLeaderBoard() {
    const users = await getUsers();
    users.sort((a, b) => b.score - a.score);
    await updateUser(userName, score);
    showLeaderBoard(users);
    //updating the score for the current user.
}

function showLeaderBoard(users) {
    const parent = document.getElementById('leaderBoard');
    const leaderBoardHeader = document.createElement('div');
    leaderBoardHeader.classList.add('leaderboard-header');
    leaderBoardHeader.innerHTML = 'Leaderboard';
    parent.appendChild(leaderBoardHeader);
    const table = document.createElement('ul');
    table.classList.add('leaderboard-list');
    let index = 1;
    users.forEach(user => {
        const row = document.createElement('li');
        row.classList.add('leaderboard-item');
        if (user.name == userName) {
            row.innerHTML = `<span class="rank">${index++}</span><span class="name">${user.name}(You)</span><span class="score">${score}</span>`;
        }
        else
            row.innerHTML = `<span class="rank">${index++}</span><span class="name">${user.name}</span><span class="score">${score}</span>`;
        table.appendChild(row);
    });
    parent.appendChild(table);
    parent.classList.remove('hidden');
}

// Function to restart the quiz
function restartQuiz() {
    document.getElementById('leaderBoard').classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}
