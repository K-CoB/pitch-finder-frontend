interface SelectButtonProps {
  children: React.ReactNode;
  bgColor: string;
}

export default function SelectButton({ children, bgColor }: SelectButtonProps) {
  return (
    <div className={`w-[150px] h-[50px] relative shadow ${bgColor} rounded-md`}>
      <button
        className={`w-[149.85px] left-[0.15px] top-[14px] absolute text-white`}
      >
        {children}
      </button>
    </div>
  );
}
