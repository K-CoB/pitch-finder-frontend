import { useEffect, useState } from "react";

import useAudio from "@/hooks/useAudio";
import { getNoteFromFrequency, getPitchFromNote } from "@/audio/utils";
import playSound from "@/audio/playSound";
import { Link } from "react-router-dom";
import SelectButton from "@/components/common/SelectButton";
import Pitchbar from "@/components/test/Pitchbar";
import PitchButton from "@/components/common/PitchButton";
import ResultButton from "@/components/common/ResultButton";
import VALUE from "@/constants/value";
import { useRecoilState } from "recoil";
import { genderState } from "@/store/atom";

export default function Test() {
  const { method, value } = useAudio();
  const [gender, setGender] = useRecoilState(genderState);
  const MIDDLE = gender === "남자" ? VALUE.start.male : VALUE.start.female;

  const [started, setStarted] = useState(true);
  const [highest, setHighest] = useState<number>();
  const [lowest, setLowest] = useState<number>();

  useEffect(() => {
    if (value.note === target) {
      alert("성공");
      getNextTarget(true);
      method.reset(target);
    }
  }, [value.note]);

  const [stage, setStage] = useState<"up" | "down" | "complete">("up");
  const [target, setTarget] = useState(MIDDLE);
  const [begin, setBegin] = useState(MIDDLE);
  const [end, setEnd] = useState(VALUE.highest);

  function listenSound(note: number) {
    playSound(note);
    method.stop();
    setTimeout(() => method.start(), 600);
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
        setEnd(VALUE.lowest);
      } else if (stage === "down") {
        setLowest(result);
        setStage("complete");
      }
      return;
    }
    setTarget(next);
  }

  function getLengthPercent(value: number) {
    return ((value - VALUE.lowest) / (VALUE.highest - VALUE.lowest)) * 100;
  }

  return (
    <div className="flex-column items-center h-full">
      {stage !== "complete" ? (
        <div className="flex-column w-full flex-1 items-center justify-evenly">
          <div className="flex-column flex-center text-black ">
            <h1 className="text-[65px] font-Ubuntu">
              {getPitchFromNote(target).pitch}
            </h1>
            <span className="text-[24px]">
              {getPitchFromNote(target).octave +
                "옥타브 " +
                getPitchFromNote(target).korNoteString}
            </span>
          </div>

          <div className="flex gap-[11px]">
            <SelectButton
              onClick={() => listenSound(target)}
              bgColor="bg-blue-pitch">
              음성 듣기
            </SelectButton>
            <SelectButton
              onClick={() => {
                getNextTarget(false);
              }}
              bgColor="bg-blue-pitch">
              포기하기
            </SelectButton>
          </div>

          <div className="w-full flex-column gap-[30px]">
            <Pitchbar width={100} bg="bg-blue-base">
              범위
            </Pitchbar>
            <Pitchbar width={getLengthPercent(target)} bg="bg-blue-bar-1">
              목표 음정
            </Pitchbar>
            <Pitchbar width={getLengthPercent(value.note)} bg="bg-blue-bar-2">
              현재 음정
            </Pitchbar>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex-center">
          <Link to="/result" state={{ highest, lowest }}>
            <ResultButton>측정 결과 확인하기</ResultButton>
          </Link>
        </div>
      )}

      <div className="flex gap-[25px]">
        <PitchButton
          result={highest}
          onClick={() => {
            highest && listenSound(highest);
          }}
          pitch={highest ? getPitchFromNote(highest).pitch : undefined}
          kor={
            highest
              ? getPitchFromNote(highest).scale +
                "옥타브 " +
                getPitchFromNote(highest).korNoteString
              : undefined
          }>
          최고 음정
        </PitchButton>
        <PitchButton
          result={lowest}
          onClick={() => {
            lowest && listenSound(lowest);
          }}
          pitch={lowest ? getPitchFromNote(lowest).pitch : undefined}
          kor={
            lowest
              ? getPitchFromNote(lowest).scale +
                "옥타브 " +
                getPitchFromNote(lowest).korNoteString
              : undefined
          }>
          최저 음정
        </PitchButton>
      </div>
    </div>
  );
}
