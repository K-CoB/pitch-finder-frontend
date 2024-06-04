interface ResultBarProps {
  children: string;
  width?: number;
  marginLeft?: number;
}

export default function ResultBar({
  children,
  width,
  marginLeft,
}: ResultBarProps) {
  return (
    <div className="flex-column gap-[11px]">
      <span>{children}</span>
      <div className="w-full h-5 bg-blue-bg-bar rounded-[10px] flex-col justify-start items-start gap-2.5 inline-flex">
        <div
          style={{ width: `${width}%`, marginLeft: `${marginLeft}%` }}
          className={`h-5 bg-blue-bar-2 rounded-[10px]`}
        ></div>
      </div>
    </div>
  );
}
