import { ReactComponent as MicrophoneIcon } from "@/assets/microphone.svg";
import { Link } from "react-router-dom";

interface MikeButtonProps {
  isDisabled: boolean;
}

export default function MikeButton({ isDisabled }: MikeButtonProps) {
  const buttonClass = isDisabled ? "opacity-50" : "cursor-pointer";

  const buttonContent = (
    <>
      <div className="w-[251.62px] h-[249.23px] left-0 top-0 absolute opacity-10 bg-indigo-300 rounded-full" />
      <div className="w-[221.43px] h-[219.32px] left-[15.10px] top-[14.95px] absolute opacity-40 bg-indigo-300 rounded-full" />
      <div className="w-[184.52px] h-[182.77px] left-[33.55px] top-[33.23px] absolute bg-purple-50 rounded-full shadow blur-[1px]" />
      <MicrophoneIcon className="w-[90px] h-[90px] left-[80.62px] top-[80.23px] absolute" />
    </>
  );

  return isDisabled ? (
    <div className={`w-[251.62px] h-[249.23px] relative ${buttonClass}`}>
      {buttonContent}
    </div>
  ) : (
    <Link
      to="/test"
      className={`w-[251.62px] h-[249.23px] relative ${buttonClass}`}
    >
      {buttonContent}
    </Link>
  );
}
