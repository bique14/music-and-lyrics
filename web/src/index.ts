import lyric from "../media/location-unknown/lyric.json";
import { Elm } from "./Main.elm";

const app: any = Elm.Main.init({ node: document.querySelector("main") });
const audioSound: HTMLVideoElement = <HTMLVideoElement>(
  document.getElementById("audio-sound")
);

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

function toArray(): Array<LyricObject> {
  const result = [];
  for (let i in lyric) result.push({ time: i, lyric: lyric[i] });
  return result;
}

function start(): void {
  audioSound.play();
  const lyricContainer: HTMLElement = document.getElementById(
    "lyric-container"
  );

  const lyricArr: Array<LyricObject> = toArray();
  console.log(lyricArr);
  setInterval(function () {
    const currTime: string = audioSound.currentTime.toFixed(0);

    lyricArr.map((value, index) => {
      if (currTime == value.time) {
        const lyricText = document.createElement("span");
        lyricText.setAttribute("id", `lyric-${index}`);
        lyricText.style.display = "block";
        lyricText.style.color = "white";
        lyricText.style.fontSize = "2rem";
        lyricText.style.fontWeight = "bold";
        lyricText.innerHTML = value.lyric.text;
        lyricContainer.appendChild(lyricText);

        const getOldText = document.getElementById(`lyric-${index - 1}`);
        if (getOldText) getOldText.style.color = "black";
        // if (index == 0) return;
        // else console.log(lyricArr[index - 1].lyric.text);
      }
    });
    // for (let l in lyric) {
    //   // console.log(1);
    //   if (currTime == l) {
    //     console.log(lyric[l].text);
    //     // const lyricText = document.createElement("span");
    //     // lyricText.setAttribute("id", `lyric-${currTime}`);
    //     // lyricText.style.display = "block";
    //     // lyricText.style.color = "red";
    //     // lyricText.innerHTML = lyric[l].text;
    //     // lyricContainer.appendChild(lyricText);
    //     // lyricText.style.color = "white";
    //     // ---------
    //     // lyricText.innerHTML = lyricText.innerHTML + lyric[l].text;
    //     // app.ports.recievedLyrics.send(lyric[l].text);
    //   }
    // }
  }, 1000);
}

// type
type LyricObject = {
  time: string;
  lyric: Lyric;
};

type Lyric = {
  time: string;
  text: string;
};
