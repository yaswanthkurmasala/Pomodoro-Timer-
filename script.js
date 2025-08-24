const workDuration = 25 * 60;      // 25 minutes
const shortBreak = 5 * 60;         // 5 minutes
const longBreak = 15 * 60;         // 15 minutes
let sessionCount = 0;
let timeLeft = workDuration;
let totalSessionTime = workDuration;
let timer = null;
let isRunning = false;
let sessionType = 'Work';


const timerText = document.getElementById('timer');
const sessionDisplay = document.getElementById('sessionType');
const sessionProgress = document.getElementById('sessionProgress');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const circle = document.querySelector('.progress-ring-circle');

const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;


function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  timerText.textContent = formatTime(timeLeft);
  sessionDisplay.textContent = sessionType;
  sessionProgress.textContent = `${Math.min(sessionCount + (sessionType === 'Work' ? 1 : 0), 4)}/4`;
  updateCircle();
}

function updateCircle() {
  const percent = timeLeft / totalSessionTime;
  const offset = circumference * (1 - percent);
  circle.style.strokeDashoffset = offset;
}


function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      switchSession();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  sessionType = 'Work';
  timeLeft = workDuration;
  totalSessionTime = workDuration;
  sessionCount = 0;
  updateDisplay();
}


function switchSession() {
  if (sessionType === 'Work') {
    sessionCount++;

    if (sessionCount % 4 === 0) {
      sessionType = 'Long Break';
      timeLeft = longBreak;
      totalSessionTime = longBreak;
    } else {
      sessionType = 'Short Break';
      timeLeft = shortBreak;
      totalSessionTime = shortBreak;
    }
  } else {
    sessionType = 'Work';
    timeLeft = workDuration;
    totalSessionTime = workDuration;

    if (sessionCount % 4 === 0) {
      sessionCount = 0;  // Reset session cycle after 4/4
    }
  }

  updateDisplay();
  startTimer();
}


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);


updateDisplay();