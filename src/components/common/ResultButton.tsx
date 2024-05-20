interface ResultButtonProps {
  children: React.ReactNode;
}

export default function ResultButton({ children }: ResultButtonProps) {
  return (
    <button className="w-[170px] h-[70px] bg-blue-base rounded-[50px] shadow flex-center text-white">
      {children}
    </button>
  );
}
