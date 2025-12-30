const WORK_DURATION_MIN = 25;
const BREAK_DURATION_MIN = 5;
const SECONDS_PER_MINUTE = 60;
const CIRCLE_LENGTH = 565;

let workDuration = WORK_DURATION_MIN * SECONDS_PER_MINUTE;
let breakDuration = BREAK_DURATION_MIN * SECONDS_PER_MINUTE;
let totalTime = workDuration;
let remainingTime = totalTime;
let timerId = null;
let isWorkSession = true;
let completedSessions = 0;

const timeDisplay = document.getElementById("timeDisplay");
const modeText = document.getElementById("modeText");
const sessionCount = document.getElementById("sessionCount");
const progressCircle = document.querySelector(".circle-progress");
const alertSound = document.getElementById("alertSound");

const updateUI = () => {
    const minutes = Math.floor(remainingTime / SECONDS_PER_MINUTE);
    const seconds = remainingTime % SECONDS_PER_MINUTE;

    timeDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const progressOffset =
        CIRCLE_LENGTH - (remainingTime / totalTime) * CIRCLE_LENGTH;

    progressCircle.style.strokeDashoffset = progressOffset;
};

const startTimer = () => {
    if (timerId) return;

    timerId = setInterval(() => {
        remainingTime--;

        if (remainingTime <= 0) {
            handleSessionEnd();
        }

        updateUI();
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(timerId);
    timerId = null;
};

const resetTimer = () => {
    pauseTimer();
    remainingTime = totalTime;
    updateUI();
};

const handleSessionEnd = () => {
    alertSound.play();
    pauseTimer();

    if (isWorkSession) {
        completedSessions++;
        sessionCount.textContent = completedSessions;
        totalTime = breakDuration;
        modeText.textContent = "Break Time";
    } else {
        totalTime = workDuration;
        modeText.textContent = "Work Session";
    }

    isWorkSession = !isWorkSession;
    remainingTime = totalTime;
    updateUI();
    startTimer();
};

const setCustomDuration = () => {
    const inputValue = Number(document.getElementById("customMinutes").value);

    if (!Number.isInteger(inputValue) || inputValue < 1 || inputValue > 60) {
        alert("Please enter a number between 1 and 60.");
        return;
    }

    pauseTimer();
    workDuration = inputValue * SECONDS_PER_MINUTE;
    totalTime = workDuration;
    remainingTime = totalTime;
    isWorkSession = true;
    modeText.textContent = "Work Session";
    updateUI();
};

const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
};

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("setCustomBtn").addEventListener("click", setCustomDuration);
document.getElementById("darkToggle").addEventListener("click", toggleDarkMode);

updateUI();
