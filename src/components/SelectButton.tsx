interface SelectButtonProps {
  children: React.ReactNode;
  color: string;
}

export default function SelectButton({ children, color }: SelectButtonProps) {
  return (
    <div
      className={`w-[150px] h-[50px] relative shadow bg-${color} rounded-md`}
    >
      <button
        className={`w-[149.85px] left-[0.15px] top-[14px] absolute text-white`}
      >
        {children}
      </button>
    </div>
  );
}
