import { useRecoilState } from "recoil";
import { genderState } from "@/store/atom";
import { Link, useLocation } from "react-router-dom";
import { getPitchFromNote } from "@/audio/utils";
import PitchButton from "@/components/common/PitchButton";
import ResultButton from "@/components/common/ResultButton";
import ResultBar from "@/components/result/ResultBar";
import VALUE from "@/constants/value";

export default function Result() {
  const [gender, setGender] = useRecoilState(genderState);

  const location = useLocation();
  const highest = location.state.highest;
  const lowest = location.state.lowest;

  const key = gender === "남자" ? "male" : "female";
  const averageHigh = VALUE.avg[key].high;
  const averageLow = VALUE.avg[key].low;

  function getWidth(high: number, low: number) {
    const ratio = ((high - low) / (VALUE.highest - VALUE.lowest)) * 100;
    return ratio;
  }

  function getMarginLeft(low: number) {
    const ratio = ((low - VALUE.lowest) / (VALUE.highest - VALUE.lowest)) * 100;
    return ratio;
  }

  return (
    <div className="flex-column items-center h-full justify-between">
      <div className="flex-column items-center gap-[20px] pt-[25px]">
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
      </div>

      <div className="flex-column gap-[40px] self-start w-full px-[15px]">
        <ResultBar
          width={getWidth(averageHigh, averageLow)}
          marginLeft={getMarginLeft(averageLow)}
          average={{
            high: getPitchFromNote(averageHigh).pitch,
            low: getPitchFromNote(averageLow).pitch,
          }}
        >
          {`${gender} 평균 음역대`}
        </ResultBar>
        <ResultBar
          width={getWidth(highest, lowest)}
          marginLeft={getMarginLeft(lowest)}
        >
          내 음역대
        </ResultBar>
      </div>

      <Link to={`/music?high=${highest}&low=${lowest}`}>
        <ResultButton>노래 추천 받기</ResultButton>
      </Link>
    </div>
  );
}
