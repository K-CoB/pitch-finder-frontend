import { useRecoilState } from "recoil";
import { genderState } from "@/store/atom";
import SelectButton from "@/components/common/SelectButton";
import MikeButton from "@/components/home/MikeButton";

export default function Home() {
  const [gender, setGender] = useRecoilState(genderState);

  const handleSelectGender = (selectedGender: "여자" | "남자") => {
    setGender(selectedGender);
  };

  return (
    <div className="h-full items-center flex-column justify-evenly">
      <div className="flex-center flex-column gap-[15px]">
        <span className="text-black text-[14px]">성별을 선택해주세요.</span>
        <div className="flex gap-[25px]">
          <SelectButton
            onClick={() => handleSelectGender("남자")}
            bgColor={`${
              gender === "남자" ? "bg-blue-highlight" : "bg-blue-base"
            }`}>
            남자
          </SelectButton>
          <SelectButton
            onClick={() => handleSelectGender("여자")}
            bgColor={`${
              gender === "여자" ? "bg-blue-highlight" : "bg-blue-base"
            }`}>
            여자
          </SelectButton>
        </div>
      </div>
      <MikeButton isDisabled={!gender} />
    </div>
  );
}
