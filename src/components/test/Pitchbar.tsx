interface PitchbarProps {
  children: string;
  bg: string;
  width: number;
}
export default function Pitchbar({ children, bg, width }: PitchbarProps) {
  return (
    <div className="grid custom-grid-template-columns gap-[8px] items-center">
      <span className="text-center">{children}</span>
      <div
        className={`h-[26px] rounded-[5px] shadow ${bg}`}
        style={{ width: `${width}%`, maxWidth: "100%" }}
      ></div>
    </div>
  );
}
