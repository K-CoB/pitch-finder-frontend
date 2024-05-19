import SelectButton from "@/components/common/SelectButton";
import MikeButton from "@/components/home/MikeButton";

export default function Home() {
  return (
    <div className="h-full flex-center flex-column gap-[64px]">
      <div className="flex-center flex-column gap-[15px]">
        <span className="text-black text-[14px]">성별을 선택해주세요.</span>
        <div className="flex gap-[25px]">
          <SelectButton bgColor="bg-blue-base">남자</SelectButton>
          <SelectButton bgColor="bg-blue-base">여자</SelectButton>
        </div>
      </div>
      <MikeButton />
    </div>
  );
}
