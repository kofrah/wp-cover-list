export default function SpShareButtonSkeleton({
  size = "w-[45px] h-[45px] md:w-[48px] md:h-[48px]",
}: {
  size?: string;
}) {
  return (
    <div
      className={`
          ${size}
          bg-gray-300 dark:bg-gray-700
          rounded-full animate-pulse
        `}
    />
  );
}
