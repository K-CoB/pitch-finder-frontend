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
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [hz, setHz] = useState<number>(0);
  const [note, setNote] = useState<number>(0);

  const updatePitch = () => {
    analyser.getFloatTimeDomainData(buf);

    let hz = correlate(buf, audioCtx.sampleRate);
    if (hz < 0) return;

    setHz(hz);
    setNote(getNoteFromFrequency(hz));
    console.log(note);
  };

  useEffect(() => {
    if (source != null) {
      source.connect(analyser);
    }
  }, [source]);

  setInterval(updatePitch, 100);

  const start = async () => {
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
    source?.disconnect(analyser);
  };

  const reset = (note: number) => {
    setHz(getFrequencyFromNote(note));
    setNote(note);
  };

  return {
    method: { start, stop, reset },
    value: {
      hz,
      note,
      pitch: getPitchFromNote(note),
    },
  };
}
