//initial variables
let countdown = 0;
let seconds = 1500; 
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

const timerLabel = document.querySelector("#timer-label");
const timeLeft = document.querySelector("#time-left");
const startStop = document.querySelector("#start_stop");
const resetAll = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

//sound effect when time's up
const timeUp = document.createElement('audio');
timeUp.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


//event listeners
startStop.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})

resetAll.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
})

//countdown magic happens here
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    timeUp.currentTime = 0;
    timeUp.play();
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
}

//changing work/break times
let changeBy = 5;

let upDownFunctions =
    {"#session-increment": function () { workTime = Math.min(workTime + changeBy, 60)},
     "#session-decrement": function () { workTime = Math.max(workTime - changeBy, 5)},
     "#break-increment": function () { breakTime = Math.min(breakTime + changeBy, 60)},
     "#break-decrement": function () { breakTime = Math.max(breakTime - changeBy, 5)}};

for (var key in upDownFunctions) {
    if (upDownFunctions.hasOwnProperty(key)) {
      document.querySelector(key).onclick = upDownFunctions[key];
    }
}

//updating the HTML
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timeLeft.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

//control image based on whether timer is paused or not
function pikachu(){
  isPaused ? startStop.src="https://image.ibb.co/mxy1zv/pikasleep.gif" : startStop.src="https://image.ibb.co/ktw8MG/pikatwitch.gif";
}

function updateHTML() {
  countdownDisplay();
  isBreak ? timerLabel.textContent = "Time for work!" : timerLabel.textContent = "It's break time, baby!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;  
}

window.setInterval(updateHTML, 100);

startStop.addEventListener("click", updateHTML);
startStop.addEventListener("click", pikachu);
