import { useEffect, useState } from "react";

import useAudio from "../hooks/useAudio";
import styled from "styled-components";
import { getPitchFromNote } from "../audio/utils";
import playSound from "../audio/playSound";

const HIGHEST = 73;
const LOWEST = 38;
const MIDDLE = Math.floor((HIGHEST + LOWEST) / 2);

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

  useEffect(() => {
    if (value.note === target) {
      alert("성공");
      getNextTarget(true);
    }
  }, [value.note]);

  const [stage, setStage] = useState<"up" | "down" | "complete">("up");
  const [target, setTarget] = useState(MIDDLE);
  console.log("🚀 ~ Audio ~ target:", target);
  const [begin, setBegin] = useState(MIDDLE);
  const [end, setEnd] = useState(HIGHEST);

  function listenTarget() {
    playSound(target);
    method.stop();
    setTimeout(() => method.start(), 3000);
  }

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
      {started && (
        <div>
          <h5>
            {stage === "up"
              ? "최고 음정을 구해보겠습니다 "
              : "최저 음정을 구해보겠습니다 "}
            아래 음정을 따라해주세요
          </h5>
          <h1>{getPitchFromNote(target).pitch}</h1>
          {stage !== "complete" && (
            <>
              <button onClick={() => listenTarget()}>음성 듣기</button>
              <button
                onClick={() => {
                  getNextTarget(false);
                }}>
                실패
              </button>
            </>
          )}
          <PitchBar
            cur={getLengthPercent(value.note)}
            target={getLengthPercent(target)}>
            <div className="total" />
            <span>목표 음정</span>
            <div className="target" />
            <span>현재 음정</span>
            <div className="cur" />
          </PitchBar>
          <div>
            <span>
              음정: {value.pitch.noteString}
              {value.pitch.scale}
            </span>
            <div>
              <span>주파수 : {value.hz.toFixed(2)} HZ</span>
            </div>
          </div>
          {highest && <h2>최고음정 : {getPitchFromNote(highest).pitch}</h2>}
          {lowest && <h2>최저음정 : {getPitchFromNote(lowest).pitch}</h2>}
        </div>
      )}
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
