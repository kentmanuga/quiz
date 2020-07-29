//add event listener to start button
var startButton = document.getElementById("start");
startButton.addEventListener("click", startQuiz);

//set various global variables that are used throughout the javascript code
var quizDiv = document.getElementById('quiz');
var resultDiv = document.getElementById("results");
quizDiv.style.display = "none";
resultDiv.style.display = "none";

var question = document.getElementById('question');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var option4 = document.getElementById('option4');

var radio1 = document.getElementById('r1');
var radio2 = document.getElementById('r2');
var radio3 = document.getElementById('r3');
var radio4 = document.getElementById('r4');

var changeQuestion = 0;
var userAnswer;
var i;
var listOfScores = [];
var numberOfTries = 0;
var score = 0;

//This is used to make the chart responsive on mobile
window.onresize = function(){
    if (i == 9) {
        drawChart();
    }
};

//array of questions
var questions = [
    {
        question: 'How many Heisman Trophy winners have played for UGA?',
        options:
            [
                {
                    option: 'A: 1',
                    correct: false
                },
                {
                    option: 'B: 2',
                    correct: true
                },
                {
                    option: 'C: 3',
                    correct: false
                },
                {
                    option: 'D: 4',
                    correct: false
                }
            ]
    },
    {
        question: 'Although UGA was chartered in ____, classes didn’t begin until 1801.',
        options:
            [
                {
                    option: 'A: 1765',
                    correct: false
                },
                {
                    option: 'B: 1785',
                    correct: true
                },
                {
                    option: 'C: 1795',
                    correct: false
                },
                {
                    option: 'D: 1802',
                    correct: false
                }
            ]
    },
    {
        question: 'If you _____, you will not graduate.',
        options:
            [
                {
                    option: "A: eat in the Founder's Garden",
                    correct: false
                },
                {
                    option: 'B: swim in the fountains on North Campus',
                    correct: false
                },
                {
                    option: 'C: fall down the steps of the Main Library',
                    correct: false
                },
                {
                    option: 'D: walk under the Arch',
                    correct: true
                }
            ]
    },
    {
        question: 'Who was UGA\'s first president?',
        options:
            [
                {
                    option: 'A: Michael F. Adams',
                    correct: false
                },
                {
                    option: 'B: Charles Melton Snelling',
                    correct: false
                },
                {
                    option: 'C: Abraham Baldwin',
                    correct: true
                },
                {
                    option: 'D: Omer Clyde Aderhold',
                    correct: false
                }
            ]
    },
    {
        question: 'How many seats are in Sanford Stadium?',
        options:
            [
                {
                    option: 'A: 88,500',
                    correct: false
                },
                {
                    option: 'B: 65,345',
                    correct: false
                },
                {
                    option: 'C: 105,500',
                    correct: false
                },
                {
                    option: 'D: 92,746',
                    correct: true
                }
            ]
    },
    {
        question: "What was UGA's first mascot?",
        options:
            [
                {
                    option: 'A: Horse',
                    correct: false
                },
                {
                    option: 'B: Bulldog',
                    correct: false
                },
                {
                    option: 'C: Chicken',
                    correct: false
                },
                {
                    option: 'D: Goat',
                    correct: true
                }
            ]
    },
    {
        question: "What do the three pillars of the arch stand for?",
        options:
            [
                {
                    option: 'A: Knowledge, education, and research',
                    correct: false
                },
                {
                    option: 'B: Wisdom, justice, and moderation',
                    correct: true
                },
                {
                    option: 'C: Wisdom, logic, and equality',
                    correct: false
                },
                {
                    option: 'D: Knowledge, power, and wisdom',
                    correct: false
                }
            ]
    },
    {
        question: "How many schools/colleges does UGA have?",
        options:
            [
                {
                    option: 'A: 20',
                    correct: false
                },
                {
                    option: 'B: 17',
                    correct: true
                },
                {
                    option: 'C: 22',
                    correct: false
                },
                {
                    option: 'D: 12',
                    correct: false
                }
            ]
    },
    {
        question: "Who was the first African American admitted to UGA?",
        options:
            [
                {
                    option: 'A: Charlayne Hunter',
                    correct: false
                },
                {
                    option: 'B: Hamilton Holmes',
                    correct: false
                },
                {
                    option: 'C: Mary Frances Early',
                    correct: false
                },
                {
                    option: 'D: A and B',
                    correct: true
                }
            ]
    },
    {
        question: "It is tradition to _____ when the UGA Bulldawgs win a home football game.",
        options:
            [
                {
                    option: 'A: rush the hedges in Sanford Stadium',
                    correct: false
                },
                {
                    option: 'B: call the dawgs',
                    correct: false
                },
                {
                    option: 'C: ring the Chapel Bell',
                    correct: true
                },
                {
                    option: 'D: sing UGA\'s alma mater',
                    correct: false
                }
            ]
    }
];

