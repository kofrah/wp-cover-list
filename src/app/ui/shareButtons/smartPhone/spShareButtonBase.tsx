import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
  bgColor: string;
  size?: string; // サイズをオプション化
};

export default function SpShareButtonBase({
  href,
  icon,
  bgColor,
  size = "w-[45px] h-[45px] md:w-[48px] md:h-[48px]",
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${size} ${bgColor}
        rounded-full flex items-center justify-center
        text-white transition
        shadow-[0_4px_0_rgba(0,0,0,0.1)]
        active:translate-y-[1px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)]
        hover:opacity-90
      `}
    >
      {icon}
    </Link>
  );
}
