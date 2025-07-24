const questions = [
    {
        question: "Qual é a cor Azul?",
        answers: [
            { text: "Azul", correct: true, className: "custom-color" },
            { text: "Azul", correct: false },
            { text: "Verde", correct: false }
        ]
    },
    {
        question: "O que capivaras comem?",
        answers: [
            { text: "Grama e plantas aquáticas", correct: true },
            { text: "Carne e ossos", correct: false },
            { text: "Insetos e larvas", correct: false }
        ]
    },
    {
        question: "Quanto é 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false }
        ]
    },
    {
        question: "Qual animal é conhecido por suas listras pretas e brancas?",
        answers: [
            { text: "Tigre", correct: false },
            { text: "Zebra", correct: true },
            { text: "Panda", correct: false }
        ]
    },
    {
        question: "Qual é o maior oceano da Terra?",
        answers: [
            { text: "Oceano Atlântico", correct: false },
            { text: "Oceano Índico", correct: false },
            { text: "Oceano Pacífico", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hide");
    resultContainer.classList.add("hide");
    scoreElement.textContent = `Pontuação: ${score}`;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    progressElement.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.className) {
            button.classList.add(answer.className);
        }
        button.addEventListener("click", () => selectAnswer(answer.correct, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(correct, button) {
    if (correct) {
        score++;
        scoreElement.textContent = `Pontuação: ${score}`;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
    });
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove("hide");
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = "";
    answerButtons.innerHTML = "";
    nextButton.classList.add("hide");
    resultContainer.classList.remove("hide");
    resultElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

restartButton.addEventListener("click", startQuiz);

startQuiz();