import { Link, useLocation } from "react-router-dom";
import { getPitchFromNote } from "@/audio/utils";
import PitchButton from "@/components/common/PitchButton";
import ResultButton from "@/components/common/ResultButton";

export default function Result() {
  const location = useLocation();
  const highest = location.state.highest;
  const lowest = location.state.lowest;

  return (
    <div className="flex-column flex-center">
      <h2 className="text-[20px]">측정 결과</h2>
      <div className="flex gap-[25px]">
        <PitchButton
          result={highest}
          pitch={highest ? getPitchFromNote(highest).pitch : undefined}
          kor={
            highest
              ? getPitchFromNote(highest).scale +
                "옥타브 " +
                getPitchFromNote(highest).korNoteString
              : undefined
          }
        >
          최고 음정
        </PitchButton>
        <PitchButton
          result={lowest}
          pitch={lowest ? getPitchFromNote(lowest).pitch : undefined}
          kor={
            lowest
              ? getPitchFromNote(lowest).scale +
                "옥타브 " +
                getPitchFromNote(lowest).korNoteString
              : undefined
          }
        >
          최저 음정
        </PitchButton>
      </div>
      <div></div>
      <Link to={`/music?high=${highest}&low=${lowest}`}>
        <ResultButton>노래 추천 받기</ResultButton>
      </Link>
    </div>
  );
}
