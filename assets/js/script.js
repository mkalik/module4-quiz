//script for quiz
var clock = document.querySelector(".timer");
var time;
var check;
function timer() {
  clock.textContent = time;
  check = setInterval(countdown, 1000);
}
function countdown() {
  time--;
  clock.textContent--;
  if (time <= 0) {
    clock.textContent = " ";

    start.style.display = "block";
    q_num = 0;
    time = 6;
    console.log(game_start);
    clearInterval(check);
    if (game_start) {
      console.log("game_end");
      start.setAttribute("style", "display:none");
      game_end();
    }
  }
}
var start = document.querySelector(".start");
var problems = {
  q1: {
    ask: "what does the '%' operator do?",
    answer: [
      "shows the remainder of division",
      "gives the percent of a number",
      "compares float values",
      "breaks out of loops",
    ],
  },
  q2: {
    ask: "test",
    answer: [1, 2, 3, 4],
  },

  q3: {
    ask: "test",
    answer: [1, 2, 3, 4],
  },
  q4: {
    ask: "test",
    answer: [1, 2, 3, 4],
  },
};
var spot = function (left) {
  var r_i = Math.floor(Math.random() * left);
  return r_i;
};
function new_choices(size) {
  for (var x = 0; x < size; x++) {
    options[x].dataset.datatrue = "0";
  }
  choices = [];
  var c_opt = q_keys[q_num].answer.slice();
  console.log("c_opt: " + c_opt);
  console.log("choices size: " + choices.length);
  console.log("answers size: " + answers.length);
  for (var i = 0; i < size; i++) {
    var index = spot(c_opt.length);
    choices.push(c_opt[index]);
    if (c_opt[index] == q_keys[q_num].answer[0]) {
      options[i].dataset.datatrue = "1";
    }
    c_opt.splice(index, 1);
    console.log("index: " + index, "choices: " + choices);
  }

  return choices;
}
var quiz = document.querySelector(".quiz");
var scores = document.querySelector(".view-scores");
var q_keys = Object.values(problems);
var u_right = document.querySelector(".correct");
var options = document.querySelector(".options").children;
var multiple_choice = document.querySelector(".options");
var question = document.querySelector(".ask");
var answers = Array.from(options);
var quiz_end = document.querySelector(".log-scores");
var all_scores = document.querySelector(".all-scores");
var l_scores = document.querySelector(".l_score");
var q_num;
var score;
var picks;
var choices;
var game_start = false;
var user_name;
// var quiz_options = document.querySelector(".quiz-options");

start.addEventListener("click", function (event) {
  event.preventDefault();
  start.setAttribute("style", "display: none");

  game();
  timer();
});

all_scores.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.value == "restart") {
    game();
    timer();
    console.log("local storage size: " + localStorage.length);
    all_scores.setAttribute("style", "display:none");
  }
  if (event.target.value == "clear") {
    while (l_scores.firstChild) {
      l_scores.removeChild(l_scores.firstChild);
    }

    localStorage.clear();

    console.log("local storage size: " + localStorage.length);
    alert("scores cleared");
    all_scores.setAttribute("style", "display:none");
    start.setAttribute("style", "display:block");
  }
});

multiple_choice.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.dataset.datatrue == "1") {
    console.log("correct chosen");
    score += 1;
    u_right.textContent = "Correct!";
    u_right.setAttribute("style", "display:block");
  } else {
    console.log("false");
    u_right.textContent = "Wrong!";
    u_right.setAttribute("style", "display:block");
    score -= 1;
  }
  q_num++;
  if (q_num == q_keys.length) {
    game_end();
  } else {
    game_questions();
  }
});

function game_questions() {
  console.log("q_keys size: " + q_keys.length, "q_num: " + q_num);
  if (q_num == q_keys.length) {
    game_end();
  }
  question.textContent = q_keys[q_num].ask;
  picks = new_choices(answers.length);
  console.log("picks: " + picks);
  for (var i = 0; i < 4; i++) {
    console.log("picks = " + picks[i]);
    if (picks[i] == q_keys[q_num].answer[0]) {
      options[i].dataset.datatrue = "1";
    }
    options[i].textContent = picks[i];
  }
}
function game() {
  // quiz_options.setAttribute("style", "display:none");
  u_right.setAttribute("style", "display:none");
  all_scores.setAttribute("style", "display:none");
  console.log("game start");
  score = 0;
  time = 10;
  q_num = 0;
  game_start = true;
  quiz.setAttribute("style", "display: block");
  game_questions();
}
function game_end() {
  time = 0;
  quiz.setAttribute("style", "display: none");
  quiz_end.setAttribute("style", "display:block");
  console.log("score: " + score);
  quiz_end.children[1].textContent = "your score: " + score;
}
function log_user() {
  quiz_end.setAttribute("style", "display:none");
  user_name = document.forms["info_form"]["user_name"].value;
  console.log(user_name);
  localStorage.setItem(user_name, score);
  view_scores();
}
function new_score(elements) {
  var new_score = document.createElement("li");
  var l_name = localStorage.key(elements);
  new_score.textContent = l_name + "   " + localStorage.getItem(l_name);
  l_scores.appendChild(new_score);
}
function view_scores() {
  var local_size = localStorage.length;
  console.log("local_size: " + local_size);
  for (var i = 0; i < local_size; i++) {
    new_score(i);
  }
  all_scores.setAttribute("style", "display:block");
}
