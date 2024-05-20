interface PitchButtonProps {
  children: React.ReactNode;
  result?: number;
  onClick?: () => void;
  pitch?: string;
  kor?: string;
}

export default function PitchButton({
  children,
  result,
  onClick,
  pitch,
  kor,
}: PitchButtonProps) {
  return (
    <div className="bg-blue-result w-[156px] h-[140px] rounded-[41px] shadow flex-column flex-center p-[15px]">
      <h3 className="text-black text-[19px] mb-auto">{children}</h3>
      {result && (
        <button
          className="cursor-pointer flex-column flex-center"
          onClick={onClick}
        >
          <span className="text-[40px] font-Ubuntu">{pitch}</span>
          <span className="text-[15px]">{kor}</span>
        </button>
      )}
    </div>
  );
}
