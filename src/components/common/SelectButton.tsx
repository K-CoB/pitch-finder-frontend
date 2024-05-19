interface SelectButtonProps {
  children: React.ReactNode;
  bgColor: string;
  onClick?: () => void;
}

export default function SelectButton({
  children,
  bgColor,
  onClick,
}: SelectButtonProps) {
  return (
    <div className={`w-[150px] h-[50px] relative shadow ${bgColor} rounded-md`}>
      <button
        onClick={onClick}
        className={`w-[149.85px] left-[0.15px] top-[14px] absolute text-white`}
      >
        {children}
      </button>
    </div>
  );
}
