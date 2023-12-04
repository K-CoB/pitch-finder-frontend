import "./App.css";

import { useEffect, useState } from "react";
import AudioContext from "./audio/context";
import { getNoteFromFrequency, getPitchFromNote } from "./audio/utils";
import correlate from "./audio/correlate";

const audioCtx = AudioContext.getAudioContext();
const analyser = AudioContext.getAnalyser();
const buf = new Float32Array(2048);

function App() {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [started, setStart] = useState(false);

  const [curNote, setCurNote] = useState<number>();
  const [curNoteDuration, setCurNoteDuration] = useState<number>(0);

  const [pitchNote, setPitchNote] = useState<string>();
  const [pitchScale, setPitchScale] = useState<number>();
  const [pitch, setPitch] = useState<number>(0);
  const [noteSuccess, setNoteSuccess] = useState(Array(64).fill(false));

  const updatePitch = () => {
    analyser.getFloatTimeDomainData(buf);
    var ac = correlate(buf, audioCtx.sampleRate);

    if (ac < 0) return;

    setPitch(ac);

    const note = getNoteFromFrequency(ac);
    if (curNote === note) {
      setCurNoteDuration((prev) => prev + 1);
      return;
    }

    setCurNoteDuration(0);
    setCurNote(note);

    const { scale, noteString } = getPitchFromNote(note);
    setPitchNote(noteString);
    setPitchScale(scale);
  };

  useEffect(() => {
    if (curNote && curNoteDuration > 0) {
      const index = curNote - 24;
      if (index < 0 || index > 88) return;
      const updatedNoteSuccess = [...noteSuccess];
      updatedNoteSuccess[index] = true;
      setNoteSuccess(updatedNoteSuccess);
    }
  }, [curNoteDuration]);

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

    setStart(true);
    setSource(audioCtx.createMediaStreamSource(input));
  };

  const stop = () => {
    source?.disconnect(analyser);
    setStart(false);
  };

  return (
    <div>
      <div>
        <div>
          <span>
            음정: {pitchNote}
            {pitchScale}
          </span>
          <div>
            <span>주파수 : {pitch.toFixed(2)} HZ</span>
          </div>
          <div>
            <span>지속시간 : {curNoteDuration}ms</span>
          </div>
        </div>
        {!started ? (
          <button onClick={start}>음역대 테스트 시작</button>
        ) : (
          <button onClick={stop}>정지</button>
        )}
      </div>
      <div className="note-list">
        {noteSuccess.map((item, idx) => {
          const { scale, noteString } = getPitchFromNote(idx + 24);
          return (
            <h5 key={idx} className={item ? "success" : "false"}>
              {noteString + scale}
            </h5>
          );
        })}
      </div>
    </div>
  );
}

export default App;
