import ShareButtonBase from "./pcShareButtonBase";

export default async function PcTwitterShareButton(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  const page = (await props.searchParams)?.page || "1";
  const query = (await props.searchParams)?.query || "";
  const shareText =
    query === ""
      ? `週刊プロレスを表紙を飾った選手で検索！\n#週プロ検索\n${baseUrl}/?page=${page}`
      : `週刊プロレスを\n${query}で検索！\n#週プロ検索\n${baseUrl}/?page=${page}/query=${query}`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <ShareButtonBase
      href={shareUrl}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1227"
          width="18"
          height="18"
          fill="white"
          className="drop-shadow-sm"
        >
          <path
            transform="translate(0, 2)"
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
          />
        </svg>
      }
      label="ポスト"
      bgColor="bg-black"
      width="w-[130px] md:w-[150px] lg:w-[170px]"
    />
  );
}
