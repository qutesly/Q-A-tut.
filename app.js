
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: "false"},
            {text: "Blue Whale", correct: "true"},
            {text: "Elephant", correct: "false"},
            {text: "Giraffe", correct: "false"},
        ]
    }, 
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: "true"},
            {text: "Bhutan", correct: "false"},
            {text: "Nepal", correct: "false"},
            {text: "Sri Lanka", correct: "false"},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: "false"},
            {text: "Gobi", correct: "false"},
            {text: "Sahara", correct: "true"},
            {text: "Antartica", correct: "false"},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: "false"},
            {text: "Australia", correct: "true"},
            {text: "Arctic", correct: "false"},
            {text: "Africa", correct: "false"},
        ]
    }
];


const questionText = document.getElementById('question');
const answerBtns = document.querySelector('#answer-buttons');
const nextBtn = document.querySelector('#next-btn');


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;

    questionText.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;

        answerBtns.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer)

    });
}

function resetState(){
    nextBtn.style.display = 'none';
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e){
    const selectAnswer = e.target;
    const isCorrect = selectAnswer.dataset.correct === 'true';

    if(isCorrect){
        selectAnswer.classList.add('correct');
        score++;
    }else{
        selectAnswer.classList.add('incorrect');
    }

    Array.from(answerBtns.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }

        button.disabled = true;
        nextBtn.style.display = 'block';
    });
}

function showScore(){
    resetState();
    questionText.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = `PlayAgain`;
    nextBtn.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();

