import { useEffect, useState } from "react";

import { getPitchFromNote } from "../audio/utils";
import useAudio from "../hooks/useAudio";

const InitialNoteSuccess = Array(64).fill(false);

export default function Audio() {
  const { method, value } = useAudio();
  console.log("🚀 ~ Audio ~ useAudio:", value);

  const [started, setStarted] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(InitialNoteSuccess);

  useEffect(() => {
    const curNote = value.note;
    const index = curNote - 24;
    if (index < 0 || index > 88) return;
    const updatedNoteSuccess = [...noteSuccess];
    updatedNoteSuccess[index] = true;
    setNoteSuccess(updatedNoteSuccess);
  }, [value.note]);

  const reset = () => {
    setNoteSuccess(InitialNoteSuccess);
  };

  return (
    <div>
      <div>
        <div>
          <span>
            음정: {value.pitch.noteString}
            {value.pitch.scale}
          </span>
          <div>
            <span>주파수 : {value.hz.toFixed(2)} HZ</span>
          </div>
        </div>
        {!started ? (
          <button
            onClick={() => {
              method.start();
              setStarted(true);
            }}>
            음역대 테스트 시작
          </button>
        ) : (
          <button
            onClick={() => {
              method.stop();
              setStarted(false);
            }}>
            음역대 테스트 정지
          </button>
        )}
        {value.note !== 0 && <button onClick={reset}>초기화</button>}
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
      {noteSuccess !== InitialNoteSuccess && (
        <a href="/music">
          <button>내 음역대에 맞는 음악 찾기</button>
        </a>
      )}
    </div>
  );
}
