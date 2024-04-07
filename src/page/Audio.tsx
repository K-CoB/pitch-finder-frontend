import { useState } from "react";

import useAudio from "../hooks/useAudio";
import styled from "styled-components";

const HIGHEST = 88;
const LOWEST = 24;
const MIDDLE = (HIGHEST + LOWEST) / 2;

function getLengthPercent(value: number) {
  return ((value - LOWEST) / (HIGHEST - LOWEST)) * 100;
}

const PitchBar = styled.div<{ cur: number; target: number }>`
  & > * {
    height: 20px;
  }

  .total {
    background-color: black;
    width: 100%;
  }
  .cur {
    background-color: red;
    width: ${(props) => props.cur}%;
  }
  .target {
    background-color: blue;
    width: ${(props) => props.target}%;
  }
`;

export default function Audio() {
  const { method, value } = useAudio();

  const [started, setStarted] = useState(false);
  const [highest, setHighest] = useState<number>();
  const [lowest, setLowest] = useState<number>();

  const [stage, setStage] = useState<"up" | "down" | "complete">("up");
  const [target, setTarget] = useState(MIDDLE);
  const [begin, setBegin] = useState(MIDDLE);
  const [end, setEnd] = useState(HIGHEST);

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
        setTarget(MIDDLE);
        setBegin(MIDDLE);
        setEnd(LOWEST);
      } else if (stage === "down") {
        setLowest(result);
        setStage("complete");
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
      <PitchBar
        cur={getLengthPercent(value.note)}
        target={getLengthPercent(target)}>
        <div className="total" />
        <div className="target" />
        <div className="cur" />
      </PitchBar>
      <div>
        <h5>최고음정 : {highest}</h5>
        <h5>최저음정 : {lowest}</h5>
        <h1>
          {stage === "up"
            ? "최고 음정을 구해보겠습니다"
            : "최저 음정을 구해보겠습니다"}
          {/* {getPitchFromNote(target).noteString + getPitchFromNote(target).scale} */}
          {target}
        </h1>
        {stage !== "complete" && (
          <>
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
          </>
        )}
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
