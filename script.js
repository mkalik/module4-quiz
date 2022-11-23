//script for quiz
var clock = document.querySelector(".timer");
var time = 30;
var check;
function timer(time) {
  clock.textContent = time;
  check = setInterval(countdown, 1000);
}
function update_clock() {
  clock.innerHTML = time;
}
function countdown() {
  time--;
  update_clock();
  if (time <= 0) {
    quiz.setAttribute("style", "display:none");
    clock.textContent = " ";
    q_num = 0;
    time = 30;
    // console.log(game_start);
    clearInterval(check);
    if (game_start) {
      console.log("game_end");
      game_end();
    } else {
      console.log("view scores clicked");
    }
  }
  console.log("time");
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
    ask: "where should a java script tag be placed in html?",
    answer: [
      "within the body",
      "within the head",
      "before the body but below the head",
      "below the body but above the closing html tag",
    ],
  },

  q3: {
    ask: "what method is considered unsafe when removing elements from an array?",
    answer: ["delete", "splice", "pop", "shift"],
  },
  q4: {
    ask: "are semicolons necessary at the end of each line in javascript?",
    answer: [
      "no but they are a good practice",
      "yes as code wont work without them",
      "only at the end of function declarations",
      "only if a variable is declared",
    ],
  },
  q5: {
    ask: "how do you declare a variable in javascript?",
    answer: [
      "var name_of_var",
      "type name_of_var",
      "make name_of_var",
      "init name_of_var",
    ],
  },
  q6: {
    ask: "can javascript change html elements?",
    answer: [
      "absolutely",
      "definitely not",
      "only if the element is a div",
      "only when javascript option has been checked",
    ],
  },
  q7: {
    ask: "how do you declare an if statement?",
    answer: [
      "if(condition){'code'}",
      "if{'code'}(condition)",
      "{'code'}if(condition)",
      "{'code'}(condition)if",
    ],
  },
  q8: {
    ask: "what is the purpose of an else statement?",
    answer: [
      "alternate code to run when 'if' statement doesnt run",
      "get rid of random data",
      "a means of switching to a different line of code",
      "no purpose",
    ],
  },
  q9: {
    ask: "how can you access an element html element in javascript?",
    answer: [
      "document.querySelector('x')",
      "document.getItem.HTML('x')",
      "HTML.grab.element('x')",
      "var x = HTML.element('x')",
    ],
  },
  q10: {
    ask: "is javascript required to build a site?",
    answer: [
      "only when you want to implement complex websites",
      "its a neccessity, cant be done without it",
      "only when there isnt a css file specified",
      "not at all, its but an extraenous tool of no importance",
    ],
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
    // console.log("index: " + index, "choices: " + choices);
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
var leaderboard = 0;
var name_score;

// var quiz_options = document.querySelector(".quiz-options");
scores.addEventListener("click", function (event) {
  event.preventDefault(event);
  start.setAttribute("style", "display: none");
  // console.log(localStorage.length);
  console.log(localStorage);
  if (localStorage.length == 0) {
    alert("no scores to display!");
    window.location.reload();
  } else {
    quiz_end.setAttribute("style", "display:none");
    view_scores();
  }
});
start.addEventListener("click", function (event) {
  event.preventDefault();
  start.setAttribute("style", "display: none");
  game();
  timer(time);
});

all_scores.addEventListener("click", function (event) {
  event.preventDefault();
  game_start = false;
  if (event.target.value == "return") {
    console.log("local storage size: " + localStorage.length);
    all_scores.setAttribute("style", "display:none");
    start.setAttribute("style", "display:block");
  }
  if (event.target.value == "clear") {
    while (l_scores.firstChild) {
      l_scores.removeChild(l_scores.firstChild);
    }

    localStorage.clear();
    alert("scores cleared");
    window.location.reload();
    all_scores.setAttribute("style", "display:none");
  }
  // console.log("local storage size: " + localStorage.length);
});

multiple_choice.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(time);
  if (event.target.dataset.datatrue == "1") {
    // console.log("correct chosen");
    score += 1;
    u_right.textContent = "Correct!";
    u_right.setAttribute("style", "display:block");
    q_num++;
  } else {
    // console.log("false");
    u_right.textContent = "Wrong!";
    u_right.setAttribute("style", "display:block");
    // score -= 1;
    time -= 5;
    if (time < 0) {
      time = "";
      game_end();
    }
    update_clock();
    console.log("time after wrong: " + time);
    q_num++;
  }
  if (q_num == q_keys.length) {
    game_end();
  } else {
    game_questions();
  }
});
function game_questions() {
  question.textContent = q_keys[q_num].ask;
  picks = new_choices(answers.length);
  // console.log("picks: " + picks);
  for (var i = 0; i < 4; i++) {
    // console.log("picks = " + picks[i]);
    if (picks[i] == q_keys[q_num].answer[0]) {
      options[i].dataset.datatrue = "1";
    }
    options[i].textContent = picks[i];
  }
}
function game() {
  // quiz_options.setAttribute("style", "display:none");
  start.setAttribute("style", "display:none");
  u_right.setAttribute("style", "display:none");
  all_scores.setAttribute("style", "display:none");
  console.log("game start");
  score = 0;
  time = 30;
  q_num = 0;
  game_start = true;
  quiz.setAttribute("style", "display: block");
  game_questions();
}
function game_end() {
  var game_over = document.querySelector(".quiz-over");
  time = 0;
  if (q_num == 10) {
    game_over.innerHTML = "All Done!";
  } else {
    game_over.innerHTML = "Game over!";
  }

  quiz.setAttribute("style", "display: none");
  quiz_end.setAttribute("style", "display:block");
  // console.log("score: " + score);
  quiz_end.children[1].textContent = "your score: " + score;
}
function clear_field() {
  document.querySelector(".user-name").value = "";
}
function log_user() {
  quiz_end.setAttribute("style", "display:none");
  var user_name = document.querySelector(".user-name").value;
  console.log(user_name);
  localStorage.setItem(user_name, score);
  new_score(user_name, score);
}
function new_score(u, s) {
  var new_score = document.createElement("li");
  new_score.textContent = u + " | " + s;
  l_scores.appendChild(new_score);
  leaderboard++;
  view_scores();
}
function view_scores() {
  var local_size = localStorage.length;
  console.log(JSON.stringify(localStorage));
  console.log("local_size: " + local_size);
  console.log("leaderboard: " + leaderboard);
  console.log(l_scores.childElementCount);
  if (l_scores.childElementCount == 0) {
    for (var i = localStorage.length - 1; i >= 0; i--) {
      var l_key = localStorage.key(i);
      new_score(l_key, localStorage.getItem(l_key));
    }
  }

  all_scores.setAttribute("style", "display:block");
}
