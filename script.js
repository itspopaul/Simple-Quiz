const questions = [
    {
        question: "Where is the Great Barrier Reef located? ",
        answers: [
            {text: "Japan", correct: false},
            {text: "Australia", correct: true},
            {text: "California", correct: false},
            {text: "Philippines", correct: false},
        ]
    },
    {
        question: "In Greek Mythology, who is the Queen of the Underworld and wife of Hades? ",
        answers: [
            {text: "Persephone", correct: true},
            {text: "Persephona", correct: false},
            {text: "CPersephoni", correct: false},
            {text: "PPersephonu", correct: false},
        ]
    },
    {
        question: "What was the name of the Robin Williams film where he dresses up as an elderly British nanny?",
        answers: [
            {text: "Mrs. Doubtwater", correct: false},
            {text: "Persep Mrs. Doubtfirehona", correct: false},
            {text: "Mrs. Doubtstone", correct: false},
            {text: "Mrs. Doubtfire", correct: true},
        ]
    },
    {
    question: "What is the rarest blood type?",
        answers: [
            {text: "AB", correct: false},
            {text: "O+", correct: false},
            {text: "AB-Negative", correct: true},
            {text: "C#", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    // to display the answers

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);

    // Click Functions
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        
        // increase the score by 1
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

    }

    // define showScore

    function showScore(){
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }


    // define handleNextButton Funtion

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
        
    }


 // funtion for "NEXT" button

 nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 });

startQuiz();