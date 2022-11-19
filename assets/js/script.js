//script for quiz
var clock = document.querySelector("#timer");
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
    time = 6;
    clearInterval(check);
  }
}
var start = document.querySelector("#start");
start.addEventListener("click", function (event) {
  start.setAttribute("style", "display: none");
  event.preventDefault();
  game();
  timer();
});
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
};
var quiz = document.querySelector(".game");
var scores = document.querySelector("#view-scores");
function game() {
  quiz.setAttribute("style", "display: block");
  var options = document.querySelector(".options").children;
  var question = document.querySelector("#ask");
  var answers = Array.from(options);
  console.log(problems.q1.ask);
  question.textContent = problems.q1.ask;
  for (var x in answers) {
    console.log(answers[x]);
    answers[x].textContent = problems.q1.answer[x];
  }
}
