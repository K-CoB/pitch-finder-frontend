import { getFrequencyFromNote } from "./utils";

const playSound = (note: number) => {
  const audioCtx = new AudioContext();
  var oscillator = audioCtx.createOscillator();
  oscillator.frequency.value = getFrequencyFromNote(note); // 주파수 설정
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 500);
};

export default playSound;
