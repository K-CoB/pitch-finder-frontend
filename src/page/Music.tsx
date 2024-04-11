import { useSearchParams } from "react-router-dom";
import Songs from "../mock/songs";
import { HIGHEST, LOWEST } from "./Audio";

export default function Music() {
  const [searchParams, setSearchParams] = useSearchParams();
  const highLimit = searchParams.get("high") ?? HIGHEST.toString();
  const lowLimit = searchParams.get("low") ?? LOWEST.toString();

  const musicList = Songs.filter(
    (song) => parseInt(lowLimit) < song.low && song.high < parseInt(highLimit)
  );

  return (
    <div>
      <h4>당신의 음역대에 맞는 음악들입니다!</h4>
      <ul>
        <li>최고 음정 : {searchParams.get("high")}</li>
        <li>최저 음정 : {searchParams.get("low")}</li>
      </ul>
      <div>
        {musicList.map((music, idx) => (
          <li key={idx}>
            {music.singer} <b>{music.title}</b>
          </li>
        ))}
      </div>
    </div>
  );
}
