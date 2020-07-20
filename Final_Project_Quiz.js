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

var questions = [
    {
        question: 'Who won the Heisman Trophy in 1982?',
        options:
            [
                {
                    option: 'Bo Jackson',
                    correct: false
                },
                {
                    option: 'Doug Flutie',
                    correct: false
                },
                {
                    option: 'Herschel Walker',
                    correct: true
                },
                {
                    option: "Archie Griffin",
                    correct: false
                }
            ]
    },
    {
        question: 'What year was UGA founded?',
        options:
            [
                {
                    option: '1700',
                    correct: false
                },
                {
                    option: '1785',
                    correct: true
                },
                {
                    option: '1802',
                    correct: false
                },
                {
                    option: '1757',
                    correct: false
                }
            ]
    },
    {
        question: 'If you _______, you will not graduate.',
        options:
            [
                {
                    option: '',
                    correct: false
                },
                {
                    option: '',
                    correct: false
                },
                {
                    option: '',
                    correct: false
                },
                {
                    option: 'Walk under the Arch',
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
        question: 'Which of the following is correct about Server Side Events(SSE) in HTML5?',
        options:
            [
                {
                    option: "To use Server-Sent Events in a web application, you would need to add an <eventsource> element to the document.",
                    correct: false
                },
                {
                    option: 'The src attribute of <eventsource> element should point to an URL which should provide a persistent HTTP connection that sends a data stream containing the events.',
                    correct: false
                },
                {
                    option: 'The URL would point to a PHP, PERL or any Python script which would take care of sending event data consistently.',
                    correct: false
                },
                {
                    option: 'All of the above',
                    correct: true
                }
            ]
    },
    {
        question: "Which of the following is true about 'video' tag in HTML5?",
        options:
            [
                {
                    option: "MPEG4 files with H.264 video codec and AAC audio codec are supported.",
                    correct: false
                },
                {
                    option: 'You can use <source> tag to specify media along with media type and many other attributes.',
                    correct: false
                },
                {
                    option: 'An video element allows multiple source elements and browser will use the first recognized format.',
                    correct: false
                },
                {
                    option: 'All of the above',
                    correct: true
                }
            ]
    },
    {
        question: "Which of the following attribute specifies if the user can edit the element's content or not?",
        options:
            [
                {
                    option: "editable",
                    correct: false
                },
                {
                    option: 'contenteditable',
                    correct: true
                },
                {
                    option: 'contextmenu',
                    correct: false
                },
                {
                    option: 'content',
                    correct: false
                }
            ]
    },
    {
        question: "Which of the following attribute triggers event when an element is dragged?",
        options:
            [
                {
                    option: "ondragleave",
                    correct: false
                },
                {
                    option: 'ondrag',
                    correct: true
                },
                {
                    option: 'ondragend',
                    correct: false
                },
                {
                    option: 'ondragenter',
                    correct: false
                }
            ]
    },
    {
        question: "Which of the following attribute triggers event at the start of a drag operation?",
        options:
            [
                {
                    option: "ondragleave",
                    correct: false
                },
                {
                    option: 'ondrag',
                    correct: false
                },
                {
                    option: 'ondragover',
                    correct: false
                },
                {
                    option: 'ondragstart',
                    correct: true
                }
            ]
    },
    {
        question: "Which of the following attribute triggers event when the message is triggered?",
        options:
            [
                {
                    option: "onloadedmetadata",
                    correct: false
                },
                {
                    option: 'onloadstart',
                    correct: false
                },
                {
                    option: 'onmessage',
                    correct: true
                },
                {
                    option: 'onoffline',
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
    localStorage.score = 0;

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
            var score = parseInt(localStorage.score);
            score = score + 10;
            localStorage.score = score;
        }
    }

    var rad = document.getElementsByName('option');

    for (var r = 0; r < rad.length; r++) {
        rad[r].checked = false;
    }
}

function showResult() {
    resultDiv.style.display = "block";
    quizDiv.style.display = "none";
    startButton.style.display = "block";
    var message = document.getElementById('message');

    document.getElementById('score').innerHTML = localStorage.score + "%";

    if(parseInt(localStorage.score) == 90 || parseInt(localStorage.score) == 100){
        message.innerHTML = "Damn Good Dawg";
    }
    else{
        message.innerHTML = "Something witty";
    }
}