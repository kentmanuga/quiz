document.getElementById("start").addEventListener("click", startQuiz);

var quizDiv = document.getElementById('quiz');
var resultDiv = document.getElementById("results");
quizDiv.style.display = "none";
resultDiv.style.display = "none";

var startButton = document.getElementById("start");

var score = 0;
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

function startQuiz() {
    quizDiv.style.display = "block";
    resultDiv.style.display = "none";
    startButton.style.display = "none";
    document.getElementById("nextButton").innerHTML = "Next";
    changeQuestion = 0;
    score = 0;

    showQuestion();
}


var questions = [
    {
        question: 'HTML tags are case sensitive.',
        options:
            [
                {
                    option: 'Yes',
                    correct: false
                },
                {
                    option: 'No',
                    correct: true
                },
                {
                    option: 'Few',
                    correct: false
                },
                {
                    option: "I don't know",
                    correct: false
                }
            ]
    },
    {
        question: 'Which of the following tag represents the header of a section in HTML5?',
        options:
            [
                {
                    option: 'section',
                    correct: false
                },
                {
                    option: 'header',
                    correct: true
                },
                {
                    option: 'article',
                    correct: false
                },
                {
                    option: 'aside',
                    correct: false
                }
            ]
    },
    {
        question: 'Which of the following is correct about Web form 2.0 in HTML5?',
        options:
            [
                {
                    option: 'Web Forms 2.0 is an extension to the forms features found in HTML4.',
                    correct: false
                },
                {
                    option: 'Form elements and attributes in HTML5 provide a greater degree of semantic mark-up than HTML4.',
                    correct: false
                },
                {
                    option: 'Form elements and attributes in HTML5 remove a great deal of the need for tedious scripting and styling that was required in HTML4.',
                    correct: false
                },
                {
                    option: 'All of the above',
                    correct: true
                }
            ]
    },
    {
        question: 'Which of the following is true about Local Storage in HTML5?',
        options:
            [
                {
                    option: "HTML5 introduces the localStorage attribute which would be used to access a page's local storage area without no time limit.",
                    correct: false
                },
                {
                    option: 'This local storage will be available whenever you would use that page.',
                    correct: false
                },
                {
                    option: 'Both of the above.',
                    correct: true
                },
                {
                    option: 'None of the above',
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

var i;

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

var userAnswer;

function checkAnswer() {
    var radios = document.getElementsByName("option");

    for (var k = 0; k < radios.length; k++) {
        if (radios[k].checked) {
            userAnswer = radios[k].value;
        }
    }

    for (var l = 0; l < 4; l++) {
        if (questions[i].options[l].option === userAnswer && questions[i].options[l].correct === true) {
            score = score + 10
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

    document.getElementById('score').innerHTML = score + "%";
}