//start the quiz
function startQuiz() {
    quizDiv.style.display = "block";
    resultDiv.style.display = "none";
    startButton.style.display = "none";
    document.getElementById("nextButton").innerHTML = "Next";
    changeQuestion = 0;
    score = 0;

    showQuestion();
}

//decide if you're on questions 1-9 or on the last one
function decideNextOrFinish() {
    var getBtn = document.getElementById("nextButton").innerHTML;

    if (getBtn === "Next") {
        if (!hasAnswered()) {
            alert("You must choose any Option");
        }
        else {
            checkAnswer();
            changeQuestion++;
            showQuestion();
        }
    }
    else if (getBtn === 'Finish') {
        if (!hasAnswered()) {
            alert("You must choose any Option");
        }
        else {
            checkAnswer();
            showResult();
        }
    }
}

//checks if you've answered a question when you click 'next' or 'finish'
function hasAnswered() {
    var radios = document.getElementsByName("option");
    var answered = false;
    var i = 0;

    while (!answered && i < radios.length) {
        if (radios[i].checked) {
            answered = true;
        }
        i++;
    }

    return answered;
}

//show the question
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

//check if the answer is correct or incorrect
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

//show results
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

    //show message and gif depending on score
    if (parseInt(score) == 90 || parseInt(score) == 100) {
        message.innerHTML = "Congratulations.  You're a Damn Good Dawg!";
        graphic.innerHTML = "<a href='https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif' target='_blank'><img src='https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media1.giphy.com/media/4NcZd4mbuB3FYrltvb/source.gif</p>";
    }
    else if (parseInt(score) == 70 || parseInt(score) == 80) {
        message.innerHTML = "You may be a better fit for the North Avenue Trade School.";
        graphic.innerHTML = "<a href='https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif' target='_blank'><img src='https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media1.giphy.com/media/1fowHgj5JNotFwFdjv/giphy.gif?cid=ecf05e47a2225e01b92375a9caa75c5a4f8bf0dbcdc209a8&rid=giphy.gif</p>";
    }
    else if (parseInt(score) == 50 || parseInt(score) == 60) {
        message.innerHTML = "I've heard that Auburn usually takes UGA's rejects (especially in football).";
        graphic.innerHTML = "<a href='https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif' target='_blank'><img src='https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media3.giphy.com/media/kgS4DYOnNRcmwlmEOB/giphy.gif?cid=ecf05e4731f725388a82300b0bbeb99f6ba7134b82ecab31&rid=giphy.gif</p>";
    }
    else {
        message.innerHTML = "Just put on some jorts, grow a mullett, and move to Florida aleady.";
        graphic.innerHTML = "<a href='https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif' target='_blank'><img src='https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif' class='img-fluid' alt='Responsive image'></a><p style='font-size: 8px; color: gray;'>image source: https://media3.giphy.com/media/fseSlavoqVi08qN7P9/giphy.gif</p>";
    }


    google.charts.load('visualization', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawChart);
}

//use Google API to render chart each time you finish the quiz
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Score');

    data.addRows(JSON.parse(localStorage.getItem("listOfScores")));

    var interval = 1;
    var hTicks = [];
    for (var i = 1; i <= numberOfTries; i = i + interval) {
        hTicks.push(i);
    }

    var options = {
        title: "Your Scores",
        hAxis: {
            title: 'Attempts',
            ticks: hTicks
        },
        vAxis: {
            title: 'Score',
            ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        backgroundColor: '#C0C0C0',
        colors: ['red'],
        lineWidth: 5,
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}