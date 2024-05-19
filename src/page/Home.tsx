import SelectButton from "@/components/common/SelectButton";
import MikeButton from "@/components/home/MikeButton";

export default function Home() {
  return (
    <>
      <div className="flex-center flex-column h-[200px] gap-[18px]">
        <span className="text-black text-[14px]">성별을 선택해주세요.</span>
        <div className="flex gap-[25px]">
          <SelectButton bgColor="bg-blue-base">남자</SelectButton>
          <SelectButton bgColor="bg-blue-base">여자</SelectButton>
        </div>
        <MikeButton />
      </div>
    </>
  );
}
