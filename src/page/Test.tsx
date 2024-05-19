import { useEffect, useState } from "react";

import useAudio from "@/hooks/useAudio";
import { getPitchFromNote } from "@/audio/utils";
import playSound from "@/audio/playSound";
import { Link } from "react-router-dom";
import SelectButton from "@/components/common/SelectButton";
import Pitchbar from "@/components/test/Pitchbar";

export const HIGHEST = 73;
export const LOWEST = 38;
const MIDDLE = Math.floor((HIGHEST + LOWEST) / 2);

function getLengthPercent(value: number) {
  return ((value - LOWEST) / (HIGHEST - LOWEST)) * 100;
}

export default function Test() {
  const { method, value } = useAudio();

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
  const [end, setEnd] = useState(HIGHEST);

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
    <div className="flex-column flex-center">
      <div className="flex-column flex-center text-black ">
        <h1 className="text-[65px] font-Ubuntu">
          {getPitchFromNote(target).pitch}
        </h1>
        <span className="text-[24px]">
          {getPitchFromNote(target).scale +
            "옥타브 " +
            getPitchFromNote(target).korNoteString}
        </span>
      </div>
      {stage !== "complete" && (
        <div className="flex gap-[11px]">
          <SelectButton
            onClick={() => listenSound(target)}
            bgColor="bg-blue-pitch"
          >
            음성 듣기
          </SelectButton>
          <SelectButton
            onClick={() => {
              getNextTarget(false);
            }}
            bgColor="bg-blue-pitch"
          >
            포기하기
          </SelectButton>
        </div>
      )}

      <div className="w-full flex-column">
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
  );
}
