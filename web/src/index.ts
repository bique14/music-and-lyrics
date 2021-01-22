import lyric from "../media/location-unknown/lyric.json";
import { Elm } from "./Main.elm";

const app: any = Elm.Main.init({ node: document.querySelector("main") });
const audioSound: HTMLVideoElement = <HTMLVideoElement>(
  document.getElementById("audio-sound")
);
// const lyricText: HTMLElement = document.getElementById("lyrics");

app.ports.playAudio.subscribe((): void => {
  console.log("start!");
  start();
});

// (() => {
//   setInterval(() => {
//     audioSound.play();
//   }, 1000);
//   start();
// })();

function start(): void {
  audioSound.play();

  setInterval(function () {
    const currTime: string = audioSound.currentTime.toFixed(0);
    // console.log(currTime);
    for (let l in lyric) {
      // console.log(1);
      if (currTime == l) {
        console.log(lyric[l].text);
        // lyricText.innerHTML = lyricText.innerHTML + lyric[l].text;
        app.ports.recievedLyrics.send(lyric[l].text);
      }
    }
  }, 1000);
}
