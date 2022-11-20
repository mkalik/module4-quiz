//script for quiz
var clock = document.querySelector(".timer");
var time = 6;
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
    quiz.setAttribute("style", "display: none");
    start.style.display = "block";
    q_num = 0;
    time = 6;
    clearInterval(check);
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
var quiz = document.querySelector(".game");
var scores = document.querySelector(".view-scores");
var q_keys = Object.values(problems);
var q_num = 0;
var u_right = document.querySelector(".correct");
var options = document.querySelector(".options").children;
var question = document.querySelector(".ask");
var answers = Array.from(options);
var score = 0;
var picks;
var choices;
document.querySelector(".options").addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.dataset.datatrue == "1") {
    console.log("correct chosen");
    score += 1;
    q_num++;
    u_right.textContent = "Correct!";
    u_right.setAttribute("style", "display:block");
    game_questions();
  } else {
    console.log("false");
    u_right.textContent = "Wrong!";
    u_right.setAttribute("style", "display:block");
    score -= 1;
    q_num++;
  }
});
function game_questions() {
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
  console.log("game start");
  quiz.setAttribute("style", "display: block");
  game_questions();
}
start.addEventListener("click", function (event) {
  console.log(q_keys);
  event.preventDefault();
  start.setAttribute("style", "display: none");
  q_num = 0;
  timer();
  game();
});
