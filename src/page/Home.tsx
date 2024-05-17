import SelectButton from "../components/SelectButton";

export default function Home() {
  return (
    <>
      <div className="flex-center flex-column h-[200px] gap-[18px]">
        <span className="text-black text-[14px]">성별을 선택해주세요.</span>
        <div className="flex gap-[25px]">
          <SelectButton color="blue-base">남자</SelectButton>
          <SelectButton color="blue-base">여자</SelectButton>
        </div>
      </div>
    </>
  );
}
