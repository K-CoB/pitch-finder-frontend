import { useEffect, useState } from "react";

import useAudio from "../hooks/useAudio";
import { getPitchFromNote } from "../audio/utils";

const SIZE = 64;
const INITIAL = 24;
const InitialNoteSuccess = Array(SIZE).fill(false);

export default function Audio() {
  const { method, value } = useAudio();

  const [started, setStarted] = useState(false);
  const [highest, setHighest] = useState<number>();
  const [lowest, setLowest] = useState<number>();

  const [stage, setStage] = useState<"up" | "down" | "complete">("up");
  const [target, setTarget] = useState(50);
  const [begin, setBegin] = useState(50);
  const [end, setEnd] = useState(100);

  function getNextTarget(success: boolean) {
    let next;
    if (success) {
      setBegin(target);
      next = (target + end) / 2;
    } else {
      setEnd(target);
      next = (begin + target) / 2;
    }
    next = stage === "up" ? Math.ceil(next) : Math.floor(next);

    if (next === target) {
      let result = success ? end : begin;
      if (stage === "up") {
        setHighest(result);
        setStage("down");
        setTarget(50);
        setBegin(50);
        setEnd(0);
      } else if (stage === "down") {
        setLowest(result);
      }
      return;
    }
    setTarget(next);
  }

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
      </div>
      <div>
        <h5>최고음정 : {highest}</h5>
        <h5>최저음정 : {lowest}</h5>
        <h1>
          {target} / 최대성공 : {begin} / 목표 : {end} /
          {stage === "up"
            ? "최고 음정을 구해보겠습니다"
            : "최저 음정을 구해보겠습니다"}
          {/* {getPitchFromNote(target).noteString + getPitchFromNote(target).scale} */}
        </h1>
        <button
          onClick={() => {
            getNextTarget(true);
          }}>
          성공
        </button>
        <button
          onClick={() => {
            getNextTarget(false);
          }}>
          실패
        </button>
      </div>
      {/* <div className="note-list">
        {noteSuccess.map((item, idx) => {
          const { scale, noteString } = getPitchFromNote(idx + 24);
          return (
            <h5 key={idx} className={item ? "success" : "false"}>
              {noteString + scale}
            </h5>
          );
        })}
      </div> */}
      {/* {noteSuccess !== InitialNoteSuccess && (
        <a href="/music">
          <button>내 음역대에 맞는 음악 찾기</button>
        </a>
      )} */}
    </div>
  );
}
