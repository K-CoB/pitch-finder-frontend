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
  const [pitch, setPitch] = useState("0 Hz");
  const [noteSuccess, setNoteSuccess] = useState(Array(64).fill(false));

  const updatePitch = () => {
    analyser.getFloatTimeDomainData(buf);
    var ac = correlate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      const note = getNoteFromFrequency(ac);
      setPitch(ac.toFixed(2) + " Hz");

      console.log(note);
      if (curNote === note) {
        console.log("같음");
        setCurNoteDuration((prev) => prev + 1);
        return;
      }

      setCurNoteDuration(0);
      setCurNote(note);

      const { scale, noteString } = getPitchFromNote(note);
      setPitchNote(noteString);
      setPitchScale(scale);
    }
  };

  useEffect(() => {
    if (curNote) {
      if (curNoteDuration > 1) {
        const index = curNote - 24;
        if (index < 0 || index > 88) return;
        const updatedNoteSuccess = [...noteSuccess];
        updatedNoteSuccess[index] = true;
        setNoteSuccess(updatedNoteSuccess);
      }
    }
  }, [curNote]);

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
          <span>{pitchNote}</span>
          <span>{pitchScale}</span>
          <div>
            <span>{pitch}</span>
          </div>
          <div>
            <span>{curNoteDuration}</span>
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
