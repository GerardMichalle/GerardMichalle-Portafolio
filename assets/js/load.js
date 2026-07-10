const preloader = document.getElementById("preloader");
const loadingText = document.querySelector(".loading-text");
const progress = document.querySelector(".progress");
const isStandaloneLoader = document.body.classList.contains("loader-page");

let dots = "";
let progressWidth = 0;
let finished = false;

function setProgress(value) {
  progressWidth = Math.min(value, 100);
  if (progress) progress.style.width = progressWidth + "%";
}

function finishLoading() {
  if (finished) return;
  finished = true;

  window.clearInterval(textInterval);
  window.clearInterval(progressInterval);
  setProgress(100);

  if (loadingText) loadingText.textContent = "Listo";

  window.setTimeout(() => {
    document.body.classList.remove("portfolio-loading");
    preloader?.classList.add("is-hidden");
  }, 450);

  if (isStandaloneLoader) {
    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 900);
  }
}

const textInterval = window.setInterval(() => {
  dots = dots.length < 3 ? dots + "." : "";
  if (loadingText) loadingText.textContent = "Preparando portafolio" + dots;
}, 420);

const progressInterval = window.setInterval(() => {
  const nextStep = progressWidth < 80 ? 7 : 3;
  setProgress(progressWidth + nextStep);

  if (progressWidth >= 96) finishLoading();
}, 180);

window.addEventListener("load", () => {
  window.setTimeout(finishLoading, 650);
});

window.setTimeout(finishLoading, 3200);
