const inputContainer = document.querySelector("#input-container");
const countDownForm = document.querySelector("#countdownForm");
const dateElement = document.querySelector("#date-picker");
const countdownElement = document.querySelector("#countdown-container");
const countdownElTitle = document.querySelector("#countdown-container-title");
const countdownBtn = document.querySelector("#countdown-container-button");
const timeElements = document.querySelectorAll("span");
const completeElement = document.querySelector("#complete-container");
const completeElInfo = document.querySelector("#complete-container-info");
const completeBtn = document.querySelector("#complete-container-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split("T")[0];
dateElement.setAttribute("min", today);

countDownForm.addEventListener("submit", updateCountdwon);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

function reset() {
  countdownElement.hidden = true;
  completeElement.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePrevCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateCountdwon(e) {
  e.preventDefault();
  countdownTitle = e.target[0].value;
  countdownDate = e.target[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please select a date for the countdown.");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeElement.hidden = false;
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeElement.hidden = true;
      countdownElement.hidden = false;
    }
  }, second);
}

restorePrevCountdown();
