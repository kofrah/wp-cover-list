import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  icon: ReactNode;
  label: string;
  bgColor: string;
  width?: string; // オプションでカスタム幅指定可能に
};

export default function PcShareButtonBase({
  href,
  icon,
  label,
  bgColor,
  width = "w-[130px]", // デフォルト幅
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex ${bgColor} text-white px-4 py-2 rounded font-bold transition
        shadow-[0_4px_0_rgba(0,0,0,0.1)]
        active:translate-y-[1px] active:shadow-[0_1px_0_rgba(0,0,0,0.2)]
        hover:opacity-90
        ${width} justify-center
      `}
    >
      <div className="flex items-end gap-2">
        <div className="h-[18px] flex items-end">{icon}</div>
        <span className="text-[14px] drop-shadow-sm leading-none">{label}</span>
      </div>
    </Link>
  );
}
