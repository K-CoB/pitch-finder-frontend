import { useSearchParams } from "react-router-dom";
import Songs from "@/mock/songs";
import { HIGHEST, LOWEST } from "@/page/Test";
import { getPitchFromNote } from "@/audio/utils";
import { useEffect, useState } from "react";
import { SongI } from "@/interface/SongI";
import axios, { AxiosResponse } from "axios";
import ENV from "@/constants/env";

// TODO: 빈 화면 분기처리 필요
export default function Music() {
  const [searchParams, setSearchParams] = useSearchParams();
  const high = parseInt(searchParams.get("high") || "0") ?? HIGHEST;
  const low = parseInt(searchParams.get("low") || "0") ?? LOWEST;

  const [highLimit, setHighLimit] = useState(high);
  const [lowLimit, setLowLimit] = useState(low);

  const [musicList, setMusicList] = useState<SongI[]>(Songs);

  useEffect(() => {
    axios
      .get<SongI[]>(ENV.api, {
        params: { high: highLimit, low: lowLimit },
      })
      .then((response: AxiosResponse<SongI[]>) => {
        setMusicList(response.data);
      });
  }, [highLimit, lowLimit]);

  // TODO : url 복사 기능 구현 필요
  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(
        ENV.domain + `/music?high=${high}&low=${low}`
      );
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-8">
        <div>
          <h4 className="text-xl">
            최고음정 {getPitchFromNote(high).pitch} ~ 최저음정{" "}
            {getPitchFromNote(low).pitch}
          </h4>
          <span className="text-xs text-slate-500">
            당신의 음역대에 맞는 노래를 추천해드릴게요
          </span>
        </div>
        <button
          onClick={() => copyURL()}
          className="bg-blue-base text-white rounded-xl p-4">
          결과 공유
        </button>
      </div>
      <div className="flex justify-center items-center gap-4 my-8">
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-base text-white px-2 rounded-full"
            onClick={() => setHighLimit((cur) => cur + 1)}>
            +
          </button>
          {highLimit - high}
          <button
            className="bg-blue-base text-white px-2 rounded-full"
            onClick={() => setHighLimit((cur) => cur - 1)}>
            -
          </button>
        </div>
        <span>키 더 높게</span>
        <div className="flex flex-col items-center">
          <button
            className="bg-blue-base text-white px-2 rounded-full"
            onClick={() => setLowLimit((cur) => cur - 1)}>
            +
          </button>
          {low - lowLimit}
          <button
            className="bg-blue-base text-white px-2 rounded-full"
            onClick={() => setLowLimit((cur) => cur + 1)}>
            -
          </button>
        </div>
        <span>키 더 낮게 한다면</span>
      </div>
      <div>
        {musicList.map((music, idx) => (
          <li
            key={idx}
            className="flex justify-between mb-4 bg-white p-2 rounded-lg">
            <section className="flex gap-2">
              <img src={music.image} className="w-12 h-12 rounded-md" />
              <div className="flex flex-col">
                <span>{music.song}</span>
                <span className="text-sm text-slate-500">{music.singer}</span>
              </div>
            </section>
            <section className="flex">
              <ul className="flex items-center gap-2">
                <li className="bg-[#FFAE35] text-white rounded-lg px-2 text-sm">
                  {getPitchFromNote(music.high).pitch}
                </li>
                <li className="bg-[#4535FF] text-white rounded-lg px-2 text-sm">
                  {getPitchFromNote(music.low).pitch}
                </li>
              </ul>
              <ul className="ml-4 text-lg flex items-center gap-2">
                <a
                  className="bg-slate-200 rounded-full p-2"
                  href={music.url.listen}>
                  🎧
                </a>
                <a
                  className="bg-slate-200 rounded-full p-2"
                  href={music.url.sing}>
                  🎤
                </a>
              </ul>
            </section>
          </li>
        ))}
      </div>
    </div>
  );
}
