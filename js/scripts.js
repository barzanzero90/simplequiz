const questions = [
    {
        question: "What does HTML stand for, and what is its primary purpose?",
        answers: [
            { text: "Hypertext Markup Language; it's used to style web pages.", correct: false },
            { text: "Hyper Transfer Markup Language; it's used for server-side scripting.", correct: false },
            { text: "High Tech Modern Language; it's a programming language for mobile apps.", correct: false },
            { text: "Hypertext Markup Language; it's used to structure and present content on the web.", correct: true }
        ]
    },
    {
        question: "What's the difference between HTML and HTML5?",
        answers: [
            { text: "HTML5 is an older version of HTML.", correct: false },
            { text: "HTML5 includes new elements and APIs for enhanced multimedia and interactivity.", correct: true },
            { text: "HTML doesn't support multimedia elements.", correct: false },
            { text: "HTML is used for server-side scripting.", correct: false }
        ]
    },
    {
        question: "Explain the difference between <div> and <span> elements in HTML, and when might you use each one?",
        answers: [
            { text: "<div> is an inline element, while <span> is a block-level element; use <div> for grouping inline content.", correct: false },
            { text: "<div> is a block-level element, while <span> is an inline element; use <div> for grouping block-level content.", correct: true },
            { text: "<div> is used for creating links, while <span> is used for creating divisions in content.", correct: false },
            { text: "<div> and <span> are used interchangeably; their usage depends on personal preference.", correct: false }
        ]
    },
]

let isAnswerCorrect = true;
let timeLeft = 15;

function updateTime() {
    const timeElement = document.getElementById("time");
    timeElement.textContent = `${timeLeft} S`;
}

function startTime() {
    const timerInterval = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            updateTime();
        } else {
            clearInterval(timerInterval);
            handleNextButton();
        }
    }, 1000);
}

const questionElement = document.getElementById("question"),
    answerButtons = document.getElementById("answerButtons"),
    nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });

    timeLeft = 15;
    updateTime();
    startTime();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
        isAnswerCorrect = false;
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();