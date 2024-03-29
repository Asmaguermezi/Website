function Question(title, answers, correct) {

    this.title = title;
    this.answers = answers;
    this.correct = correct;

    this.getElement= function() {
        let questionTitle = document.createElement("h2");
        questionTitle.textContent = `Question ${ quiz.currentQuestion+1 }/${ quiz.questions.length }`;
        questionTitle.classList.add('quiz-subtitle');
        questionscreen.appendChild(questionTitle);
        let questionSubtitle = document.createElement("h3");
        questionSubtitle.textContent = this.title;
        questionSubtitle.classList.add('quiz-subtitle');
        questionscreen.appendChild(questionSubtitle);
        let answersElement = document.createElement("ul");
        answersElement.classList.add('answers');
        this.answers.forEach((answer, index) => {
            let answerElement = document.createElement("li");
            answerElement.classList.add('answer');
            answerElement.textContent = answer;
            answerElement.id = index;
            answersElement.appendChild(answerElement);
            answerElement.addEventListener('click', this.checkAnswer)
        });
        questionscreen.appendChild(answersElement);
    };

    this.checkAnswer = (event) => {
        let answerSelected = event.target;
        if(answerSelected.id == this.correct) {
            answerSelected.classList.add("answer-correct");
            quiz.note += 1;
            console.log(quiz.note);
        } else {
            answerSelected.classList.add("answer-wrong");
            let correctAnswer = document.getElementById(this.correct);
            correctAnswer.classList.add("answer-correct");
        }
        setTimeout(() => {
            questionscreen.textContent = "";
            quiz.currentQuestion += 1;
            quiz.showCurrentQuestion();
        }, 1000);
    }

}

function Quiz() {

    this.questions = [];
    this.note = 0;
    this.currentQuestion = 0;

    this.addQuestion = function() {
        for (const argument of arguments) {
            this.questions.push(argument);
        }
    }

    this.showCurrentQuestion = function() {
        if(this.currentQuestion < this.questions.length) {
            this.questions[this.currentQuestion].getElement();
        } else {
            questionscreen.style.display = "none";
            resultscreen.style.display = "block";
            spanNbCorrects.textContent = quiz.note;
        }
    }
}

let quiz = new Quiz();

let question1 = new Question("Which planet is known as the 'Red Planet", ["Mars", "Venus", "Jupiter", "Mercury"], 0);
let question2 = new Question("Which element has the chemical symbol 'Fe'?", ["Silver", "Iron", "Gold", "Copper"], 1);
let question3 = new Question("What is the chemical symbol for water?", ["H2O", "CO2", "NaCl", "CaCO3"], 0);
let question4 = new Question("What is the capital of Canada?", ["Toronto", "Ottawa", "Montreal", "Vancouver"], 1);



quiz.addQuestion(question1, question2, question3, question4);

let spanNbCorrects = document.getElementById('nbcorrects');
let spanNbQuestions = document.getElementsByClassName('nbquestions');
let welcomeButton = document.getElementById('welcome-btn');
let screenWelcome = document.getElementById('welcomescreen');
let questionscreen = document.getElementById('questionscreen');
let resultscreen = document.getElementById('resultscreen');

spanNbQuestions[0].textContent = quiz.questions.length;

let seeFirstQuestion = () => {
    screenWelcome.style.display = "none";
    questionscreen.style.display = "block";
    quiz.showCurrentQuestion();
}

welcomeButton.addEventListener('click', seeFirstQuestion);

spanNbQuestions[1].textContent = quiz.questions.length;