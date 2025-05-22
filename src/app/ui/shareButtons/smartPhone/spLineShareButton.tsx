import SpShareButtonBase from "./spShareButtonBase";

export default async function SpLineShareButton(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost";
  const page = (await props.searchParams)?.page || "1";
  const query = (await props.searchParams)?.query || "";

  const url =
    query === ""
      ? `${baseUrl}/?page=${page}`
      : `${baseUrl}/?page=${page}&query=${encodeURIComponent(query)}`;

  const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    url
  )}`;

  return (
    <SpShareButtonBase
      href={shareUrl}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 34"
          width="19"
          height="19"
          fill="white"
          className="drop-shadow-sm"
        >
          <path
            transform="translate(0, 2)"
            d="M18 0C8 0 0 6.5 0 14.5C0 19.2 3 23.2 7.4 25.8L5.5 30.8C5.2 31.6 6.1 32.3 6.8 31.8L13.6 27.2C15 27.4 16.5 27.5 18 27.5C28 27.5 36 21 36 13C36 5.5 28 0 18 0Z"
          />
        </svg>
      }
      bgColor="bg-green-500"
    />
  );
}
