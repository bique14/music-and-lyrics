console.log("hello world!");

const body = document.querySelector("body");

body.addEventListener(
  "click",
  function () {
    const audioSound = document.getElementById("audio-sound");
    audioSound.play();
    console.log(1);
  },
  false
);

(() => {})();
