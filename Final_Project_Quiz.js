document.getElementById("start").addEventListener("click", startQuiz);

var quizDiv = document.getElementById('quiz');
var resultDiv = document.getElementById("results");
quizDiv.style.display = "none";
resultDiv.style.display = "none";

var startButton = document.getElementById("start");

var changeQuestion = 0;
var question = document.getElementById('question');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');

var radio1 = document.getElementById('r1');
var radio2 = document.getElementById('r2');
var radio3 = document.getElementById('r3');
var radio4 = document.getElementById('r4');

var userAnswer;
var i;
var listOfScores = [];
var numberOfTries = 0;
var score = 0;

var questions = [
    {
        question: 'How many Heisman Trophy winners have played for UGA?',
        options:
            [
                {
                    option: '1',
                    correct: false
                },
                {
                    option: '2',
                    correct: true
                },
                {
                    option: '3',
                    correct: false
                },
                {
                    option: "4",
                    correct: false
                }
            ]
    },
    {
        question: 'Although UGA was chartered in ____, classes didn’t begin until 1801.',
        options:
            [
                {
                    option: '1765',
                    correct: false
                },
                {
                    option: '1785',
                    correct: true
                },
                {
                    option: '1795',
                    correct: false
                },
                {
                    option: '1802',
                    correct: false
                }
            ]
    },
    {
        question: 'If you _____, you will not graduate.',
        options:
            [
                {
                    option: "eat in the Founder's Garden",
                    correct: false
                },
                {
                    option: 'swim in the fountains on North Campus',
                    correct: false
                },
                {
                    option: 'fall down the steps of the Main Library',
                    correct: false
                },
                {
                    option: 'walk under the Arch',
                    correct: true
                }
            ]
    },
    {
        question: 'Who was UGA\'s first president?',
        options:
            [
                {
                    option: "Michael F. Adams",
                    correct: false
                },
                {
                    option: 'Charles Melton Snelling',
                    correct: false
                },
                {
                    option: 'Abraham Baldwin',
                    correct: true
                },
                {
                    option: 'Omer Clyde Aderhold',
                    correct: false
                }
            ]
    },
    {
        question: 'How many seats are in Sanford Stadium?',
        options:
            [
                {
                    option: "88,500",
                    correct: false
                },
                {
                    option: '65,345',
                    correct: false
                },
                {
                    option: '105,500',
                    correct: false
                },
                {
                    option: '92,746',
                    correct: true
                }
            ]
    },
    {
        question: "What was UGA's first mascot?",
        options:
            [
                {
                    option: "Horse",
                    correct: false
                },
                {
                    option: 'Bulldog',
                    correct: false
                },
                {
                    option: 'Chicken',
                    correct: false
                },
                {
                    option: 'Goat',
                    correct: true
                }
            ]
    },
    {
        question: "What do the three pillars of the arch stand for?",
        options:
            [
                {
                    option: "Knowledge, education, and research",
                    correct: false
                },
                {
                    option: 'Wisdom, justice, and moderation',
                    correct: true
                },
                {
                    option: 'Wisdom, logic, and equality',
                    correct: false
                },
                {
                    option: 'Knowledge, power, and wisdom',
                    correct: false
                }
            ]
    },
    {
        question: "How many schools/colleges does UGA have?",
        options:
            [
                {
                    option: "20",
                    correct: false
                },
                {
                    option: '17',
                    correct: true
                },
                {
                    option: '22',
                    correct: false
                },
                {
                    option: '12',
                    correct: false
                }
            ]
    },
    {
        question: "Who was the first African American admitted to UGA?",
        options:
            [
                {
                    option: "Charlayne Hunter",
                    correct: false
                },
                {
                    option: 'Hamilton Holmes',
                    correct: false
                },
                {
                    option: 'Mary Frances Early',
                    correct: false
                },
                {
                    option: 'A and B',
                    correct: true
                }
            ]
    },
    {
        question: "It is tradition to _____ when the UGA Bulldawgs win a home football game.",
        options:
            [
                {
                    option: "rush the hedges in Sanford Stadium",
                    correct: false
                },
                {
                    option: 'call the dawgs',
                    correct: false
                },
                {
                    option: 'ring the Chapel Bell',
                    correct: true
                },
                {
                    option: 'sing UGA\'s alma mater',
                    correct: false
                }
            ]
    }
];

