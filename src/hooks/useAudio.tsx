import { useEffect, useState } from "react";
import AudioContext from "../audio/context";
import correlate from "../audio/correlate";
import {
  getFrequencyFromNote,
  getNoteFromFrequency,
  getPitchFromNote,
} from "../audio/utils";

const audioCtx = AudioContext.getAudioContext();
const analyser = AudioContext.getAnalyser();
const buf = new Float32Array(2048);

export default function useAudio() {
  const [receiving, setReceiving] = useState(false);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [hz, setHz] = useState<number>(0);
  const [note, setNote] = useState<number>(0);

  const updatePitch = () => {
    analyser.getFloatTimeDomainData(buf);

    let hz = correlate(buf, audioCtx.sampleRate);
    if (hz < 0) return;

    setHz(hz);
    setNote(getNoteFromFrequency(hz));
  };

  const playSound = (note: number) => {
    setReceiving(false);
    var oscillator = audioCtx.createOscillator();
    oscillator.frequency.value = getFrequencyFromNote(note); // 주파수 설정
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(function () {
      oscillator.stop();
      setReceiving(true);
    }, 500);
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyser);
    }
  }, [source]);

  if (receiving) {
    setInterval(updatePitch, 100);
  }

  const start = async () => {
    setReceiving(true);
    const input = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
      },
    });

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    setReceiving(false);
    source?.disconnect(analyser);
  };

  return {
    method: { start, stop, playSound },
    value: {
      hz,
      note,
      pitch: getPitchFromNote(note),
    },
  };
}
