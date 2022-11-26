const textArea = document.querySelector("#area"),
  voiceEl = document.querySelector("#voice"),
  volumeEl = document.querySelector("#volume"),
  pitchEl = document.querySelector("#pitch"),
  rateEl = document.querySelector("#rate"),
  startBtn = document.querySelector("#start"),
  stopBtn = document.querySelector("#stop");

init();

function init() {
  startBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    const text = textArea.value;
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.voice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.name === voiceEl.value);

    msg.pitch = pitchEl.value;
    msg.rate = rateEl.value;
    msg.volume = volumeEl.value;

    window.speechSynthesis.speak(msg);
  });

  stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
  });

  window.speechSynthesis.onvoiceschanged = getData;
}

function getData() {
  const data = window.speechSynthesis.getVoices();
  console.log(data);
  voiceEl.innerHTML = data
    .filter((voice) => langAllowed(voice))
    .map((voice) => {
      return `<option value="${voice.name}">${voice.name} - ${voice.lang}</option>`;
    })
    .join("");
}

function langAllowed(voice) {
  const allowedLangs = ["pl", "en", "fr", "es"];
  return allowedLangs.some((langs) => voice.lang.includes(langs));
}