function startQuiz() {
    quizDiv.style.display = "block";
    resultDiv.style.display = "none";
    startButton.style.display = "none";
    document.getElementById("nextButton").innerHTML = "Next";
    changeQuestion = 0;
    score = 0;

    showQuestion();
}

function decideNextOrFinish() {
    var getBtn = document.getElementById("nextButton").innerHTML;

    if (getBtn === "Next") {
        if (!isFormValid()) {
            alert("You must choose any Option");
        }
        else {
            checkAnswer();
            changeQuestion++;
            showQuestion();
        }
    }
    else if (getBtn === 'Finish') {
        if (!isFormValid()) {
            alert("You must choose any Option");
        }
        else {
            checkAnswer();
            showResult();
        }
    }
}

function isFormValid(){
    var radios = document.getElementsByName("option");
    var formValid = false;
    var i = 0;

    while (!formValid && i < radios.length) {
        if (radios[i].checked) {
            formValid = true;
        }
        i++;
    }

    return formValid;
}

function showQuestion() {
    document.getElementById("nextButton").addEventListener("click", decideNextOrFinish);
    for (i = changeQuestion; i < questions.length; i++) {
        question.innerHTML = questions[i].question;
        option1.innerHTML = questions[i].options[0].option;
        option2.innerHTML = questions[i].options[1].option;
        option3.innerHTML = questions[i].options[2].option;
        option4.innerHTML = questions[i].options[3].option;

        radio1.value = questions[i].options[0].option;
        radio2.value = questions[i].options[1].option;
        radio3.value = questions[i].options[2].option;
        radio4.value = questions[i].options[3].option;

        break;
    }

    if (changeQuestion === 9) {
        document.getElementById("nextButton").innerHTML = "Finish";
    }
}

function checkAnswer() {
    var radios = document.getElementsByName("option");

    for (var k = 0; k < radios.length; k++) {
        if (radios[k].checked) {
            userAnswer = radios[k].value;
        }
    }

    for (var l = 0; l < 4; l++) {
        if (questions[i].options[l].option === userAnswer && questions[i].options[l].correct === true) {
            score = score + 10;
        }
    }

    var rad = document.getElementsByName('option');

    for (var r = 0; r < rad.length; r++) {
        rad[r].checked = false;
    }
}

function showResult() {
    numberOfTries++;
    listOfScores.push([numberOfTries, score]); 
    localStorage.setItem("listOfScores", JSON.stringify(listOfScores)); //add listOfScores to local storage
    console.log(JSON.parse(localStorage.getItem("listOfScores")));

    resultDiv.style.display = "block";
    quizDiv.style.display = "none";
    startButton.style.display = "block";
    startButton.innerHTML = "Try Again!";
    var message = document.getElementById('message');

    document.getElementById('score').innerHTML = score + "%";

    if(parseInt(score) == 90 || parseInt(score) == 100){
        message.innerHTML = "Congratulations.  You're a Damn Good Dawg!";
        graphic.innerHTML =  "<a href='https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif'><img src='https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif</p>";
    }
    else if(parseInt(score) == 70 || parseInt(score) == 80){
        message.innerHTML = "You may be a better fit for the North Avenue Trade School.";
        graphic.innerHTML =  "<a href='https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif'><img src='https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif</p>";
    }
    else if(parseInt(score) == 50 || parseInt(score) == 60){
        message.innerHTML = "I've heard that Auburn usually takes UGA\'s rejects (especially in football).";
        graphic.innerHTML =  "<a href='https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif'><img src='https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif</p>";
    }
    else{
        message.innerHTML = "Just put on some jorts, grow a mullett, and move to Florida aleady.";
        graphic.innerHTML =  "<a href='https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif'><img src='https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif</p>";
    }
}