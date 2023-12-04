import { useEffect, useState } from "react";
import AudioContext from "./audio/context";
import { noteFromPitch } from "./audio/utils";
import correlate from "./audio/correlate";

const audioCtx = AudioContext.getAudioContext();
const analyser = AudioContext.getAnalyser();
const buf = new Float32Array(2048);

const noteStrings = [
  "도",
  "도#",
  "레",
  "레#",
  "미",
  "파",
  "파#",
  "솔",
  "솔#",
  "라",
  "라#",
  "시",
];

function App() {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [started, setStart] = useState(false);

  const [pitchNote, setPitchNote] = useState<string>();
  const [pitchScale, setPitchScale] = useState<number>();
  const [pitch, setPitch] = useState("0 Hz");

  const updatePitch = () => {
    analyser.getFloatTimeDomainData(buf);
    var ac = correlate(buf, audioCtx.sampleRate);
    if (ac > -1) {
      let note = noteFromPitch(ac);
      let sym = noteStrings[note % 12];
      let scl = Math.floor(note / 12) - 1;
      setPitch(ac.toFixed(2) + " Hz");
      setPitchNote(sym);
      setPitchScale(scl);
    }
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
        </div>
        {!started ? (
          <button onClick={start}>음역대 테스트 시작</button>
        ) : (
          <button onClick={stop}>정지</button>
        )}
      </div>
    </div>
  );
}

export default App;
